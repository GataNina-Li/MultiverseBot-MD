const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
const { servers, yta, ytv } = require('../lib/y2mate')
let fs = require('fs')
let yts = require('yt-search')
let fetch = require('node-fetch')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `${mg}*Escriba el nombre o título para obtener el Audio o Vídeo*\n\n*EJEMPLO*\n*${usedPrefix + command}* Runaway`
  let chat = global.db.data.chats[m.chat]
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 3600)
  if (!vid) throw '*No se ha encontrado, vuelva a intentar*'
  let isVideo = /2$/.test(command)
  let yt = false
  let yt2 = false
  let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await yta(vid.url, server)
      yt2 = await ytv(vid.url, server)
      usedServer = server
      break
    } catch (e) {
      m.reply(`${fg}*Servidor ${server} con error!*${servers.length >= i + 1 ? '' : '\n*intente mas tarde...*'}`)
    }
  }
  if (yt === false) throw `${fg}*Los Servidores Fallaron*`
  if (yt2 === false) throw `${fg}*Los Servidores Fallaron*`
  let { dl_link, thumb, title, filesize, filesizeF } = yt
let anu =  `*╭𝄗𝄗𝄗✦ PLAY ✦𝄗𝄗𝄗⬣*
 ⎸ *Título:* ${title}
 ⎸ *Tamaño de Audio:* ${filesizeF}
 ⎸ *Tamaño de Video:* ${yt2.filesizeF}
 ⎸ *Servidor:* ${usedServer}
 ⎸ *Enlace:* ${vid.url}
*╰𝄗𝄗✦ ⍟ ${vs} ✦𝄗𝄗⬣*`
     let message = await prepareWAMessageMedia({ image: await (await require('node-fetch')(thumb)).buffer()}, { upload: conn.waUploadToServer }) 
      const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
      templateMessage: {
          hydratedTemplate: {
            imageMessage: message.imageMessage, 
            hydratedContentText: anu,
            hydratedFooterText: wm, 
            hydratedButtons: [{
             urlButton: {
               displayText: 'Join Here',
               url: gc
             }
              },
             {
             urlButton: {
               displayText: 'Group Bot', 
               url: gc
             }
           },
               {
             quickReplyButton: {
               displayText: 'Video 360p',
               id: `.ytmp4 ${vid.url}`,
             }
            },
               {
             quickReplyButton: {
               displayText: 'Video 720p',
               id: `.ytv720 ${vid.url}`,
             }

            },
               {
             quickReplyButton: {
               displayText: 'Audio',
               id: `.ytmp3 ${vid.url}`,
             }

           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
    //conn.reply(m.chat, text.trim(), m)
    return await conn.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
}
handler.help = ['play'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^(p|play)$/i

handler.exp = 0

module.exports = handler 
