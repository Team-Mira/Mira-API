const getReport = require('./getReport')
const fs = require('fs')
const path = require('path')
let testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./test.json"), 'utf-8'))

const writeReport = async (data) => {
    const cData = await data
   fs.writeFile('./report.json', JSON.stringify(cData), err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
    }
describe.only('get report runs batch of report functions successfully', () => {
    test.only('call to getReport', () => {
       writeReport(getReport(testData.messages, testData.mentions, testData.reactions))
    })
})