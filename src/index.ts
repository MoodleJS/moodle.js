import { BaseClient, BaseClientOptions } from './base';
import { Core } from './typings';


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
            if (!(options.username && options.password)) throw "coding error: no username/password (or token) provided";
            //@ts-ignore
            return (await client.authenticate(options.username, options.password));
        }
    }


}
class BaseModule {
    public client: Client;
    constructor(client: Client) {
        this.client = client;
    }
}

class CoreModule extends BaseModule {
    getInfo(): Promise<Core.core_webservice_get_site_info> {
        return this.client.call({
            wsfunction: "core_webservice_get_site_info",
        })
    }

    getUpdateCourse() {
        return this.client.call({
            wsfunction: "core_course_check_updates",
            method: "POST",
            args: {
                courseid: 3260,
                tocheck: [{ contextlevel: 'CONTEXT_COURSE', id: 50, since: 1611042482 }]
                //          19189
                //          4041
            }
        }).then(function (response) {
            let parsedRes = JSON.stringify(response, null, 4)
            //parsedRes = JSON.parse(parsedRes)
            console.log(parsedRes);
            if (response.errorcode) throw (response.errorcode, response.message)
        });
    }
}