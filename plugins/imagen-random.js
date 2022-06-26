const fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix, command }) => {
	try {
let api = 'https://meme-api.herokuapp.com/gimme/sticker'
let res = await fetch('https://meme-api.herokuapp.com/gimme/sticker')
let img = await res.buffer()

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
conn.sendFile(m.chat, img, 'sticker.jpg', ``, fkontak, m)
		
 conn.send2But(m.chat, wm, ``, '𝗦𝗜𝗚𝗨𝗜𝗘𝗡𝗧𝗘  🌀', `${usedPrefix + command}`, '𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 ⚡', `.menu`, fkontak, m)})
} catch (e) {
console.log(e)
throw '*Error!*'
//conn.sendButton(m.chat, gimme, wm, api, [['NEXT', `.random`]], m)
    //conn.sendButtonImg(m.chat, api, text, wm, 'NEXT', '.random', m)
    //conn.sendButtonLoc(m.chat, await(await fetch(api)).buffer(), 'Nih', wm2, 'NEXT', '.random', m)
}
handler.help = ['random']
handler.tags = ['imagen']
handler.command = /^(random)$/i

module.exports = handler
