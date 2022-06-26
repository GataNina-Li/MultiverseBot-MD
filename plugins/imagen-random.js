const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fs = require('fs')
let fetch = require('node-fetch') 
let handler = async (m, { conn, text }) => {
let api = 'https://meme-api.herokuapp.com/gimme/sticker'
//conn.sendButton(m.chat, gimme, wm, api, [['NEXT', `.random`]], m)
    //conn.sendButtonImg(m.chat, api, text, wm, 'NEXT', '.random', m)
    //conn.sendButtonLoc(m.chat, await(await fetch(api)).buffer(), 'Nih', wm2, 'NEXT', '.random', m)
let message = await prepareWAMessageMedia({ image: fs.readFileSync(api)}, { upload: conn.waUploadToServer })
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
   await conn.relayMessage(m.chat, template.message, { messageId: template.key.id }) 
    
}
handler.help = ['random']
handler.tags = ['imagen']
handler.command = /^(random)$/i

module.exports = handler
