declare namespace course {
    namespace get_categories {
        type args = {
            criteria?: {
                /**
                 * **The category column to search, expected keys (value format) are:**
                 * 
                 * "id" (int) the category id
                 * 
                 * "ids" (string) category ids separated by commas,
                 * 
                 * "name" (string) the category name,
                 * 
                 * "parent" (int) the parent category id,
                 * 
                 * "idnumber" (string) category idnumber - user must have 'moodle/category:manage' to search on idnumber,
                 * 
                 * "visible" (int) whether the returned categories must be visible or hidden. If the key is not passed,then the function return all categories that the user can see. - user must have 'moodle/category:manage' or 'moodle/category:viewhiddencategories' to search on visible,
                 * 
                 * "theme" (string) only return the categories having this theme - user must have 'moodle/category:manage' to search on theme
                 */
                key: string
                value: string
            }[]
            addsubcategories?: 0 | 1
        }

        type response = {
            id: number,
            name: string,
            idnumber: string,
            description: string,
            descriptionformat: number,
            parent: number,
            sortorder: number,
            coursecount: number,
            visible: number,
            visibleold: number,
            timemodified: number,
            depth: number,
            path: string,
            theme: string,
        }[]
    }

    namespace get_contents {
        type args = {
            courseid: number;
            options?: {
                name: string
                value: string
            }[]
        }

        type response = {
            id: number,
            name: string,
            visible: number,
            summary: string,
            summaryformat: number,
            section: number,
            hiddenbynumsections: number,
            uservisible: number,
            availabilityinfo: string,
            modules: {
                id: number,
                url: string,
                name: string,
                instance: number,
                description: string,
                visible: number,
                uservisible: number,
                availabilityinfo: string,
                visibleoncoursepage: number,
                modicon: string,
                modname: string,
                modplural: string,
                availability: string,
                indent: number,
                contents: {
                    type: string,
                    filename: string,
                    filepath: string,
                    filesize: number,
                    fileurl: string,
                    content: string,
                    timecreated: number,
                    timemodified: number,
                    sortorder: number,
                    mimetype: string,
                    isexternalfile: number,
                    repositorytype: string,
                    userid: number,
                    author: string,
                    license: string,
                }[],
            }[],
        }[]
    }

    namespace get_course_module {
        type args = {
            cmid: number
        }

        type response = {
            cm: {
                id: number,
                course: number,
                module: number,
                name: string,
                modname: string,
                instance: number,
                section: number,
                sectionnum: number,
                groupmode: number,
                groupingid: number,
                completion: number,
                idnumber: string,
                added: number,
                score: number,
                indent: number,
                visible: number,
                visibleoncoursepage: number,
                visibleold: number,
                completiongradeitemnumber: number,
                completionview: number,
                completionexpected: number,
                showdescription: number,
                availability: string,
                grade: number,
                scale: string,
                gradepass: string,
                gradecat: number,
                advancedgrading: {
                    area: string,
                    method: string,
                }[],
                outcomes: {
                    id: string,
                    name: string,
                    scale: string,
                }[]
            },
            warnings: {
                item: string,
                itemid: number,
                warningcode: string,
                message: string,
            }[]
        }
    }

    namespace get_courses {
        type args = {
            options?: {
                ids?: number[]
            }[]
        }

        type response = {
            id: number,
            shortname: string,
            categoryid: number,
            categorysortorder: number,
            fullname: string,
            displayname: string,
            idnumber: string,
            summary: string,
            summaryformat: number,
            format: string,
            showgrades: number,
            newsitems: number,
            startdate: number,
            enddate: number,
            numsections: number,
            maxbytes: number,
            showreports: number,
            visible: number,
            hiddensections: number,
            groupmode: number,
            groupmodeforce: number,
            defaultgroupingid: number,
            timecreated: number,
            timemodified: number,
            enablecompletion: number,
            completionnotify: number,
            lang: string,
            forcetheme: string,
            courseformatoptions: {
                name: string,
                value: string,
            }[],
        }[]
    }

    namespace search_courses {
        type args = {
            /**(search, modulelist (only admins), blocklist (only admins), tagid) */
            criterianame: 'search' | 'modulelist' | 'blocklist' | 'tagid'
            criteriavalue: string
            page?: number
            perpage?: number
            requiredcapabilities?: string[];
            limittoenrolled?: 0 | 1;
        }

        type response = {
            total: number,
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
            }[],
            warnings: {
                item: string,
                itemid: number,
                warningcode: string,
                message: string,
            }[]
        }
    }


    namespace get_module {
        type args = {
            id: number
            sectionreturn?: number;
        }

        type response = string
    }

    namespace get_updates_since {
        type args = {
            courseid: number;
            since: number;
            filter?: string[]
        }

        type response = {
            instances: {
                contextlevel: string,
                id: number,
                updates: {
                    name: string,
                    timeupdated: number,
                    itemids: {
                    }[],
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

    namespace view_course {
        type args = {
            courseid: number;
            sectionnumber?: number
        }

        type response = {
            status: number,
            warnings: {
                item: string,
                itemid: number,
                warningcode: string,
                message: string,
            }[]
        }
    }

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

    namespace check_updates {
        type args = {
            courseid: number;
            tocheck: {
                contextlevel: string
                id: number
                since: number
            }[]
            filter?: string[];
        }

        type response = {
            instances: {
                contextlevel: string,
                id: number,
                updates: {
                    name: string,
                    timeupdated: number,
                    itemids: {
                    }[],
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

export default course;