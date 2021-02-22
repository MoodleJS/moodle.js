import calendar_ from './calendar';
import course_ from './course';
import message_ from './message';

import { BaseModule, CallOptions, BaseClient as Client } from '../../base';

/**
 * @category Core
 */
export declare namespace Core {
    export import calendar = calendar_;
    export import course = course_;
    export import message = message_;

    export enum ContextID {
        SYSTEM = '10',
        USER = '30',
        COURSECAT = '40',
        COURSE = '50',
        MODULE = '70',
        BLOCK = '80',
    }


    export namespace badges_get_user_badges {
        type args = {
            userid?: number;
            courseid?: number;
            page?: number;
            perpage?: number;
            search?: string;
            onlypublic?: 0 | 1;
        }

        type response = {
            badges: {
                id: number,
                name: string,
                description: string,
                badgeurl: string,
                timecreated: number,
                timemodified: number,
                usercreated: number,
                usermodified: number,
                issuername: string,
                issuerurl: string,
                issuercontact: string,
                expiredate: number,
                expireperiod: number,
                type: number,
                courseid: number,
                message: string,
                messagesubject: string,
                attachment: number,
                status: number,
                issuedid: number,
                uniquehash: string,
                dateissued: number,
                dateexpire: number,
                visible: number,
            }[],
            warnings: {
                item: string,
                itemid: number,
                warningcode: string,
                message: string,
            }[]
        }
    }

    export namespace block_get_course_blocks {
        type args = {
            courseid: string;
        }

        type response = {
            /* Block instance id. */
            instanceid: number
            /* Block name. */
            name: string
            /* Block region. */
            region: string
            /* Position id. */
            positionid: number
            /* Whether the block is collapsible. */
            collapsible: number
            /* whether the block is  dockabl. */
            dockable: number
            warnings?: {
                item?: string
                itemid?: number
                warningcode: string
                message: string
            }[]
        }[]

    }

    export namespace webservice_get_site_info {
        type response = {
            sitename: string;
            username: string;
            firstname: string;
            lastname: string;
            fullname: string;
            lang: string;
            userid: number;
            siteurl: string;
            userpictureurl: string;
            functions: {
                name: string;
                version: string;
            }[];
            downloadfiles: number;
            uploadfiles: number;
            release: string;
            version: string;
            mobilecssurl: string;
            advancedfeatures: {
                name: string;
                value: number;
            }[];
            usercanmanageownfiles: boolean;
            userquota: number;
            usermaxuploadfilesize: number;
            userhomepage: number;
            siteid: number;
        }
    }

    export namespace core_course_get_contents {
        type args = {
            courseid: string;
        }

        type response = {
            id: number;
            name: string;
            visible: number;
            summary: string;
            summaryformat: number;
            section: number;
            hiddenbynumsections: number;
            modules: Module[];
        }[]

        type Module = {
            id: number;
            url: string;
            name: string;
            instance: number;
            visible: number;
            modicon: string;
            modname: string;
            modplural: string;
            indent: number;
            contents?: Content[];
            description?: string;
        }

        type Content = {
            type: 'file' | 'url';
            filename: string;
            filepath?: string;
            filesize: number;
            fileurl: string;
            timecreated?: number;
            timemodified?: number;
            sortorder?: number;
            userid?: number;
            author?: string;
            license?: string;
        }
    }
}

class CalendarModule extends BaseModule {
    public call<Response, Args = any>(opts: CallOptions<Args>): Promise<Response> {
        return super.call({
            endpoint: 'core_calendar_' + opts.endpoint,
            args: opts.args,
            method: opts.method,
            settings: opts.settings
        })
    }

    public createCalendarEvents(args?: calendar_.create_calendar_events.args): Promise<calendar_.create_calendar_events.response> {
        return this.call({
            endpoint: 'create_calendar_events',
            args
        });
    }

    public deleteCalendarEvents(args?: calendar_.delete_calendar_events.args): Promise<calendar_.delete_calendar_events.response> {
        return this.call({
            endpoint: 'delete_calendar_events',
            args
        });
    }

    public getActionEventsByCourse(args?: calendar_.get_action_events_by_course.args): Promise<calendar_.get_action_events_by_course.response> {
        return this.call({
            endpoint: 'get_action_events_by_course',
            args
        });
    }

    public getActionEventsByTimesort(args?: calendar_.get_action_events_by_timesort.args): Promise<calendar_.get_action_events_by_timesort.response> {
        return this.call({
            endpoint: 'get_action_events_by_timesort',
            args
        });
    }
}

class CourseModule extends BaseModule {
    public call<Response, Args = any>(opts: CallOptions<Args>): Promise<Response> {
        return super.call({
            endpoint: 'core_course_' + opts.endpoint,
            args: opts.args,
            method: opts.method,
            settings: opts.settings
        })
    }

    public checkUpdates(args?: course_.check_updates.args): Promise<course_.check_updates.response> {
        return this.call({
            endpoint: 'check_updates',
            args
        });
    }

    public getCategories(args?: course_.get_categories.args): Promise<course_.get_categories.response> {
        return this.call({
            endpoint: 'get_categories',
            args
        });
    }

    public getContents(args?: course_.get_contents.args): Promise<course_.get_contents.response> {
        return this.call({
            endpoint: 'get_contents',
            args
        });
    }

    public getCourseModule(args?: course_.get_course_module.args): Promise<course_.get_course_module.response> {
        return this.call({
            endpoint: 'get_course_module',
            args
        });
    }

    public getCourses(args?: course_.get_courses.args): Promise<course_.get_courses.response> {
        return this.call({
            endpoint: 'get_courses',
            args
        });
    }

    public getCoursesByField(args?: course_.get_courses_by_field.args): Promise<course_.get_courses_by_field.response> {
        return this.call({
            endpoint: 'get_courses_by_field',
            args
        });
    }

    public getModule(args?: course_.get_module.args): Promise<course_.get_module.response> {
        return this.call({
            endpoint: 'get_module',
            args
        });
    }

    public getUpdatesSince(args?: course_.get_updates_since.args): Promise<course_.get_updates_since.response> {
        return this.call({
            endpoint: 'get_updates_since',
            args
        });
    }

    public searchCourses(args?: course_.search_courses.args): Promise<course_.search_courses.response> {
        return this.call({
            endpoint: 'search_courses',
            args
        });
    }

    public viewCourse(args?: course_.view_course.args): Promise<course_.view_course.response> {
        return this.call({
            endpoint: 'view_course',
            args
        });
    }
}

class ContactModule extends BaseModule {
    public blockContacts(args?: message_.contacts.block_contacts.args): Promise<message_.contacts.block_contacts.response> {
        return this.call({
            endpoint: 'block_contacts',
            args
        });
    }

    public createContacts(args?: message_.contacts.create_contacts.args): Promise<message_.contacts.create_contacts.response> {
        return this.call({
            endpoint: 'create_contacts',
            args
        });
    }

    public deleteContacts(args?: message_.contacts.delete_contacts.args): Promise<message_.contacts.delete_contacts.response> {
        return this.call({
            endpoint: 'delete_contacts',
            args
        });
    }

    public getContacts(args?: message_.contacts.get_contacts.args): Promise<message_.contacts.get_contacts.response> {
        return this.call({
            endpoint: 'get_contacts',
            args
        });
    }

    public unblockContacts(args?: message_.contacts.unblock_contacts.args): Promise<message_.contacts.unblock_contacts.response> {
        return this.call({
            endpoint: 'unblock_contacts',
            args
        });
    }

    public searchContacts(args?: message_.contacts.search_contacts.args): Promise<message_.contacts.search_contacts.response> {
        return this.call({
            endpoint: 'search_contacts',
            args
        });
    }
}
class MessageModule extends BaseModule {
    public contacts: ContactModule;

    constructor() {
        super();
        this.contacts = new ContactModule();
    }

    public call<Response, Args = any>(opts: CallOptions<Args>): Promise<Response> {
        return super.call({
            endpoint: 'core_message_' + opts.endpoint,
            args: opts.args,
            method: opts.method,
            settings: opts.settings
        })
    }

    public getMessages(args?: message_.get_messages.args): Promise<message_.get_messages.response> {
        return this.call({
            endpoint: 'get_messages',
            args
        });
    }

    public deleteConversation(args?: message_.delete_conversation.args): Promise<message_.delete_conversation.response> {
        return this.call({
            endpoint: 'delete_conversation',
            args
        });
    }

    public deleteMessage(args?: message_.delete_message.args): Promise<message_.delete_message.response> {
        return this.call({
            endpoint: 'delete_message',
            args
        });
    }

    public getBlockedUsers(args?: message_.get_blocked_users.args): Promise<message_.get_blocked_users.response> {
        return this.call({
            endpoint: 'get_blocked_users',
            args
        });
    }

    public sendInstantMessages(args?: message_.send_instant_messages.args): Promise<message_.send_instant_messages.response> {
        return this.call({
            endpoint: 'send_instant_messages',
            args
        });
    }
}

export class CoreModule extends BaseModule {
    public course: CourseModule;
    public calendar: CalendarModule;
    public message: MessageModule;

    constructor() {
        super();

        this.course = new CourseModule();
        this.calendar = new CalendarModule();
        this.message = new MessageModule();
    }

    public call<Response, Args = any>(opts: CallOptions<Args>): Promise<Response> {
        return {} as any;
    }

    public getInfo(): Promise<Core.webservice_get_site_info.response> {
        return this.call({ endpoint: 'core_webservice_get_site_info' })
    }

    public getBadgesAndWarnings(args?: Core.badges_get_user_badges.args): Promise<Core.badges_get_user_badges.response> {
        return this.call({
            endpoint: 'core_badges_get_user_badges ',
            method: 'GET',
            args
        });
    }

    public getAllCourses(): Promise<Core.course.get_courses_by_field.response> {
        return this.call({
            endpoint: 'core_course_get_courses_by_field',
        })
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


    public getMessages(args: Core.message.get_messages.args): Promise<Core.message.get_messages.response> {
        return this.call({
            endpoint: 'core_message_get_messages ',
            method: 'POST',
            args
        });
    }
}