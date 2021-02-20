declare namespace message {
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

export default message;