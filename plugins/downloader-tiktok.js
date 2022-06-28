/*const hxz = require("hxz-api")
let handler = async(m,{text, conn}) => {

let p = await  hxz.ttdownloader(text)
const { nowm, wm, audio } = p
conn.sendFile(m.chat, nowm, null, 'Nih', m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok)$/i

module.exports = handler*/

import fetch from 'node-fetch'
let handler = async (m, {command, conn, text, args}) => {
if (!text) throw `Enlace?`
if (command == 'tiktokaudio') {
m.reply(wait)
let res = await fetch("https://api.dhamzxploit.my.id/api/tiktod/?url="+args[0])
let json = await res.json()
conn.sendFile(m.chat, json.result.nowatermark, 'error.mp3', null, m, false, { mimetype: 'audio/mp4' })}
if (command == 'tiktok') {
m.reply(wait)
let res = await fetch("https://api.dhamzxploit.my.id/api/tiktod/?url="+args[0])
let json = await res.json()
conn.sendFile(m.chat, json.result.nowatermark, 'error.mp4', wm, m)}
}
handler.help = ['tiktok' , 'tiktokaudio'].map(v => v + ' <link>')
handler.tags = ['downloader']
handler.command = ['tiktok', 'tiktokaudio']
handler.limit = true
export default handler
