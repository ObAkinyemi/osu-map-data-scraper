Post Mortem: Osu-Map-Data Scraper

Overview

Osu-Map-Data Scraper is a Node.js-based tool that extracts your most-played beatmaps from the osu! API. The goal was to build a streamlined way to collect player data and feed it into ChatGPT, which then generates personalized piano training plans inspired by the kHz osu! streaming guide and Hanon exercises. This project highlights my ability to integrate third-party APIs, work with authentication flows, and process structured data for creative and practical use cases.

⸻

Tech Stack & Tools
	•	Node.js
	•	osu-api-v2-js (by TTTaevas)
	•	OAuth2 Authorization Flow
	•	dotenv for managing credentials securely
	•	fs for file handling

⸻

How It Works
	1.	OAuth2 Authentication
The tool authenticates with osu! via OAuth2. A local HTTP server and browser redirect automatically retrieve the access token needed to call the API.
	2.	Fetching Most Played Maps
Using the user’s username, the script retrieves their user_id, then queries the osu! API for their most-played beatmaps using paginated requests.
	3.	Data Extraction & Filtering
For each beatmapset, the script filters and extracts the most relevant data points, focusing only on fields required for musical analysis (like difficulty, length, bpm, etc.).
	4.	Output
The script outputs:
	•	A .json file containing all filtered beatmap data
	•	A .txt summary log for quick viewing or analysis
	•	Optionally split files into chunks if needed for uploading or storage

⸻

Use Cases
	•	Musicians and rhythm gamers looking to turn their osu! stats into instrument-specific training routines
	•	Developers interested in using public gaming APIs for creative performance analytics
	•	Portfolio demonstration of integrating APIs, working with OAuth, file I/O, and asynchronous logic

⸻

How to Use

As an osu! player:
	1.	Clone the repo.
	2.	In .env, enter your CLIENT_ID, CLIENT_SECRET, and REDIRECT_URI from the osu! API dashboard.
	3.	Replace 'Saiyenmam' with your osu! username in script.js.
	4.	Replace 1700 with the number of top played maps you’d like to fetch.

As a viewer or researcher:
Use any public osu! username like Mrekk, Lifeline, or Xootynator.

⸻

Lessons Learned
	•	Learned how to integrate APIs using OAuth2 and work with redirect URIs securely.
	•	Improved handling of asynchronous loops and API rate limits using batching with offsets.
	•	Developed better file management strategies by filtering only useful data and formatting JSON correctly.
	•	Enhanced my debugging skills and understanding of Node.js modularity, especially with handling large-scale data.

⸻

Project Status

Fully functional. Can be repurposed for training guides in other instruments or analytical tools in gaming. Future improvements could include a frontend interface or export to CSV/Excel.