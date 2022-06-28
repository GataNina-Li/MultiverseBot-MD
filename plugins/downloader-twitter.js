const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fs = require('fs')
let fetch = require('node-fetch') 
const { twitter } = require('../lib/scrape')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `*Ingrese un enlace válido de Twitter para Obtener el Vídeo o GIF*\n\n*EJEMPLO*\n*${usedPrefix + command}* https://twitter.com/NetflixES/status/1541474691260354560?t=GVOvltFf9qCikmDOwW5lJw&s=19`
  if (!args[0].match(/(https:\/\/.*twitter.com)/gi)) throw `*Debe de ser un enlace válido de Twitter*\n\n*EJEMPLO*\n*${usedPrefix + command}* https://twitter.com/NetflixES/status/1541474691260354560?t=GVOvltFf9qCikmDOwW5lJw&s=19`

  twitter(args[0]).then(async res => {
    let twit = JSON.stringify(res)
    let json = JSON.parse(twit)
    let pesan = json.data.map((v) => `🌟 *Enlace:* ${v.url}`).join('\n*———————————————————*\n')
   // m.reply(pesan)
    let message = await prepareWAMessageMedia({ image: fs.readFileSync('./src/twitter.png')}, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           imageMessage: message.imageMessage,
           hydratedContentText: pesan,
           hydratedFooterText: `ᴜꜱᴇ ᴇꜱᴛᴏꜱ ᴇɴʟᴀᴄᴇꜱ ᴘᴀʀᴀ ᴍᴏᴅɪꜰɪᴄᴀʀ ʟᴀ ᴄᴀʟɪᴅᴀᴅ\n${wm}`, 
           hydratedButtons: [{
             urlButton: {
               displayText: '𝗚𝗜𝗧𝗛𝗨𝗕',
               url: "https://github.com/GataNina-Li/MultiverseBot-MD"
              }   
            },
              {
              urlButton: {
               displayText: '𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠',
               url: instagram	           
             }
           },
             {
             quickReplyButton: {
		     displayText: '𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 ⚡',
               id: '.menu',
             }
	   },
             {
             quickReplyButton: {
               displayText: '𝗠𝗘𝗡𝗨 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗢 💫',
               id: '.? all',
             }
          }]
        }
      }
    }), { userJid: m.sender, quoted: m });
    //conn.reply(m.chat, text.trim(), m)
    conn.relayMessage(m.chat, template.message, { messageId: template.key.id })
    
    for (let { url } of json.data)
      conn.sendFile(m.chat, url, 'ig' + (/mp4/i.test(url) ? '.mp4' : '.jpg'), watermark, m, false, { thumbnail: Buffer.alloc(0) })
  })

}
handler.help = ['twittervid | twvid'].map(v => v + ' *enlace*')
handler.tags = ['downloader']
handler.command = /^twittervid|twittervideo|twittergif|twvid$/i
handler.limit = true
module.exports = handler
