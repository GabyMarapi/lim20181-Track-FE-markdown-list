#!/usr/bin/env node
const [, , ...args] = process.argv

const path = require('path'),
	fs = require('fs'),
	https = require('https'),
	http = require('http')

dirPath = args[0].replace("/", "\\\\");

const [filePath, ...opts] = args

const options = {
	validate: null,
	stats: null
}

opts.indexOf('--validate') === 1 ? options.validate = true : options.validate = false
opts.indexOf('--stats') === 1 ? options.stats = true : options.stats = false

const arrFiles = []
const arryElm = []
const urlStatusOk = [];
const urlStatusNotFound = [];

let a = null

const generalInf = (url, statusMessage, statusCode) => {
	
		
}

const validateStatusUrl = (url, response) => {
	generalInf(url, response.statusMessage, response.statusCode)
}

const validateHttps = (url) => {
	https.get(url, (response) => {
		validateStatusUrl(url, response)
	}).on('error', e => {
		console.log('error');
	})
}

const validateHttp = (url) => {
	http.get(url, (response) => {
		validateStatusUrl(url, response)
	}).on('error', e => {
		console.log('error');
	})
}

const findURL = (data) => {
	const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
	const listUrl = data.match(regExp)

	listUrl.forEach(element => {
		element.substr(0, 5) === 'https' ? validateHttps(element) : validateHttp(element)
	});
}

const getFiles = (dir) => {
	const files = fs.readdirSync(dir);
	for (let file in files) {
		let next = path.join(dir, files[file]);
		fs.lstatSync(next).isDirectory() === true ? getFiles(next) : arrFiles.push(next)
	}
}

const validateFileMd = (arrFiles) => {
	const filesMd = arrFiles.filter(elem => {
		return path.extname(elem) == '.md'
	})
	return filesMd
}

const readFileMd = (filesExtendMd) => {
	filesExtendMd.forEach(element => {
		fs.readFile(element, 'utf8', (err, data) => {
			if (err) {
				throw new Error('Failed ' + err)
			} else {
				findURL(data)
			};
		});
	});

}

getFiles('C:\\Users\\gmarapi\\Documents\\lim20181-Track-FE-markdown-list\\prueba')
const filesExtendMd = validateFileMd(arrFiles)
readFileMd(filesExtendMd)

console.log(a);

const validateOptions = (options) => {
	if (options.validate === 'true' && options.stats === 'true') {

	}
	else if (options.validate === 'true') {

	}
	else if (options.stats === 'true') {

	}
	else {

	}
}

const mdlinks = (path, option) => {

	//validateOptions(option)
	const promise = new Promise((resolve, reject) => {
		if (option == 'a') {
		//	const array = [{ href: 'href', text: 'text', file: 'file' }]
			resolve(arryElm)
		}
		else {
			reject(new Error('No existe un array'))
		}

	})

	return promise
}

//mdlinks()

mdlinks('./read.md', 'a').then(result=>{
	console.log(result)
}).catch(err =>{console.log(err.message)})

//export{mdlinks}


		/*const getFiles = (dir) => {
			return new Promise((resolve, reject) => {

				const files = fs.readdir(dir, 'utf8', (err, files) => {
					if (err) {
						throw new Error('Failed ')
					} else {
						files.forEach(file => {
							let next = path.join(dir, file);
							fs.lstatSync(next).isDirectory() === true 
							? arrFiles.push(getFiles(next)) 
							: arrFs.push(next)
						})
						resolve(arrFs)
					}
				})
				console.log(arrFiles.length);
				console.log('a')
			})
			
		}
		arrFiles.push(getFiles(dir))
		console.log(arrFiles.length);
		Promise.all(arrFiles).then(r => {
			console.log(r);
			resolve(r)
		})*/

		//fs.lstat(next, (err, stats) => {stats.isDirectory() === true ? getFiles(next): arrFs.push(next)})