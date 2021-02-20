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

    namespace calendar_create_calendar_events {
        type args = {
            events: {
                name: string
                description: string
                format?: number //description format (1 = HTML, 0 = MOODLE, 2 = PLAIN or 4 = MARKDOWN)
                courseid?: number
                groupid?: number
                repeats?: number  //number of repeats
                eventtype?: string //Event type
                timestart?: number //timestart
                timeduration?: number//time duration
                visible?: number //visible
                sequence?: number //sequence
            }
        }

        type reponse = {
            events: {
                id: number,
                name: string,
                description: string,
                format: number,
                courseid: number,
                groupid: number,
                userid: number,
                repeatid: number,
                modulename: string,
                instance: number,
                eventtype: string,
                timestart: number,
                timeduration: number,
                visible: number,
                uuid: string,
                sequence: number,
                timemodified: number,
                subscriptionid: number,
            }[],
            warnings: {
                item: string,
                itemid: number,
                warningcode: string,
                message: string,
            }[]
        }
    }

    namespace calendar_delete_calendar_events {
        type args = {
            eventid: number   //Event ID
            repeat: 0 | 1   //Delete comeplete series if repeated event
        }

        type response = {

        }
    }

    namespace calendar_get_action_events_by_course {
        type args = {
            courseid: string;
            timesortfrom?: number;
            timesortto?: number;
            aftereventid?: number;
            /** @default 20*/
            limitnum?: number;
        }

        type reponse = {
            events: {
                id: number,
                name: string,
                description: string,
                descriptionformat: number,
                categoryid: number,
                groupid: number,
                userid: number,
                repeatid: number,
                eventcount: number,
                modulename: string,
                instance: number,
                eventtype: string,
                timestart: number,
                timeduration: number,
                timesort: number,
                visible: number,
                timemodified: number,
                icon: {
                    key: string,
                    component: string,
                    alttext: string
                },
                category: {
                    id: number,
                    name: string,
                    idnumber: string,
                    description: string,
                    parent: number,
                    coursecount: number,
                    visible: number,
                    timemodified: number,
                    depth: number,
                    nestedname: string,
                    url: string
                },
                course: {
                    id: number,
                    fullname: string,
                    shortname: string,
                    idnumber: string,
                    summary: string,
                    summaryformat: number,
                    startdate: number,
                    enddate: number,
                    fullnamedisplay: string,
                    viewurl: string
                },
                subscription: {
                    displayeventsource: number,
                    subscriptionname: string,
                    subscriptionurl: string
                },
                canedit: number,
                candelete: number,
                deleteurl: string,
                editurl: string,
                viewurl: string,
                formattedtime: string,
                isactionevent: number,
                iscourseevent: number,
                iscategoryevent: number,
                groupname: string,
                url: string,
                action: {
                    name: string,
                    url: string,
                    itemcount: number,
                    actionable: number,
                    showitemcount: number
                },
            }[],
            firstid: number,
            lastid: number
        }
    }

    namespace test4 {
        type args = {
            courseid: string;
        }

        type response = {

        }
    }

    namespace test5 {
        type args = {
            courseid: string;
        }

        type response = {

        }
    }


    namespace webservice_get_site_info {
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

    namespace core_course_get_contents {
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