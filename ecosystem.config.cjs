require("dotenv/config");

// We use this file when working with PM2 for compatibility when loading ENV variable(s)
// as a replacement for `npm run start`
module.exports = {
	apps: [
		{
			name: "Livemap",
			script: "build/index.js",
			env: {
				PORT: process.env.PORT
			}
		}
	]
}