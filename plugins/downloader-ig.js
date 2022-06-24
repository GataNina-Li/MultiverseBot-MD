const { instagramdl, instagramdlv2, instagramdlv3, instagramdlv4 } = require('@bochilteam/scraper')

//import { instagramdl, instagramdlv2, instagramdlv3, instagramdlv4 } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {

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
  
if (!args[0]) throw `${mg}*Introduce un enlace valido de Instagram, para descargar La imagen o Vídeo*\n\n*EJEMPLO*\n*${usedPrefix + command}* _https://www.instagram.com/tv/CfHCqLDAg0o/?utm_source=ig_web_copy_link_`
const results = await instagramdl(args[0])
.catch(async _ => await instagramdlv2(args[0]))
.catch(async _ => await instagramdlv3(args[0]))
.catch(async _ => await instagramdlv4(args[0]))
for (const { url } of results) await conn.sendFile(m.chat, url, 'instagram.mp4', `⚡ *Url:* ${url}`, fkontak, m)
}
handler.help = ['ig | ighistoria', 'instagram | igreels'].map(v => v + ' *enlace*')
handler.tags = ['downloader']
handler.command =/^(instagram|ighistory(s)|ighistoria(s)|igreels|ig(dl)?)$/i

module.exports = handler
