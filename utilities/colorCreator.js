const randomColor = require('randomcolor');

const colorCreator = (seed) => {
  const color = randomColor({seed, luminosity:'dark', format: 'rgb',})

  const main = color.substring(0,color.length - 1) + ', 0.2)'
  const border = color.substring(0,color.length - 1) + ', 1)'

  return { main, border }
}

module.exports = colorCreator
