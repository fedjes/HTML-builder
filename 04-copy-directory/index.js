const fs = require("fs");


fs.rm("./04-copy-directory/files-copy", { recursive: true }, err => {
fs.mkdir("./04-copy-directory/files-copy", {recursive: false}, err => {
    console.log('new folder');
    
    fs.readdir("./04-copy-directory/files", (err, files) => {
        if(err) throw err; 
        console.log('В папке  files находятся файлы: ' + files);
        
        for(let i = 0; i < files.length; i++) {
            fs.copyFile("./04-copy-directory/files/"+files[i],"./04-copy-directory/files-copy/"+files[i], (err) => {
                if (err) throw err;
              });
           
        }
     });   
})

})
