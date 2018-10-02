# Markdown

Librería que permite validar la existencia de enlaces rotos dentro de un archivo Markdown y obtener cálculos estadísticos en base a lo datos obtenidos.

## Instalar

`npm i GabyMarapi/lim20181-Track-FE-markdown-list -s`

![](https://fotos.subefotos.com/0daabd3eb88a6f193e6aeed086a81ea5o.png)

## Comandos

`md-link <path-or-file.md> options`

Options:

* Without options
* --validate
* --stats
* --validate --stats


### Without options

`md-link <path-or-file.md>`

![](https://fotos.subefotos.com/19e93c33ae3e21442b7ba87c2a7e05b1o.png)

### --validate

`md-link <path-or-file.md> --validate`

![](https://fotos.subefotos.com/2eb7d814243850989e7b57d314858230o.png)

### --stats

`md-link <path-or-file.md> --stats`

![](https://fotos.subefotos.com/13c980949e0850d095b2df1cfa74fc5do.png)

### --validate --stats

`md-link <path-or-file.md> --validate --stats`

![](https://fotos.subefotos.com/27cf2e1dac7624e0f6c4fd59432b7211o.png)

## Modulo

`mdLinks(path, options)`

 Retorna una promesa (Promise) que resuelve a un arreglo (Array) de objetos (Object).

## Test

![](https://fotos.subefotos.com/45cf5db58fc633225b79bd72a2936426o.png)