/**
 * API client for the moodle web services.
 *
 * This is a thin wrapper around the request-promise module to simplify the
 * common querying Moodle external functions exposed via web services.  The
 * client uses webservice/rest/server.php end-point and supports authentication
 * via permanent tokens (which can be provided explicitly or obtained via login).
 *
 * @module moodle-client
 * @author David Mudrak <david@moodle.com>
 * @license BSD-2-Clause
 */

"use strict";

import request_promise from 'request-promise';
import Promise from 'bluebird';
import winston from 'winston';

module.exports = {
    /**
     * Factory method promising an authenticated client instance.
     *
     * @method
     * @returns {Promise}
     */
    init: function (options) {
        options = options || {};
        var c = new client(options);

        if (c.token !== null) {
            // If the token was explicitly provided, there is nothing to wait for - return
            // the promised client.
            return Promise.resolve(c);

        } else {
            // Otherwise return the pending promise of the authenticated client.
            if (!("username" in options)) {
                return Promise.reject("coding error: no username (or token) provided");
            }
            if (!("password" in options)) {
                return Promise.reject("coding error: no password (or token) provided");
            }
            return authenticate_client(c, options.username, options.password);
        }
    }
}



/**
 * Represents a moodle API client.
 *
 * @constructor
 * @param {object} options - Client initialization options.
 * @param {string} options.wwwroot - The moodle hostname to connect to.
 * @param {winston.Logger} [options.logger] - The logger to use, defaults to a dummy non-logger.
 * @param {string} [options.service=moodle_mobile_app] - The web service to use.
 * @param {string} [options.token] - The access token to use.
 * @param {string} [options.username] - The username to use to authenticate us (if no token provided).
 * @param {string} [options.password] - The password to use to authenticate us (if no token provided).
 * @param {bool} [options.strictSSL] - If set to false, SSL certificates do not need to be valid.
 */

type LoggerFunction = (() => any) | ((...data: any[]) => any);
type Logger = {
    debug: LoggerFunction;
    info: LoggerFunction;
    warn: LoggerFunction;
    error: LoggerFunction;
}

class client {
    logger: Logger = {
        // Set-up a dummy logger doing nothing.
        debug: () => { },
        info: () => { },
        warn: () => { },
        error: () => { }
    };
    wwwroot?: string;
    service?: string;
    token?: string;
    strictSSL = true;

    constructor(options: {
        logger?: Logger
        wwwroot?: string
        service?: string
        token?: string
        username?: string
        password?: string
        strictSSL?: boolean
    }) {
        var options = options ?? {};
        Object.assign(this, options);

        if (!options.wwwroot)
            this.logger.error("[init] wwwroot not defined");


        if (!options.service) {
            this.logger.debug("[init] using default service moodle_mobile_app");
            this.service = "moodle_mobile_app";
        }

        if (!options.token) this.logger.debug("[init] setting up explicit token");
        else this.logger.debug("[init] no explicit token provided - requires authentication");


        if (!options.strictSSL) {
            this.logger.warn("[warn] ssl certificates not required to be valid");
            this.strictSSL = false;
        }
    }



    /**
     * Call a web service function.
     *
     * @method
     * @param {object} options - Options affecting the web service function execution.
     * @param {string} options.function - The name of the web service function to call.
     * @param {object} [options.args={}] - Web service function arguments.
     * @param {string} [options.method=GET] - HTTP method to use (GET|POST).
     * @param {object} [options.settings={}] - Additional settings affecting the execution.
     * @param {boolean} [options.settings.raw=false] - Do not apply format_text() on description/summary/textarea.
     * @param {boolean} [options.settings.fileurl=true] - Convert file urls to use the webservice/pluginfile.php.
     * @param {boolean} [options.settings.filter=false] - Apply filters during format_text().
     * @return {Promise}
     */
    async call(options: {
        wsfunction: string
        args?: any
        method?: 'GET' | 'POST'
        settings?: {
            raw?: boolean
            fileurl?: boolean
            filter?: boolean
        }
    }) {
        //Default
        options.args ??= {};
        options.method ??= 'GET';
        //@ts-ignore
        options.method = options.method.toUpperCase();
        options.settings ??= {};
        options.settings.raw ??= false;
        options.settings.fileurl ??= true;
        options.settings.filter ??= false;

        var { wsfunction, args, settings } = options;

        if (!wsfunction) {
            this.logger.error("[call] missing function name to execute");
            throw "missing function name to execute";
        }

        this.logger.debug("[call] calling web service function %s", wsfunction);

        var request_options = {
            uri: this.wwwroot + "/webservice/rest/server.php",
            json: true,
            qs: {
                ...args,
                wstoken: this.token,
                wsfunction: wsfunction,
                moodlewsrestformat: 'json',
                moodlewssettingraw: settings.raw
            },
            qsStringifyOptions: {
                arrayFormat: "indices"
            },
            strictSSL: this.strictSSL,
            method: options.method
        }

        if ("fileurl" in settings) {
            // True by default. If true, returned file urls are converted to something like
            // http://xxxx/webservice/pluginfile.php/yyyyyyyy.
            // If false, the raw file url content from the DB is returned (e.g. @@PLUGINFILE@@).
            // Requires moodle 2.3 and higher.
            request_options.qs.moodlewssettingfileurl = settings.fileurl;
        }

        if ("filter" in settings) {
            // False by default. If true, the function will apply filter during format_text().
            // Requires moodle 2.3 and higher.
            request_options.qs.moodlewssettingfilter = settings.filter;
        }

        if ("method" in options) {
            if (options.method === "GET" || options.method === "get") {
                // No problem, this is the default defined above.
            } else if (options.method === "POST" || options.method === "post") {
                // Provide the arguments as in URL-encoded forms.
                request_options.method = "POST";
                request_options.form = request_options.qs;
                delete request_options.qs;
            } else {
                this.logger.error("[call] unsupported request method");
                return Promise.reject("unsupported request method");
            }
        }

        return request_promise(request_options);
    };

    /**
     * Download a file from Moodle.
     *
     * @method
     * @param {object} options - Specifies the file to be downloaded.
     * @param {string} options.filepath - The path to the file within the Moodle filesystem.
     * @param {string} [options.preview=null] - Preview mode for images (tinyicon|thumb|bigthumb), full image otherwise.
     * @param {bool} [options.offline=false] - Download the file from the repository even if it is an external link.
     * @return {Promise}
     */
    download(options) {
        var self = this;

        if (!("filepath" in options)) {
            self.logger.error("[download] missing file path to download");
            return Promise.reject("missing file path to download");
        }

        var request_options = {
            uri: self.wwwroot + "/webservice/pluginfile.php",
            qs: {
                token: self.token,
                file: options.filepath,
            },
            strictSSL: self.strictSSL,
            method: "GET",
            encoding: null
        }

        if (options.preview) {
            request_options.qs.preview = options.preview;
        }

        if (options.offline) {
            request_options.qs.offline = 1;
        }

        return request_promise(request_options);
    }

    /**
     * Upload files to the user draft area in the Moodle filesystem.
     *
     * The options.files follows the same rules as the formData object described at
     * https://github.com/request/request#multipartform-data-multipart-form-uploads
     * (Moodle does not seem to support the array variant though).
     *
     * If the itemid is not specified (or it is lesser or equal zero), the Moodle
     * automatically generates a new random item withing the user drafts area.
     *
     * The returned promise fulfills with an array of objects describing the
     * created files.
     *
     * @method
     * @param {object} options - Specifies files to be uploaded and where to.
     * @param {object} options.files - Form data providing the files to be uploaded.
     * @param {number} [options.itemid] - Allows to force uploading to the given area item.
     * @param {string} [options.targetpath=/] - The path to upload files to within the area item.
     * @return {Promise}
     */
    upload(options = {}) {
        var self = this;

        if (!("files" in options)) {
            self.logger.error("[upload] missing files data");
            return Promise.reject("missing files data");
        }

        var request_options = {
            uri: self.wwwroot + "/webservice/upload.php",
            json: true,
            formData: options.files,
            qs: {
                token: self.token
            },
            strictSSL: self.strictSSL,
            method: "POST",
        }

        if (options.targetpath) {
            request_options.qs.filepath = options.targetpath;
        }

        if (options.itemid) {
            request_options.qs.itemid = options.itemid;
        }

        return request_promise(request_options);
    }
}


/**
 * @param {client} client
 * @param {string} username - The username to use to authenticate us.
 * @param {string} password - The password to use to authenticate us.
 * @returns {Promise}
 */
function authenticate_client(client, username, password) {
    return new Promise(function (resolve, reject) {
        client.logger.debug("[init] requesting %s token from %s", client.service, client.wwwroot);
        var options = {
            uri: client.wwwroot + "/login/token.php",
            method: "POST",
            form: {
                service: client.service,
                username: username,
                password: password
            },
            strictSSL: client.strictSSL,
            json: true
        }

        request_promise(options)
            .then(function (res) {
                if ("token" in res) {
                    client.token = res.token;
                    client.logger.debug("[init] token obtained");
                    resolve(client);
                } else if ("error" in res) {
                    client.logger.error("[init] authentication failed: " + res.error);
                    reject(new Error("authentication failed: " + res.error));
                } else {
                    client.logger.error("[init] authentication failed: unexpected server response");
                    reject(new Error("authentication failed: unexpected server response"));
                }
            })
            .catch(function (err) {
                reject(err);
            });
    });
}
