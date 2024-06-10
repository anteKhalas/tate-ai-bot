const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with the token you got from BotFather
const token = '7411299270:AAEuIL-_I3m-V5YE5jRsQKJpaCY6FUv4sMQ';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
console.log("Bot:", bot);
// Replace 'YOUR_CHANNEL_ID' with your channel ID where you want to send messages
const chatId = '-4265968246';

const fs = require('fs');

// Path to the MP3 file
const filePath = './files/ElevenLabs_2024-06-10T17_16_20_AITATE_ivc_s50_sb75_se66_b_m2.mp3';

// Read file into a buffer asynchronously
fs.readFile(filePath, (err, buffer) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Successfully loaded the file into a buffer
  console.log('File loaded into buffer. Buffer size:', buffer.length);
  // bot.sendVoice(chatId, buffer).then(console.log);
});

// Listen for any kind of message. There are different kinds of messages.
bot.on('message', (msg, metadata) => {
  console.log(msg.text);
  const commands = ['/sendtext', '/sendaudio', '/sendvoice'];

  if (msg.text?.startsWith('/sendvoice') || msg.text?.startsWith('/sendtext')) {
    const command = msg.text?.split(' ')[0];
    const args = msg.text?.substring(command.length + 1, msg.text?.length);

    switch (command) {
      case '/sendtext': {
        // Example usage:
        callGPT4oAndrewTate("How do I become successful in business?")
        .then(response => bot.sendMessage(chatId, response))
        .catch(error => console.error("Failed to fetch response:", error));
        break;
      }
      case '/sendaudio': {
        break;
      }
      case '/sendvoice': {
        fs.readFile(filePath, (err, buffer) => {
          if (err) {
            console.error('Error reading file:', err);
            return;
          }
        
          // Successfully loaded the file into a buffer
          console.log('File loaded into buffer. Buffer size:', buffer.length);
          bot.sendVoice(chatId, buffer).then(console.log);
        });
        break;
      }
      default: {
        console.log("Unsupported command!", msg.text);
      }
    }
  } else {
    console.log("Unsupported command:", msg.text)
  }
});
console.log("Bot listening for new messages...");

async function callGPT4oAndrewTate(prompt) {
  const apiKey = 'sk-proj-ckR6SNetMmrFfgkRUMyAT3BlbkFJxTB7YaJMJWyPC1X1jv9O';  // Replace with your actual OpenAI API key
  const endpoint = 'https://api.openai.com/v1/chat/completions';
  const systemPrompt = "You need to talk exactly like Andrew Tate.\n\nSpeak like him. Be short, aggressive, confident.\n\nRespond in voice like natural language where you emphasize words like this:\nBasically it's gonna work like this, very simple. I am telling you very simple. So! You just type in slash tate, and then your prompt and then my voice will be generated automatically. WE SENDIN' IT OR WHAT??!?\n";

  try {
    const response = await axios.post(endpoint, {
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const completion = response.data.choices[0].message.content;
    return completion;
  } catch (error) {
    console.error('Error calling the OpenAI API:', error.message);
    return null;
  }
}