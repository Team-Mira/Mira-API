function timeSpread(messages) {
 let timeArray = new Array(24);
  for (let message in messages) {
    timeArray[message.createdAt.getHours()]++
  }

  return timeArray;
}

module.exports = timeSpread
