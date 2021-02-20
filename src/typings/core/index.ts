import course_ from './course';
import calendar_ from './calendar';
import message_ from './message';

export declare namespace Core {
    export import course = course_;
    export import calendar = calendar_;
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

        type reponse = {
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