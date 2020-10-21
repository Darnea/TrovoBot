const Handlebars = require('handlebars');
const Bot = require('../../../../modules/Bot.js');
// const alerts = require('../alerts/alerts.js');

module.exports = {
    name: 'checkcredits',
    description: "Gets credits from another user.",
    permissions: [],
    chat: true, // Defines this as a Chat Command
    event: false, // Is this a Event?
    command: 'checkcredits', // This is the Command that is typed into Chat!
    permissions: ["creator", "moderator"], // This is for Permissisons depending on the Platform.
    cooldown: 5, // this is Set in Seconds, how long between the next usage of this command.
    credits: `Made by Wasfun`, // MAKE SURE YOU FILL THIS IN GOD DAMNIT!
    execute(client, data) {
        const hasPermission = data.badges && (data.badges.indexOf("creator") > -1 || data.badges.indexOf("moderator") > -1);
        if (hasPermission && data.args.length > 0 && data.args[0].charAt(0) == '@') {

            const userCredits = users_credits[data.args[0].substr(1)];
            if (!!userCredits && userCredits.credits) {
                client.sendMessage(`${data.args[0]} has ${userCredits.credits} credits`);
            } else {
                client.sendMessage(`${data.args[0]} doesn´t have any credits`);
            }
        }
    },
    activate() {
        Bot.log(Bot.translate("processors.user_info.plugins.checkcredits.activated"))
    },
    deactivate() {
        Bot.log(Bot.translate("processors.user_info.plugins.checkcredits.deactivated"))
    }
};