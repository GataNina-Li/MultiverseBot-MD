const { igstory } = require('../lib/scrape')
let handler = async (m, { conn, args, usedPrefix, command }) => {

  if (!args[0]) throw `${mg}*Ingrese el nombre de usuario para descargas las Historias del Instagram*\n\n*EJEMPLO*\n*${usedPrefix + command}* netflixlat`
  if (args[0].startsWith('http') || args[0].startsWith('@')) throw `username salah`

  igstory(args[0]).then(async res => {
    let igs = JSON.stringify(res)
    let json = JSON.parse(igs)
    
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
    //await m.reply(global.wait, fkontak, m)
    
    for (let { downloadUrl, type } of json)
      conn.sendFile(m.chat, downloadUrl, 'ig' + (type == 'image' ? '.jpg' : '.mp4'), `🌟 *AQUÍ TIENE LAS HISTORIAS!!*\n*${wm}*`, m)

  })

}
handler.help = ['igs'].map(v => v + ' *usuario de instagram*')
handler.tags = ['downloader']
handler.command = /^(igs)$/i

module.exports = handler
