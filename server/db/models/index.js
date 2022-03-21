const Message = require('./message');
const Channel = require('./channel');
const User = require('./user');
const Server = require('./server')
const Emoji = require('./emoji')
const Reaction = require('./reaction')
const Reply = require('./reply')

Channel.hasMany(Message, {
  onDelete: 'cascade'
});
Message.belongsTo(Channel);

User.hasMany(Message);
Message.belongsTo(User);

Server.hasMany(Channel, {onDelete: 'cascade'});
Channel.belongsTo(Server)

module.exports = {
  Channel,
  Message,
  User,
  Server,
  Emoji,
  Reaction, 
  Reply
};
