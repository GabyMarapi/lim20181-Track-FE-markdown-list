import * as moduls from '../index'


//const funTest = require('../index')

describe('Funcion mdLinks', () => {

    it('Debería se una función', () => {
        return expect(typeof moduls.mdlinks).toEqual('function')
    });

    describe('Probando funciones mdLinks', () => {

        it('mdLinks(".\\test\\prueba").then() debería retornar [{ href,file,text }]', () => {
            const options = {
                stats: false,
                validate: false
            }
            return moduls.mdlinks('.\\test\\prueba\\prueba.md', options)
                .then(result => {
                    expect(result[0])
                        .toEqual(
                            {
                                href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
                                file: '.\\test\\prueba\\prueba.md',
                                text: 'Leer un Directorio'
                            }
                        )
                })

        });
        statusCode: 200
        it('mdLinks(".\\test\\prueba", { validate: true }).then() debería retornar [{ href,file,text,statusMessage,statusCode }]',
            () => {
                const options = {
                    stats: false,
                    validate: true
                }
                return moduls.mdlinks('.\\test\\prueba', options)
                    .then(result => {
                        expect(result[0])
                            .toEqual(
                                {
                                    href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
                                    file: 'test\\prueba\\prueba.md',
                                    text: 'Leer un Directorio',
                                    statusMessage: 'OK',
                                    statusCode: 200
                                }
                            )
                    })

            });
        it('mdLinks(".\\test\\prueba", { stats: true }).then() debería retornar { total, unique }',
            () => {
                const options = {
                    stats: true,
                    validate: false
                }
                return moduls.mdlinks('.\\test\\prueba', options)
                    .then(result => {
                        expect(result)
                            .toEqual(
                                {
                                    total: 7,
                                    unique: 5
                                }
                            )
                    })

            });
        it('mdLinks(".\\test\\prueba", { stats: true, validate: true }).then() debería retornar { total, unique, broken }',
            () => {
                const options = {
                    stats: true,
                    validate: true
                }
                return moduls.mdlinks('.\\test\\prueba', options)
                    .then(result => {
                        expect(result)
                            .toEqual(
                                {
                                    total:7,
                                    unique: 5,
                                    broken: 5
                                }
                            )
                    })

            });
        it('mdLinks(".\\test\\prueba")).then() debería retornar [{ href,file,text }]',
            () => {
                const options = {
                    stats: false,
                    validate: false
                }
                return moduls.mdlinks('.\\test\\prueba', options)
                    .then(result => {
                        expect(result[0])
                            .toEqual(
                                {
                                    href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
                                    file: 'test\\prueba\\prueba.md',
                                    text: 'Leer un Directorio'
                                }
                            )
                    })

            });

    });

});