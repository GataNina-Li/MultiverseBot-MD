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

const xa = require('xfarr-api')
let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, args, command }) => {
    if(!args[0]) throw `Enlace?`
    m.reply(wait)
    xa.Tiktok(args[0])
    .then(async data => { 
        await conn.sendFile(m.chat, data.medias[2].url, 'tiktok.mp3', null, m)
        await conn.sendFile(m.chat, data.medias[1].url, 'tiktok.mp4', watermark, m) 
    })
}
handler.help = ['tiktok <url>']
handler.tags = ['downloader']
handler.command = /^(tiktoknowm|tiktok)$/i
handler.limit = true

module.exports = handler
