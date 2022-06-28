let fs = require('fs')
let handler  = async (m, { conn, usedPrefix }) => {
const ftextt = {
	 key: { 
          fromMe: false,
	      participant: `0@s.whatsapp.net`, ...(m.chat ? 
	 { remoteJid: "0-1625305606@g.us" } : {}) 
                },
	 message: { 
		"extendedTextMessage": {
                 "text":"hallo bang",
                 "title": `Hmm`,
                 'jpegThumbnail': fs.readFileSync('./src/welcome.jpg')
                        }
	                  } 
                     }

m.reply(ftextt)



handler.help = ['ftroli']

handler.tags = ['main']

handler.command = /^ftroli$/i
handler.owner = false

module.exports = handler
