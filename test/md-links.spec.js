import * as moduls from '../index'

//const funTest = require('../index')

describe('Funcion mdLinks', () => {

    it('Debería se una función', () => {
        return expect(typeof moduls.mdlinks).toEqual('function')
    });
    it('Debería retornar una promesa', () => {
        // return expect(typeof moduls.mdlinks(3,'a').then()).toBeTruthy()
    });
    it('La promesa deberia retornar una array', () => {
        return moduls.mdlinks(2, 'a')
            .then(result => {
                expect(result).toEqual([{ href: 'href', text: 'text', file: 'file' }])
            })
    });

    describe('Probando funciones mdLinks', () => {

        it('mdLinks("./some/example.md").then() debería retornar [{ href, text, file }]', () => {
            //mdLinks().then

        });
        it('mdLinks("./some/example.md", { validate: true }).then() debería retornar [{ href, text, file, status, ok }]', () => {
            //mdLinks().then

        });
        it('mdLinks("./some/example.md", { stats: true }).then() debería retornar [{ href, text, file, total, unique, domains }]', () => {
            //mdLinks().then

        });
        it('mdLinks("./some/dir")).then() debería retornar [{ href, text, file }]', () => {
            //mdLinks().then

        });
        it('path deberia diferenciar entre un absoluto y un relativo', () => {
            //mdLinks().then
            //absoiluto = 

        });
    });

});