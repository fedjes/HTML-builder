const fs = require("fs");


fs.readdir('./03-files-in-folder/secret-folder', {withFileTypes: true}, (err, files) => { 
   files.forEach(el => {
      if(!el.isDirectory()){
         let pathE = './03-files-in-folder/secret-folder/' + el.name;
         prom(pathE).then(res => {
            let fileSize = res;
            let i = el.name.split('.').join(' - ');
            i = i + " - " + fileSize/1000 + "KB";
            console.log(i);
         })
      }
   })
})
function prom (path){
   return new Promise ((resolve, reject) => {
      fs.lstat(path, (err, stats) => { 
         if (err) { reject(err) }
         resolve(stats.size);
      })
   })
   
} 