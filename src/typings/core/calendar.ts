declare namespace calendar {
    namespace create_calendar_events {
        type args = {
            events: {
                name: string;
                description: string;
                format?: number; //description format (1 = HTML, 0 = MOODLE, 2 = PLAIN or 4 = MARKDOWN)
                courseid?: number;
                groupid?: number;
                repeats?: number; //number of repeats
                eventtype?: string; //Event type
                timestart?: number; //timestart
                timeduration?: number; //time duration
                visible?: number; //visible
                sequence?: number; //sequence
            };
        };

        type response = {
            events: {
                id: number;
                name: string;
                description: string;
                format: number;
                courseid: number;
                groupid: number;
                userid: number;
                repeatid: number;
                modulename: string;
                instance: number;
                eventtype: string;
                timestart: number;
                timeduration: number;
                visible: number;
                uuid: string;
                sequence: number;
                timemodified: number;
                subscriptionid: number;
            }[];
            warnings: {
                item: string;
                itemid: number;
                warningcode: string;
                message: string;
            }[];
        };
    }

    namespace delete_calendar_events {
        type args = {
            eventid: number; //Event ID
            repeat: 0 | 1; //Delete comeplete series if repeated event
        };

        type response = {};
    }

    namespace get_action_events_by_course {
        type args = {
            courseid: string;
            timesortfrom?: number;
            timesortto?: number;
            aftereventid?: number;
            /** @default 20*/
            limitnum?: number;
        };

        type response = {
            events: {
                id: number;
                name: string;
                description: string;
                descriptionformat: number;
                categoryid: number;
                groupid: number;
                userid: number;
                repeatid: number;
                eventcount: number;
                modulename: string;
                instance: number;
                eventtype: string;
                timestart: number;
                timeduration: number;
                timesort: number;
                visible: number;
                timemodified: number;
                icon: {
                    key: string;
                    component: string;
                    alttext: string;
                };
                category: {
                    id: number;
                    name: string;
                    idnumber: string;
                    description: string;
                    parent: number;
                    coursecount: number;
                    visible: number;
                    timemodified: number;
                    depth: number;
                    nestedname: string;
                    url: string;
                };
                course: {
                    id: number;
                    fullname: string;
                    shortname: string;
                    idnumber: string;
                    summary: string;
                    summaryformat: number;
                    startdate: number;
                    enddate: number;
                    fullnamedisplay: string;
                    viewurl: string;
                };
                subscription: {
                    displayeventsource: number;
                    subscriptionname: string;
                    subscriptionurl: string;
                };
                canedit: number;
                candelete: number;
                deleteurl: string;
                editurl: string;
                viewurl: string;
                formattedtime: string;
                isactionevent: number;
                iscourseevent: number;
                iscategoryevent: number;
                groupname: string;
                url: string;
                action: {
                    name: string;
                    url: string;
                    itemcount: number;
                    actionable: number;
                    showitemcount: number;
                };
            }[];
            firstid: number;
            lastid: number;
        };
    }

    namespace get_action_events_by_timesort {
        type args = {
            timesortfrom?: number;
            timesortto?: number;
            aftereventid?: number;
            limittononsuspendedevents?: number;
        };

        type response = {
            events: {
                id: number;
                name: string;
                description: string;
                descriptionformat: number;
                categoryid: number;
                groupid: number;
                userid: number;
                repeatid: number;
                eventcount: number;
                modulename: string;
                instance: number;
                eventtype: string;
                timestart: number;
                timeduration: number;
                timesort: number;
                visible: number;
                timemodified: number;
                icon: {
                    key: string;
                    component: string;
                    alttext: string;
                };
                category: {
                    id: number;
                    name: string;
                    idnumber: string;
                    description: string;
                    parent: number;
                    coursecount: number;
                    visible: number;
                    timemodified: number;
                    depth: number;
                    nestedname: string;
                    url: string;
                };
                course: {
                    id: number;
                    fullname: string;
                    shortname: string;
                    idnumber: string;
                    summary: string;
                    summaryformat: number;
                    startdate: number;
                    enddate: number;
                    fullnamedisplay: string;
                    viewurl: string;
                };
                subscription: {
                    displayeventsource: number;
                    subscriptionname: string;
                    subscriptionurl: string;
                };
                canedit: number;
                candelete: number;
                deleteurl: string;
                editurl: string;
                viewurl: string;
                formattedtime: string;
                isactionevent: number;
                iscourseevent: number;
                iscategoryevent: number;
                groupname: string;
                url: string;
                action: {
                    name: string;
                    url: string;
                    itemcount: number;
                    actionable: number;
                    showitemcount: number;
                };
            }[];
            firstid: number;
            lastid: number;
        };
    }
}

export default calendar;
