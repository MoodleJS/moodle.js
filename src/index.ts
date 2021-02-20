import { BaseClient, BaseClientOptions } from './base';
import { Core } from './typings';

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
class BaseModule {
    protected client: Client;
    constructor(client: Client) {
        this.client = client;
    }

    protected call<Response, Args = any>(opts: {
        endpoint: string,
        args?: Args,
        method?: 'GET' | 'POST',
        settings?: any
    }): Promise<Response> {
        return this.client.call({
            wsfunction: opts.endpoint,
            args: opts.args,
            method: opts.method,
            settings: opts.settings
        })
    }
}

class CoreModule extends BaseModule {
    public getInfo(): Promise<Core.webservice_get_site_info.response> {
        return this.call({ endpoint: 'core_webservice_get_site_info' })
    }

    public getBadgesAndWarnings(args?: Core.badges_get_user_badges.args): Promise<Core.badges_get_user_badges.reponse> {
        return this.call({
            endpoint: 'core_badges_get_user_badges ',
            method: 'GET',
            args
        });
    }

    public getUpdateCourse() {
        return this.call({
            endpoint: 'core_course_check_updates',
            args: [{
                courseid: 3260,
                tocheck: [{ contextlevel: 'module', id: 50, since: new Date().getTime() }]
                //          19189
                //          4041
            }]
        })
    }

    public getModules(args: Core.core_course_get_contents.args): Promise<Core.core_course_get_contents.response> {
        return this.call({
            endpoint: 'core_course_get_contents',
            args
        })
    }

    public getCourseBlocks(args: Core.block_get_course_blocks.args): Promise<Core.block_get_course_blocks.response> {
        return this.call({
            endpoint: 'core_block_get_course_blocks',
            args
        })
    }



    getMessages(args: Core.message_get_messages.args): Promise<Core.message_get_messages.reponse> {
        return this.call({
            endpoint: 'core_message_get_messages ',
            method: 'POST',
            args
        });
    }
}