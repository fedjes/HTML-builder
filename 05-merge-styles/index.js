const fs = require("fs");
const path = require("path");
fs.readdir('./05-merge-styles/styles/', {withFileTypes: true}, (err, files) => { 
  
fs.unlink("./05-merge-styles/project-dist/bundle.css", (err) => {
    
})
fs.writeFile("./05-merge-styles/project-dist/bundle.css", '' , function (error) { 
    if (error) throw error;
})

files.forEach(el=>{
   
    if(path.extname('./05-merge-styles/styles/'+ el.name) === ".css" && el.isFile()){
        
        fs.readFile('./05-merge-styles/styles/' + el.name,"utf8", (err, data) => {
            fs.appendFile("./05-merge-styles/project-dist/bundle.css", data  , (err) => {
                if (err) {console.error(err)
                    return
                }
             });
        })
    }
})
})