const path = require('path'),
	fs = require('fs'),
	https = require('https'),
	http = require('http')

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
						statusCode: null
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
	const arrFiles = []
	return new Promise((resolve, reject) => {
		if (fs.lstatSync(dir).isFile()) {
			arrFiles.push(dir)
			resolve(arrFiles)
		}
		else if (fs.lstatSync(dir).isDirectory()) {
			const getFiles = (dir) => {
				const files = fs.readdirSync(dir);

				for (let file in files) {
					let next = path.join(dir, files[file]);
					fs.lstatSync(next).isDirectory() ? getFiles(next) : arrFiles.push(next)
				}
			}
			getFiles(dir)
			resolve(arrFiles);
		}
		else {
			reject(Error('no es un archivo'))
		}
	})
}

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
exports.mdlinks = (path, options) => {
	return new Promise((resolve, reject) => {
		getFilesList(path).then(validateFileMd).then(readFileMd).then(findUrlText).then(validateHttp).then(result => {
			const total = result.length
			const broken = result.filter(elem => elem.statusMessage !== 'OK').length
			const objUnique = {}
			const obj = {}
			result.forEach(elem => {
				if (!objUnique.hasOwnProperty(elem.href)) {
					objUnique[elem.href] = 0
				}
				objUnique[elem.href] = objUnique[elem.href] + 1
			})
			const unique = Object.keys(objUnique).filter((elem) => objUnique[elem] === 1).length

			if (options.validate && options.stats) {
				obj.total = total
				obj.unique = unique
				obj.broken = broken
				resolve(obj)
			}
			else if (options.validate) {
				resolve(result)
			}
			else if (options.stats) {
				obj.total = total
				obj.unique = unique
				resolve(obj)
			}
			else {
				const arrValidateStats = result.map(elem => {
					const newObj = {}
					newObj.href = elem.href
					newObj.file = elem.file
					newObj.text = elem.text
					return newObj
				})
				resolve(arrValidateStats)
			}
		})
	})
}