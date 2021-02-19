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

import request from 'request-promise-native';

export function init(options: BaseClientOptions) {
    var c = new BaseClient(options);

    if (c.token) return c;
    else {
        // Otherwise return the pending promise of the authenticated client.
        //@ts-ignore
        if (!(options.username && options.password)) throw "coding error: no username/password (or token) provided";
        //@ts-ignore
        return authenticateClient(c, options.username, options.password);
    }
}





type LoggerFunction = (() => any) | ((...data: any[]) => any);
type Logger = {
    debug: LoggerFunction;
    info: LoggerFunction;
    warn: LoggerFunction;
    error: LoggerFunction;
}

type RawBaseClientOptions = {
    logger?: Logger
    wwwroot?: string
    service?: string
    strictSSL?: boolean
}
type BaseClientOptions = (RawBaseClientOptions & {
    token: string
}) | (RawBaseClientOptions & {
    username: string
    password: string
})

class BaseClient {
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
    constructor(options: BaseClientOptions) {
        var options = options ?? {};
        Object.assign(this, options);

        if (!options.wwwroot)
            this.logger.error("[init] wwwroot not defined");


        if (!options.service) {
            this.logger.debug("[init] using default service moodle_mobile_app");
            this.service = "moodle_mobile_app";
        }

        //@ts-ignore
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

        var req_options: { uri: string } & request.RequestPromiseOptions = {
            form: undefined,
            uri: this.wwwroot + "/webservice/rest/server.php",
            json: true,
            qs: {
                ...args,
                wstoken: this.token,
                wsfunction: wsfunction,
                moodlewsrestformat: 'json',
                moodlewssettingraw: settings.raw,
                moodlewssettingfileurl: settings.fileurl,
                moodlewssettingfilter: settings.filter
            },
            qsStringifyOptions: {
                arrayFormat: "indices"
            },
            strictSSL: this.strictSSL,
            method: options.method
        }


        if (options.method === 'POST') {
            req_options.form = req_options.qs;
            delete req_options.qs;
        } else {
            this.logger.error("[call] unsupported request method");
            throw 'unsupported request method';
        }

        return request(req_options);
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
     * /
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
     * /
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
    */
}


async function authenticateClient<C extends BaseClient>(client: C, username: string, password: string): Promise<C> {

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

    try {
        var res = await request(options)
        if (res.token) {
            client.token = res.token;
            client.logger.debug("[init] token obtained");
            return client;
        } else if ("error" in res) {
            client.logger.error("[init] authentication failed: " + res.error);
            throw new Error("authentication failed: " + res.error);
        } else {
            client.logger.error("[init] authentication failed: unexpected server response");
            throw new Error("authentication failed: unexpected server response");
        }

    } catch (err) {
        throw (err);
    };
};
