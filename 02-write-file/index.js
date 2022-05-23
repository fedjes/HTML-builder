const exiteOrCtrC = "see you later!";

const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface(
        process.stdin, process.stdout);
        fs.writeFile("./02-write-file/hello.txt","", function (error) { if (error) throw error;})
rl.setPrompt("Приветству! Введите текст ");
rl.prompt();
rl.on("line", (input) => {
    if(input === "exit") {
        console.log(exiteOrCtrC);
        rl.close();
        return;
    }
    
    fs.appendFile("./02-write-file/hello.txt", input , function (error) { if (error) throw error;})
    
});
rl.on("SIGINT", function () {
    process.emit("SIGINT");
    console.log(exiteOrCtrC);
    process.exit();
  });