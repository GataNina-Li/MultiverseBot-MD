let fs = require('fs')
let fetch = require('node-fetch')
let handler = async (m, {usedPrefix, command, conn, text}) => {
if (!text) throw `${mg}*Escriba el nombre o título para obtener el Vídeo*\n\n*EJEMPLO*\n*${usedPrefix + command}* Bellyache`
try {
  
/*if (command == 'play.1') {
conn.reply(m.chat, `Procesando...`, m)
let res = await fetch("https://api.dhamzxploit.my.id/api/ytplaymp3?text="+text)
//https://api.dhamzxploit.my.id/api/ytplaymp3?text=to%20the%20Bone%20lofi
let json = await res.json()
conn.sendFile(m.chat, res.json(), 'error.mp3', null, m, false, { mimetype: 'audio/mp4' })}
  //conn.sendFile(m.chat, json.descarga, 'error.mp3', ``, m)
 // conn.sendFile(m.chat, 'https://my-api-bice.vercel.app/api/ytplay?', 'apikey=nktesla&q="+text')*/
  
if (command == 'play.2') {
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
m.reply(conn.sendBut(m.chat, global.wait, `${wm}`, `✨ 𝗠𝗘𝗡𝗨`, '.menu', fkontak,  m ))
let res = await fetch("https://api.lolhuman.xyz/api/ytplay2?apikey=9b817532fadff8fc7cb86862&query="+text)
let json = await res.json()
conn.sendFile(m.chat, json.result.video, 'error.mp4', wm, m)} 
  
}catch(e){
m.reply('Error')
console.log(e)
}}
handler.help = ['play.2'].map(v => v + ' *texto*')
handler.tags = ['downloader']
handler.command = ['play.2']
module.exports = handler 
