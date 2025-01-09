require('dotenv').config()

const TIMEOUT = process.env.PING_TIMEOUT ?? 5_000
const ENDPOINT = process.env.ENDPOINT
const TOKEN = process.env.TOKEN

function doPing() {
    console.log("pinging")
    fetch(ENDPOINT, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${TOKEN}`
        },
        signal: AbortSignal.timeout(TIMEOUT),
    }).then(it => {
    	console.log("SUCCESS", it)
    }).catch(it => {
    	console.log("FAIL", it)
    })
}

doPing()
setInterval(doPing, TIMEOUT)

