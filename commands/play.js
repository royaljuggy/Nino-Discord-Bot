const command = 'play';

// todo fix injection dependencies
async function handler(client, message, args) {
    let queue = client.player.createQueue(message.guild.id);
    await queue.join(message.member.voice.channel);
    let song = await queue.play(args.join(' ')).catch(err => {
        console.log(err);
        if(!guildQueue)
            queue.stop();
    });
    sendGuildMessage(message, `Now playing ${song}!!`)
    //message.channel.send(`Now playing ${song}`)
}

const DEBUG_MODE = false;

// TODO: refactor these into their own modules (.js files)
// for now this is event-driven; the bot can only message after a user asks for a command
function sendGuildMessage(guildMessage, msg) {
    if (DEBUG_MODE) console.log(msg);
    guildMessage.channel.send(msg);
}

module.exports = { command, handler };