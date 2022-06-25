let xfar = require('xfarr-api')
let handler = async (m, { usedPrefix, command, conn, args, text }) => {
	 	  if (!args[0]) throw `${mg}*Escriba el nombre para buscar la Imagen!!*\n\n*EJEMPLO*\n*${usedPrefix + command}* Animales`
xfar.Pinterest(args[0]).then(async data => {
	
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
	
let pincpt = `🔗Link media : ${data.url}`
await conn.sendFile(m.chat, data.url, 'pin.jpg', `🌟 *Resultado de:* _${text}_\n${wm}`, fkontak, m)
 await conn.send3But(m.chat, wm, `ᴇɴʟᴀᴄᴇ | ᴘɪɴᴛᴇʀᴇꜱᴛ \n${data.url}`, '𝗦𝗜𝗚𝗨𝗜𝗘𝗡𝗧𝗘  🌀', `${usedPrefix}pinterest ${text}`, '📡 𝗕𝗨𝗦𝗖𝗔𝗥 𝗘𝗡 𝗚𝗢𝗢𝗚𝗟𝗘', `${usedPrefix}image ${text}`, '𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 ⚡', `.menu`, fkontak, m)})
 }
handler.help = ['pinterest <keyword>']
handler.tags = ['internet', 'downloader']
handler.command = /^(pinterest)$/i

module.exports = handler
