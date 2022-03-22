const {highestMessageUser} = require('./users.js')

describe('user data utilities', () => {  
    test('calculate user with most messages', () => {
      const testData = [
        {userId: 1, message: 'blah'},
        {userId: 1, message: 'blah'},
        {userId: 1, message: 'blah'},
        {userId: 0, message: 'blah'},
        {userId: 0, message: 'blah'}
    ]
     expect(highestMessageUser(testData)).toBe(1)
    });

    test('handle errors', () => {
        const badData = []
        expect(() => highestMessageUser(badData)).toThrow()
    })
  });