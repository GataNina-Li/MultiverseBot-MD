let fs = require('fs')
let handler  = async (m, { conn, usedPrefix }) => {
prep = conn.prepareMessageFromContent(m.chat, { orderMessage: { 
itemCount: 999999999999, status: 1,
message: `AwogAwogAwog`,
orderTitle: 'B',
sellerJid: '0@s.whatsapp.net',
thumbnail: fs.readFileSync('./src/welcome.jpg')
}}, {contextInfo: null, quoted: m})
conn.relayWAMessage(prep)
}



handler.help = ['ftroli']

handler.tags = ['main']

handler.command = /^ftroli$/i
handler.owner = false

module.exports = handler
