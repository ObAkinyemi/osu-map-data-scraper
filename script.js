import fs from 'fs'
import * as osu from 'osu-api-v2-js'
import dotenv from 'dotenv'
import * as http from "http"
import { exec } from "child_process"
import { json } from 'stream/consumers';
dotenv.config();

// console.log(process.env);
console.log("your mom");
const id = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;
const token = process.env.TOKEN;
const redirect_uri = process.env.REDIRECT_URI;

// TypeScript

// Because we need to act as an authenticated user, we need to go through the authorization procedure
// This function largely takes care of it by itself
async function getCode(authorization_url) {
	// Open a temporary server to receive the code when the browser is sent to the redirect_uri after confirming authorization
	const httpserver = http.createServer()
	const host = redirect_uri.substring(redirect_uri.indexOf("/") + 2, redirect_uri.lastIndexOf(":"))
	const port = Number(redirect_uri.substring(redirect_uri.lastIndexOf(":") + 1).split("/")[0])
	httpserver.listen({host, port})

	// Open the browser to the page on osu!web where you click a button to say you authorize your application
	console.log("Waiting for code...")
	const command = (process.platform == "darwin" ? "open" : process.platform == "win32" ? "start" : "xdg-open")
	exec(`${command} "${authorization_url}"`)

	// Check the URL for a `code` GET parameter, get it if it's there
	const code = await new Promise((resolve) => {
		httpserver.on("request", (request, response) => {
			if (request.url) {
				console.log("Received code!")
				response.end("Worked! You may now close this tab.", "utf-8")
				httpserver.close() // Close the temporary server as it is no longer needed
				resolve(request.url.substring(request.url.indexOf("code=") + 5))
			}
		})
	})
	return code
}

async function getSelf() {
	// Get the code needed for the api object
	const url = osu.generateAuthorizationURL(id, redirect_uri, ["public", "identify"])
	const code = await getCode(url)
	const api = await osu.API.createAsync(id, secret, {code, redirect_uri}, {verbose: "all"})
	
	// Use the `me` endpoint, which gives information about the authorized user!
	const me = await api.getResourceOwner()
	console.log("My id is", me.id, "but I'm better known as", me.username)
	
	// If you're not gonna use the token anymore, might as well revoke it for the sake of security
	await api.revokeToken().then(() => console.log("Revoked the token, it can no longer be used!"))
}

// getSelf();


async function logUserTopPlayBeatmap(username) {
    // It's more convenient to use `osu.API.createAsync()` instead of `new osu.API()` as it doesn't require you to directly provide an access_token!
    // In a proper application, you'd use this function as soon as the app starts so you can use that object everywhere
    // (or if it acts as a user, you'd use this function at the end of the authorization flow)
    const api = await osu.API.createAsync(`${id}`, `${secret}`) // with id as a number

    const user = await api.getUser(username) // We need to get the id of the user in order to request what we want
    const score = (await api.getUserScores(user, "best", osu.Ruleset.osu, {lazer: false}, {limit: 1}))[0] // Specifying the Ruleset is optional
    const beatmapDifficulty = await api.getBeatmapDifficultyAttributesOsu(score.beatmap, score.mods) // Specifying the mods so the SR is adapted to them

    const x = `${score.beatmapset.artist} - ${score.beatmapset.title} [${score.beatmap.version}]`
    const y = `+${score.mods.map((m) => m.acronym).toString()} (${beatmapDifficulty.star_rating.toFixed(2)}*)`
    // console.log(`${username}'s top play is on: ${x} ${y}`)
    return x;
    // Doomsday fanboy's top play is on: Erio o Kamattechan - os-Uchuujin(Asterisk Makina Remix) [Mattress Actress] +DT,CL (8.87*)
}

async function getBeatmapSetData(beatmapset){
    try {
        const api = await osu.API.createAsync(`${id}`, `${secret}`).then(token => { return token } );
        const set = await api.getBeatmapset(beatmapset)
        // console.log(set);
        // console.log(typeof(set));
        return await set;

    } catch (error) {
        console.error("Error fetching data", error);
    }
}

async function testWrite(filename, input) {
    try {
        await fs.writeFile(filename, input, (err) => err && console.error(err));
        
    } catch (error) {
        console.error("Error writing files", error);
    }
}
const example_set = await getBeatmapSetData(1685877);
testWrite('test-data.txt', JSON.stringify(example_set.title));
console.log(await logUserTopPlayBeatmap("Saiyenmam"));

// fs.writeFile('test-data.txt', example_set);