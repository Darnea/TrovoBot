const Bot = require('../../modules/Bot.js');
const say = require('say')
var path = require('path');
const settings = require('./speak.json');


module.exports = {
  name: 'speak',
  description: "You can play a message",
  author: "Made by Wasfun",
  license: "Apache-2.0",
  command: 'speak',
  permissions: ['moderator', 'creator'],
  cooldown: 10, // this is Set in Seconds, how long between the next usage of this command.
  execute(client, data) {

    if (data.args.length > 0) {
      if(data.args[0] == 'stop'){
        say.stop();
      } else {
        say.speak(data.args.join(' '), settings.voice, settings.speed)
      }
    }
    else {
      client.sendMessage(Bot.translate("plugins.speak.nomessage"));
    }
  },
  activate() {
    userInfo = require(path.join(Bot.data, "users/users.json"));
    Bot.log(Bot.translate("plugins.speak.activated"))
  },
  deactivate() {
    userInfo = require(path.join(Bot.data, "users/users.json"));
    Bot.log(Bot.translate("plugins.speak.deactivated"))
  }
};
