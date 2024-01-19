const axios = require("axios");

const urls = [
    "https://randomuser.me/api/",
    "https://official-joke-api.appspot.com/random_joke",
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
    "https://api.ipify.org?format=json"

];

async function downloadContents(urls) {
    let contents;
    const getData = urls.map(async (url) => {
        const res = await axios.get(url);
        return res.data;
    });

    return contents = await Promise.all(getData);
}

downloadContents(urls).then((downloadedContents) => {
    console.log("content array", downloadedContents);
})
    .catch((error) => {
        console.log("Error:", error);
    });
