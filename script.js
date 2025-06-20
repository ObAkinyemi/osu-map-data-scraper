// import fs from 'fs'
import * as osu from 'osu-api-v2-js'
import dotenv from 'dotenv'
// dotenv.config();

// console.log(process.env);
console.log("your mom");
const CLIENT_ID = 41606;
const CLIENT_SECRET = 'LGRrogtg3SdChaIqGkrTwCvV3bK7xvX0VjIsPt0Y';
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0MTYwNiIsImp0aSI6IjkzMzU3MDliODBhM2JjZjMyOWQxMDg1YzhhNDlmYjkwMDQ3ZWEwNWEzOTQyM2I1ZjFkMDc5OTYxZjUxZjExZTIxYjY2MTY3M2U2ZTI3MTZiIiwiaWF0IjoxNzUwNDQ2NTczLjAxMTU4NiwibmJmIjoxNzUwNDQ2NTczLjAxMTU4OCwiZXhwIjoxNzUwNTMyOTcyLjk4NjUxNCwic3ViIjoiMTczNDI0ODAiLCJzY29wZXMiOlsiaWRlbnRpZnkiLCJwdWJsaWMiXX0.HWvOufWZkiZapG4YiApztIg71LAMUyPYToq9yJjTmbLZU2YbtVlGe07dSRypV7_967dV_nZKjG5ajJNaylyMyR-D7VDmU_C_vLNqFHevWUmE9kbXqR4HrIBs5tM9pkeuwvCTUd8srOldPB9C9MWJea0JDQ4LsI3w-naNrv0SxF5GxbhEVE16ywyCu7RVJWAQnBj4yUcafy0H6vGXLg_nQmk8ZMTN6ANcmE_Ul-fP7DlAhUT2SUYRMiq1ZeH6GB-Mx3G_TF8ec9NIJf-Iketh9GQ0m2S-hB5HHM14qOUt8yPQynl89wp55TJ91xx0CH2PbBeLAjOnK3WFZUeLzOwc0tUIsdlT9z-rCWOv5SWnieekXVxDnv8A_fCC2_HKRhN9n83g4m7QrlqWA97cOr0hgCdntjQCcrIhBsi6en6ZoRyyaT9EfNIewTgQ9mr1AMCdpQfMk0ExjD1aiNFNkvuJU5nb0tUWQWIpev5QUtJUJ2F7od48UuRpTnzSAALYi9sadwxHrKIcKtNfLX64W2ggLQpy30fVVKHlahIDvFwZ1Q5js2_xFKwWsI05hgcWNWlrB0OjskQuxmDAQPRKB3KIsCzAHt4w8NlsRVxie12JUcN9q8_uOYna7AhsR1lytWXRoh7rmgk6ZAaWaPeseqMHO28lTirBJS6qprwq2uJv8xs';
const REDIRECT_URI = 'http://localhost:7272/';

// TypeScript

async function logUserTopPlayBeatmap(username) {
    // It's more convenient to use `osu.API.createAsync()` instead of `new osu.API()` as it doesn't require you to directly provide an access_token!
    // In a proper application, you'd use this function as soon as the app starts so you can use that object everywhere
    // (or if it acts as a user, you'd use this function at the end of the authorization flow)
    const api = await osu.API.createAsync(`${CLIENT_ID}`, `${CLIENT_SECRET}`) // with id as a number

    const user = await api.getUser(username) // We need to get the id of the user in order to request what we want
    const score = (await api.getUserScores(user, "best", osu.Ruleset.osu, {lazer: false}, {limit: 1}))[0] // Specifying the Ruleset is optional
    const beatmapDifficulty = await api.getBeatmapDifficultyAttributesOsu(score.beatmap, score.mods) // Specifying the mods so the SR is adapted to them

    const x = `${score.beatmapset.artist} - ${score.beatmapset.title} [${score.beatmap.version}]`
    const y = `+${score.mods.map((m) => m.acronym).toString()} (${beatmapDifficulty.star_rating.toFixed(2)}*)`
    console.log(`${username}'s top play is on: ${x} ${y}`)
    // Doomsday fanboy's top play is on: Erio o Kamattechan - os-Uchuujin(Asterisk Makina Remix) [Mattress Actress] +DT,CL (8.87*)
}

logUserTopPlayBeatmap("Doomsday fanboy")