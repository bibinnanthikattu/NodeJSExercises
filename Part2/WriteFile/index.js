fs = require('fs')

const content='Hello world!'
fs.writeFile('hello-world.txt', content, function (err) {
  if (err) {
    return console.log(err);
  }
});