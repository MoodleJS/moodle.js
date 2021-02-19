export enum ContextID {
    SYSTEM = '10',
    USER = '30',
    COURSECAT = '40',
    COURSE = '50',
    MODULE = '70',
    BLOCK = '80',
}

export declare namespace Core {
    interface core_webservice_get_site_info {
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