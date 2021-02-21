import { BaseClient, BaseClientOptions, CallOptions } from './base';

export { Logger, BaseClient } from './base';
export * as typings from './typings';



type ClientOptions = BaseClientOptions;
export class Client extends BaseClient {
    public core: CoreModule;

    constructor(options: ClientOptions) {
        super(options);

        this.core = new CoreModule();
        this.core.call = (...args) => this.moduleCall(...args);
    }

    private moduleCall<Response, Args = any>(opts: CallOptions<Args>): Promise<Response> {
        return this.call({
            wsfunction: opts.endpoint,
            args: moodlefy(opts.args),
            method: opts.method,
            settings: opts.settings
        })
    }


    static async init(options: ClientOptions) {
        var client = new Client(options);

        if (client.token) return client;
        else {
            //@ts-ignore
            if (!(options.username && options.password)) throw 'coding error: no username/password (or token) provided';
            //@ts-ignore
            return (await client.authenticate(options.username, options.password));
        }
    }
}

function moodlefy<T>(obj: T): T {
    for (const k in obj)
        switch (typeof obj[k]) {
            case 'object':
                if (Array.isArray(obj[k]))
                    for (const i in obj[k]) obj[k][i] = moodlefy(obj[k][i]);
                else obj[k] = moodlefy(obj[k]);
                break;
            default:
                //@ts-ignore
                if (obj[k] === true) obj[k] = 1;
                //@ts-ignore
                if (obj[k] === false) obj[k] = 0;
                break;
        }

    return obj;
}

import { CoreModule } from './typings';