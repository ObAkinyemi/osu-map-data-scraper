const fs = require('fs')

import * as osu from "osu-api-v2-js"

require('dotenv').config();
const port = process.env.PORT;
console.log(`The port is ${port}`);
id = process.env.client_id;
secret = process.env.client_secret;


// fs.readFile('test.txt', 'utf-8', (err, data) => {
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });

// fs.writeFile(
//     'test.txt',
//     'steamcode is no longer here',
//     (err, data) => {
//     if(err){
//         console.error(err);
//         return;
//     }
// });
// c_id = getenv("c_id");
// console.log(c_id);
// async function getTopPlays(username) {
//     try {
//         const api = await osu.API.createAsync("41606", "LGRrogtg3SdChaIqGkrTwCvV3bK7xvX0VjIsPt0Y")
//     } catch (error) {
//         console.error(error);
//     }
// }