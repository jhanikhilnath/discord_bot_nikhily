function validateUser(message, args) {
  if (!message.mentions.members.first()) {
    message.reply('User Does Not exist');
    return false;
  }

  if (!args[1] || args[1].length === 0) {
    message.reply('Please provide reason Correctly!!');
    return false;
  }
  return true;
}

module.exports.kick = (message, args) => {
  if (!validateUser(message, args)) return;

  const [user, ...reason] = args;

  if (!message.member.permissions.has('KICK_MEMBERS')) {
    message.reply("You don't have the required permissions");
    return;
  }

  // Actual Kicking Logic

  message.mentions.members
    .first()
    .kick(user)
    .then(member => {
      message.reply(`${member} was kicked because ${reason.join(' ')}`);
    });
};

module.exports.ban = (message, args) => {
  if (!validateUser(message, args)) return;

  const [user, ...reason] = args;

  if (!message.member.permissions.has('BAN_MEMBERS')) {
    message.reply("You don't have the required permissions");
    return;
  }
  if (message.mentions.members.first().permissions.has('MANAGE_MESSAGES')) {
    message.reply('User is a Mod, please remove Mod Perms and try again');
    return;
  }
  // Actual Banning Logic

  message.mentions.members
    .first()
    .ban({ reason })
    .then(member => {
      message.reply(`${member} was banned because ${reason.join(' ')}`);
    });
};

module.exports.prefix = (message, PREFIX) => {
  message.reply('My Prefix is `' + PREFIX + '`');
};
