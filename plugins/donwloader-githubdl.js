let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fs = require('fs')
let fetch = require('node-fetch')
let handler = async (m, { args, usedPrefix, command }) => {

    if (!args[0]) throw `${mg}*Debe de Introducir un enlace válido de GitHub*\n\n*EJEMPLO*\n*${usedPrefix + command}* _https://github.com/GataNina-Li/MultiverseBot-MD_`

    if (!regex.test(args[0])) throw `${fg}*Enlace erróneo, Recuerde debe de ser un enlace de GitHub*\n\n*EJEMPLO*\n*${usedPrefix + command}* _https://github.com/GataNina-Li/MultiverseBot-MD_`

    let [, user, repo] = args[0].match(regex) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    // 'attachment; filename=Nurutomo-wabot-aq-v2.5.1-251-g836cccd.zip'
    //m.reply(`*Mohon tunggu, sedang mengirim repository..*`)
    
    let text = `${eg}*Espere un momento. Pronto Tendrá El archivo de GitHub!!*`
    let message = await prepareWAMessageMedia({ image: fs.readFileSync('./src/github.jpg')}, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           imageMessage: message.imageMessage,
           hydratedContentText: text,
           hydratedFooterText: `ᴍᴀʏᴏʀ ᴀ 250 ᴍɢ ᴛᴀʟ ᴠᴇᴢ ɴᴏ ꜱᴇ ᴇɴᴠɪᴇ\n${wm}`, 
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

    conn.sendFile(m.chat, url, filename, null, m)

}
handler.help = ['gitclone <url>']
handler.tags = ['github']
handler.command = /gitclone/i

handler.limit = true

module.exports = handler
