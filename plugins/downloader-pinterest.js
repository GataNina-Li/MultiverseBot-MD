let xfar = require('xfarr-api')
let handler = async (m, { usedPrefix, command, conn, args, text }) => {
	 	  if (!args[0]) throw `Gunakan format: ${usedPrefix}${command} naruto`
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
await conn.sendFile(m.chat, data.url, 'pin.jpg', wm, fkontak, m)
await conn.send2But(m.chat, wm, `ᴇɴʟᴀᴄᴇ\n${data.url}`, '𝗕𝗨𝗦𝗖𝗔𝗥 𝗘𝗡 𝗚𝗢𝗢𝗚𝗟𝗘', `${usedPrefix}image ${text}`, '𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 ⚡', fkontak, m)})
 
	
	}

			        

handler.help = ['pinterest <keyword>']
handler.tags = ['internet', 'downloader']
handler.command = /^(pinterest)$/i

module.exports = handler
