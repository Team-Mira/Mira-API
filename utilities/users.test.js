const {mostActiveUser, mostIgnoredUser} = require('./users.js')
const {message, mention, reaction} = require('../server/db')

const testData = [
  {userId: 1, content: 'blah', reactions: [{id: 3}, {id: 4}]},
  {userId: 1, content: 'blah', reactions: [{id: 4}]},
  {userId: 1, content: 'blah', reactions:[ {id: 5}]},
  {userId: 0, content: 'blah', reactions: [{id: 6}]},
  {userId: 0, content: 'blah', reactions: [{id: 7}]}
]

describe.only('user data utilities', () => {  
    test('calculate user with most messages', () => {
     expect(mostActiveUser(testData)).toBe(1)
    });

    test('handle errors', () => {
        const badData = []
        expect(() => mostActiveUser(badData)).toThrow()
    })

    test('ignored user returns userId of user with lowest ratio of reactions to messages', () => {
      expect(mostIgnoredUser(testData)).toBe(1)
    })
  });
