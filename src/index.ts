import { BaseClient, BaseClientOptions } from './base';


type ClientOptions = BaseClientOptions;
export class Client extends BaseClient {
    constructor(options: ClientOptions) {
        super(options);


    }

    static async init(options: ClientOptions) {
        var client = new Client(options);

        if (client.token) return client;
        else {
            // Otherwise return the pending promise of the authenticated client.
            //@ts-ignore
            if (!(options.username && options.password)) throw "coding error: no username/password (or token) provided";
            //@ts-ignore
            return (await client.authenticate(options.username, options.password));
        }
    }
}