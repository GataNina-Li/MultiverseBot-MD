const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fs = require('fs')
let fetch = require('node-fetch') 
let xfar = require('xfarr-api')

let handler = async (m, { usedPrefix, command, conn, args }) => {
	 	  if (!args[0]) throw `Gunakan format: ${usedPrefix}${command} naruto`
xfar.Pinterest(args[0]).then(async data => {
let pincpt = `🔗Link media : ${data.url}`
//conn.sendFile(m.chat,data.url, 'pin.jpg', pincpt,m)})
m.reply(conn.sendButtonImg(m.chat, data, pincpt, wm2, 'Thanks', 'thanks', m))
//conn.sendButtonImg(m.chat, gggd, mcng, wm2, 'Inventory', '.inv', m)
	 //m.reply(conn.sendBut(m.chat, global.wait, `${wm}`, `✨ 𝗠𝗘𝗡𝗨`, '.menu', fkontak,  m ))

}
			        

handler.help = ['pinterest <keyword>']
handler.tags = ['internet', 'downloader']
handler.command = /^(pinterest)$/i

module.exports = handler
