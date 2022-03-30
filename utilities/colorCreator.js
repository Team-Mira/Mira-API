const randomColor = require('randomcolor');

const colorCreator = (id) => {
  const seed = id.length > 10 ? id.slice((id.length - 10)) : id

  const color = randomColor({seed, luminosity:'dark', format: 'rgb',})

  const main = color.substring(0,color.length - 1) + ', 0.2)'
  const border = color.substring(0,color.length - 1) + ', 1)'

  return { main, border }
}

module.exports = colorCreator
