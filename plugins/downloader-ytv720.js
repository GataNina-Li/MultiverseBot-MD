//let xfar = require('xfarr-api')
let fs = require('fs')
let fetch = require('node-fetch')
let handler = async (m, { conn, command, text }) => {
    if (!text) throw 'Masukkan Link\n\nContoh: .ytv720 https://youtube.com/xxxxxx'
  //let res = await dzx.Youtube(text)
conn.reply(m.chat, `Procesando...`, m)
let res = await fetch("https://api.dhamzxploit.my.id/api/ytplaymp3?text="+text)
//https://api.dhamzxploit.my.id/api/ytplaymp3?text=to%20the%20Bone%20lofi
let json = await res.json()
conn.sendFile(m.chat, res.json(), 'error.mp3', null, m, false, { mimetype: 'audio/mp4' })}
}
handler.help = ['ytv720 <url>']
handler.tags = ['internet']
handler.command = /^ytv720$/i

module.exports = handler
