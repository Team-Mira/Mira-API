const {
    topChannel,
    wordCount,
    topReaction,
    hottestMessage
  } = require('./singleUser')
const fs = require('fs')
const path = require('path')
let testData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './test.json'), 'utf-8')
  );
describe('single user aggregators', () => {
    test('topChannel returns top channel', () => {
        expect(topChannel(testData.messages)).toBe('953680127726866445')
    })

    test('topWord returns top word', () => {
        expect(wordCount(testData.messages)).toBe('test')
    })

    test('topReaction returns top reaction', () => {
        expect(topReaction(testData.reactions)).toBe('♥️')
    })

    test('hottestMessage',() => {
        expect(hottestMessage(testData.messages)).toBe("test message again")
    }) 
})