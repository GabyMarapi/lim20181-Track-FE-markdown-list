#!/usr/bin/env node
const [, , ...args] = process.argv
//const dirPath = args[0].replace("/", "\\\\");
//console.log(dirPath);
if (args.length >= 1) {
    const [path, ...opts] = args
    console.log(path, opts)
}
//console.log(process.argv)

const path = require('path'),
    fs = require('fs'),
    https = require('https'),
    http = require('http')

let arrFiles = [];

const crawl = (dir) => {
    // console.log('[+]'+dir);
    const files = fs.readdirSync(dir);

    for (let file in files) {
        let next = path.join(dir, files[file]);
        //console.log(next);

        if (fs.lstatSync(next).isDirectory() === true) {
            crawl(next)
            // console.log(next); 
        }
        else {
            //console.log('file ' + next);
            arrFiles.push(next)
        }
    }
}
const validateHttps = () => {
    let urlStatusOk = [];
    let urlStatusNotFound = [];
    const url = 'https://nodejs.org/api/http.sss'
    https.get(url, (response) => {
        // Do stuff with response
        //console.log(res.statusCode);
        if (response.statusMessage === 'OK') {
            urlStatusOk.push(url)
        }
        if (response.statusMessage === 'Not Found') {
            urlStatusNotFound.push(url)
        }
        console.log(urlStatusNotFound);
    })
}
const validateHttp = () => {
    let urlStatusOk = [];
    let urlStatusNotFound = [];
    const url = 'http://librosweb.es/libro/xhtml/capitulo_4/url.html'
    http.get(url, (response) => {
        // Do stuff with response
        //console.log(response.statusCode);
        if (response.statusMessage === 'OK') {
            urlStatusOk.push(url)
        }
        if (response.statusMessage === 'Not Found') {
            urlStatusNotFound.push(url)
        }
        console.log(urlStatusNotFound, urlStatusOk);
    })
}
const readURL = (data) => {
    const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const listUrl = data.match(regExp)
    console.log(typeof listUrl);
}

const readFileMd = () => {
    fs.readFile('C:\\Users\\gmarapi\\Documents\\lim20181-Track-FE-markdown-list\\README.md', 'utf8', (err, data) => {
        if (err) {
            //console.log(err);

        } else {
            // console.log(data);
            readURL(data)

        };
    });
}



//crawl('C:\\Users\\gmarapi\\Documents\\lim20181-Track-FE-markdown-list')   
//readFileMd() 
//validateHttp()


const uniqueLink = () => {
    let ages = [3, 10, 18, 18, 20, 3, 18,18, 9, 3, 9];
    const contador = {};
    ages.forEach((elem) => {
        if (!contador.hasOwnProperty(elem)) {
            contador[elem] = 0;
        }
        contador[elem] = contador[elem] + 1;
    })

    const unicos = Object.keys(contador).filter((elem) => contador[elem] === 1)

    console.log(unicos)
}

//uniqueLink()
//crawl(dirPath)
//console.log(arrFiles);
//console.log(crawl('C:\Users\gmarapi\Documents\lim20181-Track-FE-markdown-lis'));
const validateOption = () =>{
}

const mdlinksTestPromise = (path, option) => {
    const promise = new Promise( (resolve, reject)=> {
        if (option == 'a') {
            const array = [{ href: 'href', text: 'text', file: 'file' }]
            resolve(array)
        }
        else {
            reject(new Error('No existe un array'))
        }

    })

    return promise
}

mdlinksTestPromise('./read.md', 'b')
.then(result=>{
    console.log(result)
})
.catch(err =>{
    console.log(err.message)
})

const crawl1 = (dir) => {
    console.log('[+]'+dir);
    const files = fs.readdirSync(dir);
    console.log(files);
    
}

crawl1('./test')