const {
  mostActiveUser,
  mostIgnoredUser,
  mostLongWinded,
  mostUsedReaction,
  townGossip,
} = require('./users.js');
const { generatePairs, pairStrength } = require('./pairs');
const { message, mention, reaction } = require('../server/db');
const fs = require('fs');
const path = require('path');

let testData = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './test.json'), 'utf-8')
);

describe('user data utilities', () => {
  test('calculate user with most messages', () => {
    expect(mostActiveUser(testData.messages)).toBe('274764470503604224');
  });

  test('handle errors', () => {
    const badData = [];
    expect(() => mostActiveUser(badData)).toThrow();
  });

  test('most used reaction', () => {
    expect(mostUsedReaction(testData.reactions)).toBe('♥️');
  });

  test('ignored user returns userId of user with lowest ratio of reactions to messages', () => {
    expect(mostIgnoredUser(testData.messages)).toBe('274764470503604224');
  });

  test('most verbose to return userId with highest average count', () => {
    expect(mostLongWinded(testData.messages)).toBe('274764470503604224');
  });

  test('town gossip returns the user who authored the most mentions', () => {
    expect(townGossip(testData.mentions)).toBe('393621989983780876');
  });
});