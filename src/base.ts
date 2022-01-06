import axios from 'axios';
import qs from 'querystring';
import 'colors';

type LoggerFunction = (...data: any[]) => any;
export type Logger = {
    debug: LoggerFunction;
    info: LoggerFunction;
    warn: LoggerFunction;
    error: LoggerFunction;
};

export type BaseClientOptions = {
    /** The logger to use, defaults to a dummy non-logger. */
    logger?: Logger | true;
    /** The moodle hostname to connect to. */
    wwwroot: string;
    /** The web service to use */
    service?: string;
    /** If set to false, SSL certificates do not need to be valid. */
    strictSSL?: boolean;
    /** The access token to use */
    token?: string;
    /** The username to use to authenticate us (if no token provided). */
    username?: string;
    /** The password to use to authenticate us (if no token provided). */
    password?: string;
};

//A default Logger implementation
export const Logger = {
    debug: (...str: any[]) => {
        console.debug(`[debug]`.bgGreen.black.bold, ...str);
    },
    info: (...str: any[]) => {
        console.info(`[info ]`.bgCyan.black.bold, ...str);
    },
    warn: (...str: any[]) => {
        console.warn(`[warn ]`.bgYellow.black.bold, ...str);
    },
    error: (...str: any[]) => {
        console.error(`[error]`.bgRed.black.bold, ...str);
    }
};

export class BaseClient {
    public logger: Logger;
    protected wwwroot: string;
    protected service: string;
    public token: string;
    private tokenPromise?: Promise<string>;
    protected strictSSL = true;

    constructor(options: BaseClientOptions) {
        var options = options ?? {};

        this.logger = {
            // Set-up a dummy logger doing nothing.
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {}
        };
        if (options.logger === true) this.logger = Logger;
        else if (options.logger) this.logger = options.logger;

        if (!options.wwwroot) {
            this.logger.error('[init] wwwroot not defined');
            throw new Error('wwwroot missing in options');
        }
        this.wwwroot = options.wwwroot;

        this.service = options.service ?? 'moodle_mobile_app';
        if (!options.service) this.logger.debug("[init] Using default service 'moodle_mobile_app'");

        this.strictSSL = options.strictSSL ?? false;
        if (!this.strictSSL) {
            this.logger.warn('[init] SSL certificates are not required to be valid');
        }

        if (options.token) {
            this.logger.debug('[init] Using explicit token');
            this.token = options.token;
        } else if (options.username && options.password) {
            this.logger.debug('[init] Using username and password');
            this.token = '';
            // The promis is going to be resolved in the first call of the call method
            this.tokenPromise = this.authenticate(options.username, options.password);
        } else {
            this.logger.debug('[init] No credentials provided but required');
            throw new Error('credentials missing in options (Provide token or username & password)');
        }
    }

    async call(options: {
        /** The name of the web service function to call. */
        wsfunction: string;
        /** Web service function arguments. */
        args?: any;
        /** HTTP method to use (GET|POST) */
        method?: 'GET' | 'POST';
        /**  Additional settings affecting the execution. */
        settings?: {
            /** Do not apply format_text() on description/summary/textarea */
            raw?: boolean;
            /** Convert file urls to use the webservice/pluginfile.php. */
            fileurl?: boolean;
            /** Apply filters during format_text(). */
            filter?: boolean;
        };
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
            throw new Error('[call] Missing function name to execute');
        }

        if (this.tokenPromise) {
            // Await promise created by authenticate method
            this.logger.debug('[init] Waiting for requested token');
            this.token = await this.tokenPromise;
            this.tokenPromise = undefined;
        }

        this.logger.debug('[call] Calling web service function', "'" + wsfunction + "'");
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
                return qs.stringify(params, undefined, undefined, {});
            },
            method: options.method
        };

        if (options.method === 'POST') {
            //The server will only accept form-encoded data
            req_options.headers = { 'content-type': 'application/x-www-form-urlencoded' };
            req_options.data = Object.keys(req_options.params)
                .map((key) => `${key}=${encodeURIComponent(req_options.params[key])}`)
                .join('&');

            //Params is no longer needed
            delete req_options.params;
        } else if (options.method !== 'GET') {
            this.logger.error('[call] Unsupported request method', options.method);
            throw new Error('[call] Unsupported request method ' + options.method);
        }

        return axios(req_options).then((v) => {
            const { data } = v;
            if (data.exception) {
                var err = data as {
                    exception: string;
                    errorcode: string;
                    message: string;
                };
                this.logger.error('Code:     '.bold, err.errorcode);
                this.logger.error('Exception:'.bold, err.exception);
                this.logger.error('Message:  '.bold, err.message);
                throw new Error(data);
            }

            return data;
        });
    }

    private async authenticate(username: string, password: string): Promise<string> {
        this.logger.debug('[init] Requesting token from API');

        const data: { [k: string]: string } = {
            service: this.service,
            username,
            password
        };

        var options = {
            method: 'POST',
            responseType: 'json',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: Object.keys(data)
                .map((key) => `${key}=${encodeURIComponent(data[key])}`)
                .join('&')
        };

        try {
            //@ts-ignore
            var res = (await axios(this.wwwroot + '/login/token.php', options)).data;
            if (res.token) {
                this.token = res.token;
                this.logger.debug('[init] Token obtained');
                return res.token;
            }
        } catch (err) {
            if (err) {
                this.logger.error('[init] Authentication failed: ' + res.error);
                throw new Error('[init] Authentication failed: ' + res.error);
            }
        }

        this.logger.error('[init] Authentication failed: Unexpected server response');
        throw new Error('[init] Authentication failed: Unexpected server response');
    }
}

export type CallOptions<Args> = {
    endpoint: string;
    args?: Args;
    method?: 'GET' | 'POST';
    settings?: any;
};

export class BaseModule {
    public call<Response, Args = any>(opts: CallOptions<Args>): Promise<Response> {
        return {} as any;
    }
}
