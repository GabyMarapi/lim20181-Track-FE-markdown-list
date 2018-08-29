#!/usr/bin/env node
const [, , ...args] = process.argv

const path = require('path'),
	fs = require('fs'),
	https = require('https'),
	http = require('http')

dirPath = args[0].replace("/", "\\\\");

const [filePath, ...opts] = args
console.log(filePath);

const options = {
	validate: null,
	stats: null
}

opts.indexOf('--validate') === 1 ? options.validate = true : options.validate = false
opts.indexOf('--stats') === 1 ? options.stats = true : options.stats = false

let arryObjUrl = []
const urlStatusOk = [];
const urlStatusNotFound = [];

const validateHttp = (arrObj) => {
	return new Promise((resolve, reject) => {
		const arrPromises = arrObj.map(objElm => {
			return new Promise((resolve, reject) => {

				const urlDomainExists = (response) => {
					objElm.statusMessage = response.statusMessage
					objElm.statusCode = response.statusCode
					resolve(objElm);

				}
				const urlDomainDoesNotExist = () => {
					objElm.statusMessage = 'Domain does not exist'
					objElm.statusCode = 'Domain does not exist'
					resolve(objElm)
				}
				if (objElm.href.substr(0, 5) === 'https') {
					https.get(objElm.href, response => { urlDomainExists(response) })
						.on('error', e => { urlDomainDoesNotExist() })
				} else {
					http.get(objElm.href, response => { urlDomainExists(response) })
						.on('error', e => { urlDomainDoesNotExist() })
				}
			})
		})


		/*return new Promise((resolve, reject) => {
	
			const arrPromises = urlArray.map(element => {
				return new Promise((res, rej) => {
					const urlDomainExists = (element, response) => {
						res({
							url: element,
							statusMessage: response.statusMessage,
							statusCode: response.statusCode
						})
					}
					const urlDomainDoesNotExist = (element) => {
						res({
							url: element,
							statusMessage: 'Domain does not exist',
							statusCode: 'Domain does not exist'
						})
					}
					if (element.substr(0, 5) === 'https') {
						https.get(element, response => { urlDomainExists(element, response) })
							.on('error', e => { urlDomainDoesNotExist(element) })
					} else {
						http.get(element, response => { urlDomainExists(element, response) })
							.on('error', e => { urlDomainDoesNotExist(element) })
					}
				})
			})*/
		Promise.all(arrPromises).then(promiseUrls => {
			const arr = []
			promiseUrls.forEach(arrElement => {
				arr.push(arrElement)
			})
			resolve(arr)
		})

	})
}

const findUrlText = (arrObjPathData) => {
	return new Promise((resolve, reject) => {
		const regExp = /([[].*]).https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
		const arrObj = arrObjPathData.filter(elem => elem.data !== '')
		const arrPromises = arrObj.map(objElm => {
			return new Promise((resolve, reject) => {
				const arrUrl = objElm.data.match(regExp)
				const arr = []
				arrUrl.forEach(hrefElement => {
					const splitElm = hrefElement.split('](')

					arr.push({
						href: splitElm[1],
						file: objElm.path.replace("/", "\\\\"),
						text: splitElm[0].slice(1),
						statusMessage: null,
						statusCode: null,
						unique: null,
					})
				})
				resolve(arr)
			})
		})

		Promise.all(arrPromises).then(arrElement => {
			const arrObjHref = []
			arrElement.forEach(elem => {
				elem.forEach(objElem => {
					arrObjHref.push(objElem)
				})
			})
			resolve(arrObjHref)
		})
	})
}
const getFilesList = (dir) => {
	return new Promise((resolve, reject) => {
		const arrFiles = []
		const getFiles = (dir) => {
			const files = fs.readdirSync(dir);

			for (let file in files) {
				let next = path.join(dir, files[file]);
				fs.lstatSync(next).isDirectory() === true ? getFiles(next) : arrFiles.push(next)
			}
		}
		getFiles(dir)
		resolve(arrFiles);
	})
}

//getFiles1('C:\\Users\\gmarapi\\Documents\\lim20181-Track-FE-markdown-list\\prueba')
const validateFileMd = (arrFiles) => {
	return new Promise((resolve, reject) => {
		const filesMd = arrFiles.filter(elem => {
			return path.extname(elem) == '.md'
		})
		resolve(filesMd)
	})
}

const readFileMd = (filesExtendMd) => {
	return new Promise((resolve, reject) => {
		const arrPromisesUtf = filesExtendMd.map(element => {
			return new Promise((resolve, reject) => {
				fs.readFile(element, 'utf8', (err, data) => {
					if (err) {
						throw new Error('Failed ')
					} else {
						const objDataPath = {}
						objDataPath.path = element
						objDataPath.data = data
						resolve(objDataPath)
					}
				})
			})
		})
		Promise.all(arrPromisesUtf).then(promisesUft => {
			let totalData = []
			promisesUft.forEach(objDataPath => {
				totalData.push(objDataPath)
			})
			resolve(totalData)
		})
	})
}
const validateOptions = (options) => {
	let flagOptions = null
	if (options.validate === 'true' && options.stats === 'true') {
		return flagOptions = 1
	}
	else if (options.validate === 'true') {
		return flagOptions = 2
	}
	else if (options.stats === 'true') {
		return flagOptions = 3
	}
	else {

	}
}
const mdlinks = (path, object) => {
	return new Promise((resolve, reject) => {
		getFilesList(path).then(validateFileMd).then(readFileMd).then(findUrlText).then(validateHttp).then(r => {
			
			if (options.validate === 'true' && options.stats === 'true') {
				resolve()
			}
			else if (options.validate === 'true') {
				resolve()
			}
			else if (options.stats === 'true') {
				resolve()
			}
			else {
		
			}
			console.log(r);

		})
	})
}
mdlinks(filePath, options)





//export{mdlinks}


