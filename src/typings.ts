export enum ContextID {
    SYSTEM = '10',
    USER = '30',
    COURSECAT = '40',
    COURSE = '50',
    MODULE = '70',
    BLOCK = '80',
}

export declare namespace Core {
    namespace block_get_course_blocks {
        interface args {
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

    namespace webservice_get_site_info {
        interface response {
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

    namespace core_course_get_contents {
        interface args {
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

        interface Module {
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

        interface Content {
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