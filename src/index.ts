import { BaseClient, BaseClientOptions } from './base';
import { CoreModule } from './typings';

export { Logger, BaseClient } from './base';
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