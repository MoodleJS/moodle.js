export enum ContextID {
    SYSTEM = '10',
    USER = '30',
    COURSECAT = '40',
    COURSE = '50',
    MODULE = '70',
    BLOCK = '80',
}

export declare namespace Core {
    namespace badges_get_user_badges {
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

    namespace calendar {
        namespace create_calendar_events {
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

        namespace delete_calendar_events {
            type args = {
                eventid: number   //Event ID
                repeat: 0 | 1   //Delete comeplete series if repeated event
            }

            type response = {

            }
        }

        namespace get_action_events_by_course {
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

        namespace get_action_events_by_timesort {
            type args = {
                timesortfrom?: number;
                timesortto?: number;
                aftereventid?: number;
                limittononsuspendedevents?: number;
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
    }

    namespace course {
        namespace get_courses_by_field {
            type args = {
                field?: string
                value?: string
            }

            type response = {
                courses: {
                    id: number,
                    fullname: string,
                    displayname: string,
                    shortname: string,
                    categoryid: number,
                    categoryname: string,
                    sortorder: number,
                    summary: string,
                    summaryformat: number,
                    summaryfiles: {
                        filename: string,
                        filepath: string,
                        filesize: number,
                        fileurl: string,
                        timemodified: number,
                        mimetype: string,
                        isexternalfile: number,
                        repositorytype: string,
                    }[],
                    overviewfiles: {
                        filename: string,
                        filepath: string,
                        filesize: number,
                        fileurl: string,
                        timemodified: number,
                        mimetype: string,
                        isexternalfile: number,
                        repositorytype: string,
                    }[],
                    contacts: {
                        id: number,
                        fullname: string,
                    }[],
                    enrollmentmethods: {
                    }[],
                    idnumber: string,
                    format: string,
                    showgrades: number,
                    newsitems: number,
                    startdate: number,
                    enddate: number,
                    maxbytes: number,
                    showreports: number,
                    visible: number,
                    groupmode: number,
                    groupmodeforce: number,
                    defaultgroupingid: number,
                    enablecompletion: number,
                    completionnotify: number,
                    lang: string,
                    theme: string,
                    marker: number,
                    legacyfiles: number,
                    calendartype: string,
                    timecreated: number,
                    timemodified: number,
                    requested: number,
                    cacherev: number,
                    filters: {
                        filter: string,
                        localstate: number,
                        inheritedstate: number,
                    }[],
                    courseformatoptions: {
                        name: string,
                        value: string,
                    }[],
                }[],
                warnings: {
                    item: string,
                    itemid: number,
                    warningcode: string,
                    message: string,
                }[]
            }
        }
    }

    namespace message {
        namespace contacts {
            namespace block_contacts {
                type args = {
                    userids: number[]
                    /** The id of the user we are blocking the contacts for, 0 for the current user */
                    userid?: number
                }

                type reponse = {

                }
            }

            namespace create_contacts {
                type args = {
                    userids: number[]
                    /** The id of the user we are creating the contacts for, 0 for the current user */
                    userid?: number
                }

                type reponse = {

                }
            }

            namespace delete_contacts {
                type args = {
                    userids: number[]
                    /** The id of the user we are creating the contacts for, 0 for the current user */
                    userid?: number
                }

                type reponse = {

                }
            }

            namespace get_contacts {
                type args = {

                }

                type reponse = {
                    online: {
                        id: number,
                        fullname: string,
                        profileimageurl: string,
                        profileimageurlsmall: string,
                        unread: number,
                    }[],
                    offline: {
                        id: number,
                        fullname: string,
                        profileimageurl: string,
                        profileimageurlsmall: string,
                        unread: number,
                    }[],
                    strangers: {
                        id: number,
                        fullname: string,
                        profileimageurl: string,
                        profileimageurlsmall: string,
                        unread: number,
                    }[]
                }
            }

            namespace unblock_contacts {
                type args = {
                    userids: number[]
                    /** The id of the user we are creating the contacts for, 0 for the current user */
                    userid?: number
                }

                type reponse = {

                }
            }

            namespace search_contacts {
                type args = {
                    /** the user's fullname has to match to be found */
                    searchtext: string
                    onlymycourses: 0 | 1;
                }

                type reponse = {
                    id: number,
                    fullname: string,
                    profileimageurl: string,
                    profileimageurlsmall: string,
                }[]
            }
        }

        namespace get_messages {
            type args = {
                useridto: string;
                useridfrom: string;
                type?: 'notifications' | 'conversations' | 'both';
                /** true for getting read messages, false for unread */
                read?: 0 | 1;
                /** true for ordering by newest first, false for oldest first */
                newestfirst?: 0 | 1;
                limitfrom?: number;
                limitnum?: number;
            }

            type reponse = {
                messages: {
                    id: number,
                    useridfrom: number,
                    useridto: number,
                    subject: string,
                    text: string,
                    fullmessage: string,
                    fullmessageformat: number,
                    fullmessagehtml: string,
                    smallmessage: string,
                    notification: number,
                    contexturl: string,
                    contexturlname: string,
                    timecreated: number,
                    timeread: number,
                    usertofullname: string,
                    userfromfullname: string,
                }[],
                warnings: {
                    item: string,
                    itemid: number,
                    warningcode: string,
                    message: string,
                }[]
            }
        }

        namespace delete_conversation {
            type args = {
                userid: number;
                otheruserid: number;
            }

            type reponse = {
                status: number,
                warnings: {
                    item: string,
                    itemid: number,
                    warningcode: string,
                    message: string,
                }[]
            }
        }

        namespace delete_message {
            type args = {
                messageid: number
                userid: number
                /** IDK what the fuck this means */
                read?: 0 | 1;
            }

            type reponse = {
                status: number,
                warnings: {
                    item: string,
                    itemid: number,
                    warningcode: string,
                    message: string,
                }[]
            }
        }

        namespace get_blocked_users {
            type args = {
                userid: number
            }

            type reponse = {
                users: {
                    id: number,
                    fullname: string,
                    profileimageurl: string,
                }[],
                warnings: {
                    item: string,
                    itemid: number,
                    warningcode: string,
                    message: string,
                }[]
            }
        }

        namespace send_instant_messages {
            type args = {
                messages: {
                    touserid: number
                    text: string
                    /** text format (1 = HTML, 0 = MOODLE, 2 = PLAIN or 4 = MARKDOWN) */
                    textformat: 0 | 1 | 2 | 4;
                    clientmsgid?: string;
                }
            }

            type reponse = {
                msgid: number,
                clientmsgid: string,
                errormessage: string,
            }[]
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