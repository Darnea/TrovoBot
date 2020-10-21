const Handlebars = require('handlebars');
const Bot = require('../../../../modules/Bot.js');
// const alerts = require('../alerts/alerts.js');

module.exports = {
    name: 'credits',
    description: "Gets credits.",
    permissions: [],
    chat: true, // Defines this as a Chat Command
    event: false, // Is this a Event?
    command: 'credits', // This is the Command that is typed into Chat!
    permissions: [], // This is for Permissisons depending on the Platform.
    cooldown: 5, // this is Set in Seconds, how long between the next usage of this command.
    credits: `Made by Wasfun`, // MAKE SURE YOU FILL THIS IN GOD DAMNIT!
    execute(client, data) {
        const userCredits = users_credits[data.user];
        if (!!userCredits && userCredits.credits) {
            client.sendMessage(`@${data.user} has ${userCredits.credits} credits`);
        } else {
            client.sendMessage(`@${data.user} doesn´t have any credits`);
        }
    },
    activate() {
        Bot.log(Bot.translate("processors.user_info.plugins.credits.activated"))
    },
    deactivate() {
        Bot.log(Bot.translate("processors.user_info.plugins.credits.deactivated"))
    }
};