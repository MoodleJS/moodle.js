function getBadgesAndWarnings(client) {
    return client.call({
        wsfunction: "core_badges_get_user_badges ",
        method: "GET",
    }).then(function (response) {
        let parsedRes = JSON.stringify(response, null, 4)
        parsedRes = JSON.parse(parsedRes)
        if (parsedRes.errorcode) throw new Error(parsedRes.errorcode, parsedRes.message)
        console.log(parsedRes);
        return;
    });

}


function getModules(client, id) {
    return client.call({
        wsfunction: "core_course_get_contents",
        method: "POST",
        args: {
            courseid: id
        }
    }).then(function (response) {
        let parsedRes = JSON.stringify(response, null, 4)
        //parsedRes = JSON.parse(parsedRes)
        console.log(parsedRes);
        if (parsedRes.errorcode) throw new Error(parsedRes.errorcode, parsedRes.message)
    });
}