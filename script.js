const fs = require('fs')

// import * as osu from "osu-api-v2-js"



fs.readFile('test.txt', 'utf-8', (err, data) => {
    if(err){
        console.error(err);
        return;
    }
    console.log(data);
});

// fs.writeFile(
//     'test.txt',
//     'steamcode is no longer here',
//     (err, data) => {
//     if(err){
//         console.error(err);
//         return;
//     }
// });