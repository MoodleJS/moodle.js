import { config } from 'dotenv';
import { Client } from './src';

const parsed = config().parsed as any;
const { MOODLE_USER, MOODLE_PASSWD, MOODLE_ROOT } = parsed;

const client = new Client({
    wwwroot: MOODLE_ROOT,
    username: MOODLE_USER,
    password: MOODLE_PASSWD,
    logger: true
});

(async () => {
    const arr = await client.core.getAllCourses();
    console.log(arr.courses.length);
})();
