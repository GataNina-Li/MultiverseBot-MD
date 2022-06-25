let xfar = require('xfarr-api')
let handler = async (m, { usedPrefix, command, conn, args }) => {
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
await conn.send3But(m.chat, wm, `ᴇɴʟᴀᴄᴇ\n${data.url}`, 'Menu', `${usedPrefix}menu`, 'Menu', `${usedPrefix}menu`, 'Menu', `${usedPrefix}menu`, m)})
 
	
	}

			        

handler.help = ['pinterest <keyword>']
handler.tags = ['internet', 'downloader']
handler.command = /^(pinterest)$/i

module.exports = handler
