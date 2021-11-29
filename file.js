const fs = require("fs");
fs.readFile('./welcome.txt', "utf-8", (err, data) => console.log(data));

const quote = "god is great";
const quote1 = "deepa";
fs.writeFile('./god.txt', quote, (err) => console.log("writing..."));

const [, , nooffiles] = process.argv;
function createfile(quotes, nooffiles) {
    for (var i = 1; i <= nooffiles; i++) {
        fs.writeFile(`./backup/text-${i}.txt`, quotes, (err) => console.log("writing..."));
    }
}
createfile(quote, nooffiles);
fs.appendFile("./god.txt", quote1, (err) => console.log("appending..."));

fs.unlink("./backup/text-1.txt", (err) => console.log("deleting..."));

fs.readdir("./backup1", (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }
})