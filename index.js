
var moodle_client = require("moodle-client");

moodle_client.init({
    wwwroot: "https://moodle.ibb-schulen.de/",
    token: "fe6ed10ae5e9c8807e6943dd381f49a2"

}).then(function (client) {
    getInfo(client);
    return getUpdateCourse(client, 3633)

}).catch(function (err) {
    console.log("Unable to initialize the client: " + err);
});


function getInfo(client) {
    return client.call({
        wsfunction: "core_webservice_get_site_info",

    }).then(function (info) {
        let parsed = JSON.stringify(info.functions, null, 4)
        parsed = JSON.parse(parsed)
        let newArr = []
        parsed.forEach(e => {
            newArr.push(e.name)
        })
        // console.log(newArr.join('\t'))
        console.log("%s; welcome to %s", info.fullname, info.sitename);
        return;
    })
}

function getUpdateCourse(client, id) {
    return client.call({
        wsfunction: "core_course_check_updates",
        method: "POST",
        args: {
            courseid: id,
            tocheck: { since: '1613720882', contextlevel: 1, id: 4041 }
            //          19189
            //          4041
        }
    }).then(function (response) {
        let parsedRes = JSON.stringify(response, null, 4)
        //parsedRes = JSON.parse(parsedRes)
        console.log(parsedRes);
        if (parsedRes.errorcode) throw new Error(parsedRes.errorcode, parsedRes.message)
    });
}


let subjectArray = {
    3633: 'Allgemein', 3272: 'Biologie', 3271: 'Sport', 3270: 'Spanisch',
    3269: 'Physik', 3267: 'Kunst', 3265: 'Geo', 3264: 'Geschichte', 3263: 'FvBo',
    3262: 'Ethik', 3261: 'Englisch', 3260: 'Deutsch', 3275: 'Mathe'
}
const errorArray = [{ name: "core_course_get_courses", error: 'no permission' }]