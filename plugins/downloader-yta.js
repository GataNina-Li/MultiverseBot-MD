let axios = require('axios')
const fetch = require('node-fetch')
let limit = 1024354
const { servers, yta } = require('../lib/y2mate')
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
  if (!args || !args[0]) throw `${mg}*Ingrese un enlace válido de YouTube para descargar el Audio*\n\n*EJEMPLO*\n*${usedPrefix + command}* https://www.youtube.com/watch?v=c5gJRzCi0f0&t=265s`
  let chat = global.db.data.chats[m.chat]
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb, title, filesize, filesizeF} = await yta(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize 
  
 if (!isLimit) m.reply(conn.sendBut(m.chat, 
`*╭𝄗𝄗𝄗✦ *AUDIO* ✦𝄗𝄗𝄗⬣*
 ⎸ *YOUTUBE MP3*
 ⎸ *𝑴𝒖𝒍𝒕𝒊𝒗𝒆𝒓𝒔𝒆𝑩𝒐𝒕-𝑴𝑫*
 ⎸┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 ⎸🎧 *Título:* ${title}
 ⎸🎧 *Tipo:* MP3
 ⎸🎧 *Peso:* ${filesizeF}
*╰𝄗𝄗✦ ⍟ ${vs} ✦𝄗𝄗⬣*`, `${wm}`, `✨ 𝗠𝗘𝗡𝗨`, '.menu', fkontak,  m ))
  if (!isLimit) conn.sendFile(m.chat, dl_link, title + '.mp3', ``.trim(), m, null, { asDocument: chat.useDocument })
}
handler.help = ['yta | ytmp3 *enlace*']
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i

handler.fail = null
handler.exp = 2
handler.limit = true

module.exports = handler

