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
            args: opts.args,
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

import { CoreModule } from './typings';