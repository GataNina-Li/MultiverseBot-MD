
let handler = async (m, { conn, text, usedPrefix, command }) => {	
let api = 'https://meme-api.herokuapp.com/gimme/sticker'

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
	
//let pincpt = `🔗Link media : ${data.url}`
//conn.sendButton(m.chat, gimme, wm, api, [['NEXT', `.random`]], m)
    //conn.sendButtonImg(m.chat, api, text, wm, m)
	conn.sendButtonImg(m.chat, api, `Resultados de ${text}`, wm, 'Thanks', 'thanks', m) 
    //conn.sendButtonLoc(m.chat, await(await fetch(api)).buffer(), 'Nih', wm2, 'NEXT', '.random', m)
}
handler.help = ['random']
handler.tags = ['imagen']
handler.command = /^(random)$/i

module.exports = handler
