const Bot = require('../../modules/Bot.js');
const say = require('say')
var path = require('path');
const settings = require('./speak.json');
const alerts = require('../alerts/alerts.js');

module.exports = {
  name: 'speak',
  description: "You can play a message",
  author: "Made by Wasfun",
  license: "Apache-2.0",
  command: 'speak',
  permissions: [],
  // permissions: ['moderator', 'creator'],
  cooldown: 10, // this is Set in Seconds, how long between the next usage of this command.
  execute(client, data) {
    const userCredits = users_credits[data.user];
    if (data.args.length > 0) {
      if (data.args[0] == 'stop') {
        say.stop();
      } else {
        if (!!userCredits && (userCredits.credits | 0) > 3) {
          say.speak(data.args.join(' '), settings.voice, settings.speed);
          users_credits[data.user].credits = userCredits.credits - 3;
        }
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
