declare namespace course {
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

export default course;