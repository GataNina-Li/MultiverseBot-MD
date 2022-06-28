//let xfar = require('xfarr-api')
let fetch = require('node-fetch')
let handler = async (m, { conn, command, text }) => {
    if (!text) throw 'Masukkan Link\n\nContoh: .ytv720 https://youtube.com/xxxxxx'
  //let res = await dzx.Youtube(text)
    let dd = ("https://api.dhamzxploit.my.id/api/ytplaymp3?text=to%20the%20Bone%20lofi"+text)
m.reply('*Tunggu Sebentar...*')
conn.sendFile(m.chat, dd, '', `Youtube Downloader
720p
jika masih blur, berarti videonya emang ngeblur dari youtubenya
Atau bisa jadi faktor *MUKA*`, m)

}
handler.help = ['ytv720 <url>']
handler.tags = ['internet']
handler.command = /^ytv720$/i

module.exports = handler
