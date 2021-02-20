import { BaseClient, BaseClientOptions } from './base';
import { CoreModule } from './typings';

export { Logger } from './base';
export * as typings from './typings';



type ClientOptions = BaseClientOptions;
export class Client extends BaseClient {
    public core: CoreModule;

    constructor(options: ClientOptions) {
        super(options);

        this.core = new CoreModule(this);
    }

    static async init(options: ClientOptions) {
        var client = new Client(options);

        if (client.token) return client;
        else {
            // Otherwise return the pending promise of the authenticated client.
            //@ts-ignore
            if (!(options.username && options.password)) throw 'coding error: no username/password (or token) provided';
            //@ts-ignore
            return (await client.authenticate(options.username, options.password));
        }
    }


}

export type CallOptions<Args> = {
    endpoint: string,
    args?: Args,
    method?: 'GET' | 'POST',
    settings?: any
}

export class BaseModule {
    protected client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    protected call<Response, Args = any>(opts: CallOptions<Args>): Promise<Response> {
        return this.client.call({
            wsfunction: opts.endpoint,
            args: opts.args,
            method: opts.method,
            settings: opts.settings
        })
    }
}