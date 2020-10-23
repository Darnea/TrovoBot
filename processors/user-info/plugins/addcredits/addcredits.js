const Bot = require('../../../../modules/Bot.js');
var path = require('path');
var settings = require('./addcredits.json');

module.exports = {
  name: 'addcredits', // Name of the Plugin
  description: "Returns how many points a user has",
  author: "Wasfun",
  license: "Apache-2.0",
  command: 'addcredits', // This is the Command that is typed into Chat!
  permission: ["creator", "moderator"], // This is for Permissisons depending on the Platform.
  cooldown: 30, // this is Set in Seconds, how long between the next usage of this command.
  execute(client, data) {

    const hasPermission = data.badges && (data.badges.indexOf("creator") > -1 || data.badges.indexOf("moderator") > -1);

    if (hasPermission && data.args.length > 0 && data.args[0].charAt(0) == '@' && data.user != data.args[0].substr(1)) {
      if (data.args[1] !== undefined && !isNaN(data.args[1])) {
        if (parseInt(data.args[1]) > 0 && data.args[1] <= settings.maxCredits) {
          if(!!users_credits[data.args[0].substr(1)]){
            users_credits[data.args[0].substr(1)].credits = parseInt(users_credits[data.args[0].substr(1)].credits) + parseInt(data.args[1]);
          
            client.sendMessage(Bot.translate("processors.user_info.plugins.addcredits.success",
              {
                user: data.user,
                receiver: data.args[0],
                amount: data.args[1]
              }));
          } else {
            users_credits[data.args[0].substr(1)] = {
              credits: data.args[1]
            };
          
            client.sendMessage(Bot.translate("processors.user_info.plugins.addcredits.success",
              {
                user: data.user,
                receiver: data.args[0],
                amount: data.args[1]
              }));
          }
          if(!users_credits[data.args[0].substr(1)].history) {
            users_credits[data.user].history = [];
          }
          users_credits[data.user].history.push({ user: data.args[0], amount: data.args[1]});

        }
        else if (parseInt(data.args[1]) < 1) {
          client.sendMessage(Bot.translate("processors.user_info.plugins.addcredits.negative"));
        } else if (parseInt(data.args[1]) > settings.maxCredits) {
          client.sendMessage(Bot.translate("processors.user_info.plugins.addcredits.limitExceeded", {
            amount: settings.maxCredits
          }));
        }
      }
    }
  },
  activate() {

    userInfo = require(path.join(Bot.data, "users/users.json"));
    Bot.log(Bot.translate("processors.user_info.plugins.addcredits.activated"))
  },
  deactivate() {
    userInfo = null;
    Bot.log(Bot.translate("processors.user_info.plugins.addcredits.deactivated"))
  }
};
