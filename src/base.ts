import axios from 'axios';
import qs from 'querystring';
import 'colors';

type LoggerFunction = (() => any) | ((...data: any[]) => any);
export type Logger = {
    debug: LoggerFunction;
    info: LoggerFunction;
    warn: LoggerFunction;
    error: LoggerFunction;
}

type RawBaseClientOptions = {
    /** The logger to use, defaults to a dummy non-logger. */
    logger?: Logger | true
    /** The moodle hostname to connect to. */
    wwwroot?: string
    /** The web service to use */
    service?: string
    /** If set to false, SSL certificates do not need to be valid. */
    strictSSL?: boolean
}
export type BaseClientOptions = (RawBaseClientOptions & {
    /** The access token to use */
    token: string
}) | (RawBaseClientOptions & {
    /** The username to use to authenticate us (if no token provided). */
    username: string
    /** The password to use to authenticate us (if no token provided). */
    password: string
})

//A default Logger implementation
export var Logger = {
    debug: (...str: any[]) => { console.debug(`[debug]`.bgGreen.black.bold + ' ' + str[0], ...str.slice(1)) },
    info: (...str: any[]) => { console.info(`[info ]`.bgCyan.black.bold + ' ' + str[0], ...str.slice(1)) },
    warn: (...str: any[]) => { console.warn(`[warn ]`.bgYellow.black.bold + ' ' + str[0], ...str.slice(1)) },
    error: (...str: any[]) => { console.error(`[error]`.bgRed.black.bold + ' ' + str[0], ...str.slice(1)) }
}

export class BaseClient {
    public logger: Logger = {
        // Set-up a dummy logger doing nothing.
        debug: () => { },
        info: () => { },
        warn: () => { },
        error: () => { }
    };
    protected wwwroot?: string;
    protected service?: string;
    public token?: string;
    protected strictSSL = true;



    constructor(options: BaseClientOptions) {
        var options = options ?? {};
        Object.assign(this, options);
        if (options.logger === true) this.logger = Logger;

        if (!this.wwwroot)
            this.logger.error('[init] wwwroot not defined');


        if (!this.service) {
            this.logger.debug('[init] Using default service %s', 'moodle_mobile_app'.bold);
            this.service = 'moodle_mobile_app';
        }

        //@ts-ignore
        if (this.token) this.logger.debug('[init] Setting up explicit token');
        else this.logger.debug('[init] No explicit token provided - Requires' + 'authentication'.bold);

        if (!this.strictSSL) {
            this.logger.warn('[init] SSL certificates not required to be valid');
            this.strictSSL = false;
        }
    }



    async call(options: {
        /** The name of the web service function to call. */
        wsfunction: string
        /** Web service function arguments. */
        args?: any
        /** HTTP method to use (GET|POST) */
        method?: 'GET' | 'POST'
        /**  Additional settings affecting the execution. */
        settings?: {
            /** Do not apply format_text() on description/summary/textarea */
            raw?: boolean
            /** Convert file urls to use the webservice/pluginfile.php. */
            fileurl?: boolean
            /** Apply filters during format_text(). */
            filter?: boolean
        }
    }) {
        //Default
        options.args ??= {};
        options.method ??= 'POST';
        //@ts-ignore
        options.method = options.method.toUpperCase();
        options.settings ??= {};
        options.settings.raw ??= false;
        options.settings.fileurl ??= true;
        options.settings.filter ??= false;

        var { wsfunction, args, settings } = options;

        if (!wsfunction) {
            this.logger.error('[call] Missing function name to execute');
            throw '[call] Missing function name to execute';
        }

        this.logger.debug('[call] Calling web service function %s', wsfunction.bold);
        var req_options: any = {
            url: this.wwwroot + '/webservice/rest/server.php',
            data: undefined,
            headers: undefined,
            responseType: 'json',
            params: {
                ...args,
                wstoken: this.token,
                wsfunction: wsfunction,
                moodlewsrestformat: 'json',
                moodlewssettingraw: settings.raw,
                moodlewssettingfileurl: settings.fileurl,
                moodlewssettingfilter: settings.filter
            },
            paramsSerializer: (params: any) => {
                return qs.stringify(params, undefined, undefined, {

                })
            },
            method: options.method
        }

        if (options.method === 'POST') {
            //The server will only accept form-encoded data
            req_options.headers = { 'content-type': 'application/x-www-form-urlencoded' };
            req_options.data = Object.keys(req_options.params)
                .map((key) => `${key}=${encodeURIComponent(req_options.params[key])}`)
                .join('&');

            //Params is no longer needed
            delete req_options.params;

        } else if (options.method !== 'GET') {
            this.logger.error('[call] Unsupported request method');
            throw '[call] Unsupported request method';
        }

        return axios(req_options).then((v) => {
            const { data } = v;
            if (data.exception) {
                var err = data as {
                    exception: string
                    errorcode: string
                    message: string
                };
                this.logger.error('Code:     '.bold, err.errorcode);
                this.logger.error('Exception:'.bold, err.exception);
                this.logger.error('Message:  '.bold, err.message);
                throw data;
            }

            return data;
        });
    };

    async authenticate(username: string, password: string): Promise<this> {
        this.logger.debug('[init] Requesting %s token from %s', this.service, this.wwwroot);

        const data: { [k: string]: string } = {
            service: this.service ? this.service : 'moodle_mobile_app',
            username,
            password
        };

        var options = {
            method: 'POST',
            responseType: 'json',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: Object.keys(data).map((key) => `${key}=${encodeURIComponent(data[key])}`).join('&')
        }

        try {
            //@ts-ignore
            var res = (await axios(this.wwwroot + '/login/token.php', options)).data;
            if (res.token) {
                this.token = res.token;
                this.logger.debug('[init] Token obtained');
                return this;
            }
        } catch (err) {
            if (err) {
                this.logger.error('[init] Authentication failed: ' + res.error);
                throw new Error('[init] Authentication failed: ' + res.error);
            }
        };

        this.logger.error('[init] Authentication failed: Unexpected server response');
        throw new Error('[init] Authentication failed: Unexpected server response');
    };
}

export type CallOptions<Args> = {
    endpoint: string,
    args?: Args,
    method?: 'GET' | 'POST',
    settings?: any
}

export class BaseModule {
    public call<Response, Args = any>(opts: CallOptions<Args>): Promise<Response> {
        return {} as any;
    }
}