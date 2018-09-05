#!/usr/bin/env node

const [, , ...args] = process.argv
const [filePath, ...opts] = args

const options = {
	validate: null,
	stats: null
}
const modules = require('./index')

opts.indexOf('--validate') !== -1 ? options.validate = true : options.validate = false
opts.indexOf('--stats') !== -1 ? options.stats = true : options.stats = false

modules.mdlinks(filePath, options).then(result => {
	console.log(result);
	
	if (options.validate && options.stats) {
		console.log(` Total: ${result.total} \n Unique: ${result.unique} \n Broken: ${result.broken}`)
	}
	else if (options.validate) {
		result.forEach(element => {
			console.log(`${element.file}  ${element.href}\t${element.text}\t${element.statusCode}\t${element.statusMessage}`)
		});
	}
	else if (options.stats) {
		console.log(` Total: ${result.total} \n Unique: ${result.unique}`)
	}
	else {
		result.forEach(element => {
			console.log(`${element.file}\t${element.href}\t${element.text}`)
		});
	}
}).catch(err => {
	console.log('Error en el ingreso');
})