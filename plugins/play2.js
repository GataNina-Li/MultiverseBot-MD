let fs = require('fs')
let fetch = require('node-fetch')
let handler = async (m, {command, conn, text}) => {
if (!text) throw `Nombre?`
try {
  
if (command == 'play.1') {
conn.reply(m.chat, `Procesando...`, m)
let res = await fetch("https://api.dhamzxploit.my.id/api/ytplaymp3?text="+text)
//https://api.dhamzxploit.my.id/api/ytplaymp3?text=to%20the%20Bone%20lofi
let json = await res.json()
conn.sendFile(m.chat, res.json(), 'error.mp3', null, m, false, { mimetype: 'audio/mp4' })}
  //conn.sendFile(m.chat, json.descarga, 'error.mp3', ``, m)
 // conn.sendFile(m.chat, 'https://my-api-bice.vercel.app/api/ytplay?', 'apikey=nktesla&q="+text')
  
if (command == 'play.2') {
conn.reply(m.chat, `Procesando...`, m)
let res = await fetch("https://api.lolhuman.xyz/api/ytplay2?apikey=9b817532fadff8fc7cb86862&query="+text)
let json = await res.json()
conn.sendFile(m.chat, json.result.video, 'error.mp4', wm, m)} 
  
}catch(e){
m.reply('Error')
console.log(e)
}}
handler.help = ['play.1 | play.2'].map(v => v + ' *texto*')
handler.tags = ['downloader']
handler.command = ['play.1', 'play.2']
module.exports = handler 
