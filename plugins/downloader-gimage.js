let { promisify } = require('util')
let _gis = require('g-i-s')
let gis = promisify(_gis)

let handler  = async (m, { conn, args, text, usedPrefix, command }) => {
const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}   
  
  if (!text) return m.reply(`${mg}*Escriba el nombre para buscar la Imagen!!*\n\n*EJEMPLO*\n*${usedPrefix + command}* Animales`)
  let results = await gis(text) || []
  let { url, width, height } = pickRandom(results) || {}
  if (!url) return m.reply('Not Found')
  conn.send3ButtonImg(m.chat, url, `
🪄 *Resultado de:* _${text}_`.trim(), `ɢᴏᴏɢʟᴇ ɪᴍᴀɢᴇɴ\nᴀɴᴄʜᴏ ⇢ ${width} | ᴀʟᴛᴜʀᴀ ⇢ ${height}\n${wm}`, '𝗦𝗜𝗚𝗨𝗜𝗘𝗡𝗧𝗘  🌀', `.gimage ${text}`, '🎁 𝗕𝗨𝗦𝗖𝗔𝗥 𝗘𝗡 𝗣𝗜𝗡𝗧𝗘𝗥𝗘𝗦𝗧', `${usedPrefix}pinterest ${text}`, '𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 ⚡', `.menu`, m)
}
handler.help = ['image | gimage *texto*']
handler.tags = ['internet', 'downloader']
handler.command = /^(gimage|googleimage|image|images)$/i

module.exports = handler

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
