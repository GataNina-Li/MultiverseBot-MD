let fetch = require('node-fetch')
const { fbdl } = require('../lib/fbdl')
let handler = async(m, { conn, usedPrefix, args, command }) => {
  if (!args[0]) throw `*Ingrese un enlace válido de Facebook para Obtener el Vídeo*\n\n*EJEMPLO*\n*${usedPrefix + command}* https://www.facebook.com/268372269857888/posts/pfbid028gYhU4oFMPGbfJz7fDvBoUzJsoy5WD3CQGvERypC61uEVWrCr41Ucg2Gn1DhVd1Yl/\n\n*${usedPrefix + command}* https://fb.watch/dW4TFRZyt-/`
  let v = await fbdl(args[0])
  //m.reply(wait)
  const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message":  { 
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
  m.reply(conn.sendBut(m.chat, global.wait, `${wm}`, `✨ 𝗠𝗘𝗡𝗨`, '.menu', fkontak,  m ))
  await conn.sendFile(m.chat, v.hasil.link_high, 'fb.mp4', watermark, m)
}
handler.help = ['facebookvid | fbvid'].map(v => v + ' *enlace*')
handler.tags = ['downloader']

handler.command = /^facebookvid|fbvid$/i
handler.limit = true
module.exports = handler
