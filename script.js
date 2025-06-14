// import fs from 'fs'


import * as osu from "osu-api-v2-js"

import dotenv from 'dotenv';
dotenv.config();
console.log(process.env)


const id = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;
console.log(id);
console.log(secret);

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

async function logUserTopPlayBeatmap() {
    // It's more convenient to use `osu.API.createAsync()` instead of `new osu.API()` as it doesn't require you to directly provide an access_token!
    // In a proper application, you'd use this function as soon as the app starts so you can use that object everywhere
    // (or if it acts as a user, you'd use this function at the end of the authorization flow)
    try {
        const api = await fetch(`https://osu.ppy.sh/api/v2/`);// with id as a number

        console.log(api);
        // Doomsday fanboy's top play is on: Erio o Kamattechan - os-Uchuujin(Asterisk Makina Remix) [Mattress Actress] +DT,CL (8.87*)
    } catch(err) {
        console.error(err);
    }
}

logUserTopPlayBeatmap();