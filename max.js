const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a ", function (a) {
    rl.question("Enter b ", function (b) {
        if (a > b) {
            console.log("Max:", a)
        } else {
            console.log("Max:", b);
        }

        rl.close();
    });
});

// rl.on("close", function () {
//     console.log("\nBYE BYE !!!");
//     process.exit(0);
// });