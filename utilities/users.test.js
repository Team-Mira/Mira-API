const {mostActiveUser, mostIgnoredUser} = require('./users.js')
const {message, mention, reaction} = require('../server/db')
const fs = require('fs')
const path = require("path");

let testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./test.json"), 'utf-8'))

describe('user data utilities', () => {  

    test('calculate user with most messages', () => {
     expect(mostActiveUser(testData.messages)).toBe('274764470503604224')
    });

    test('handle errors', () => {
        const badData = []
        expect(() => mostActiveUser(badData)).toThrow()
    })

    test('ignored user returns userId of user with lowest ratio of reactions to messages', () => {
      expect(mostIgnoredUser(testData.messages)).toBe('274764470503604224')
    })
  });