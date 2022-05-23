// После завершения работы скрипта должна быть создана папка project-dist
// В папке project-dist должны находиться файлы index.html и style.css
// В папке project-dist должна находиться папка assets являющаяся точной копией папки assets находящейся в 06-build-page
// Запрещается использование fsPromises.cp()
// Файл index.html должен содержать разметку являющуюся результатом замены шаблонных тегов в файле template.html
// Файл style.css должен содержать стили собранные из файлов папки styles
// При добавлении компонента в папку и соответствующего тега в исходный файл template.html повторное выполнение скрипта приведёт файл index.html в папке project-dist в актуальное состояние перезаписав его. Файл style.css и папка assets так же должны поддерживать актуальное состояние
// Исходный файл template.html не должен быть изменён в ходе выполнения скрипта
// Запись в шаблон содержимого любых файлов кроме файлов с расширением .html является ошибкой


const fs = require("fs");

fs.rmdir("./06-build-page/project-dist", { recursive: false }, err => {
    fs.mkdir("./06-build-page/project-dist", { recursive: true }, err => {

        //index.html
        fs.readFile("./06-build-page/template.html", "utf8", function (err, template) {
            fs.readdir("./06-build-page/components/", (err, components) => {
                updateTemplate(components, template).then(res => {
                    fs.appendFile("./06-build-page/project-dist/index.html", res, function (err) {});
                });
            });
        });

        //styles.css
        fs.readdir("./06-build-page/styles", (err, files) => {
            for (let f = 0; f < files.length; f++) {
                fs.readFile("./06-build-page/styles/" + files[f], "utf8", function (error, data) {
                    fs.appendFile("./06-build-page/project-dist/style.css", data, function (err) {});
                });
            }
        });

        //assets
        fs.mkdir("./06-build-page/project-dist/assets", {
            recursive: false
        }, err => {
            fs.readdir("./06-build-page/assets/", (err, directorys) => {
                for (let i = 0; i < directorys.length; i++) {
                    fs.mkdir("./06-build-page/project-dist/assets/" + directorys[i], {
                        recursive: false
                    }, err => {
                        fs.readdir("./06-build-page/assets/" + directorys[i], (err, files) => {
                            for (let f = 0; f < files.length; f++) {
                                fs.copyFile("./06-build-page/assets/" + directorys[i] + "/" + files[f], "./06-build-page/project-dist/assets/" + directorys[i] + "/" + files[f], err => {});
                            }
                        });
                    });
                }
            });
        });
    });
});

let componentData = function (component) {
    return new Promise(resolve => {
        fs.readFile("./06-build-page/components/" + component, "utf8", function (err, data) {
            resolve(data)
        });
    });
}

let updateTemplate = function (components, template) {
    let temp = template;
    return new Promise(resolve => {
        for (let c = 0; c < components.length; c++) {
            componentData(components[c]).then(res => {
                temp = temp.replace("{{" + components[c].split(".")[0] + "}}", res);
                if (c == components.length - 1) resolve(temp);
            });
        }
    });
}