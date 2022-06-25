const { mediafireDl } = require('../lib/mediafire.js')
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
if (!text) return m.reply(`${mg}*Ingrese un Enlace válido de Mediafire*\n\n*EJEMPLO*\n*${usedPrefix + command}*`)
if (!args[0].includes('mediafire.com')) return m.reply(error.linkmf)
let mdjon = args.join(' ')
res = await mediafireDl(mdjon)
result = `*╭𝄗𝄗✦ MEDIAFIRE ✦𝄗𝄗⬣*
 ⎸ *_📡 Información encontrada_*
 ⎸一一一一一一一一
 ⎸ *_❊ *Nombre_* ┊ ${res[0].nama}
 ⎸ *_❊ *Peso_* ┊ ${res[0].size}
 ⎸ *_❊ Enlace_* ┊ ${res[0].link}
 *╰𝄗𝄗𝄗✦ ⍟ ${vs} ✦𝄗𝄗𝄗⬣*`

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
   m.reply(conn.sendBut(m.chat, result, `ᴍᴇᴅɪᴀꜰɪʀᴇ | ${wm}`, null, null, fkontak,  m ))
    m.reply(conn.sendBut(m.chat, global.wait, `${wm}`, `✨ 𝗠𝗘𝗡𝗨`, '.menu', fkontak,  m ))
//m.reply(result)
//await sleep(100)
      conn.sendFile(m.chat, res[0].link, res[0].nama, null, m, false, {asDocument:true, mimetype:res[0].mime})
}
handler.help = ['mediafire'].map(v => v + ' *enlace*')
handler.command = ['mediafire']
module.exports = handler


