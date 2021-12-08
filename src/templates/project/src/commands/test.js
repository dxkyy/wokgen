module.exports = {
  category: "Testing",
  description: "Test Command",

  slash: false,
  testOnly: false,
  ownerOnly: false,

  callback: ({ message }) => {
    const reply = "Test!";

    if (message) {
      message.reply({
        content: reply,
      });
      return;
    }
  },
};
