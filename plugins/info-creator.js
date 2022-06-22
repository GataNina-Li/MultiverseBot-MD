const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let fs = require('fs')
let handler = async(m, { conn }) => {
conn.sendContact(m.chat, numberowner, nameowner, m)

	//let pp = 'https://c.tenor.com/XOJyPTMOUT8AAAAd/cosmos-universo.mp4'
let text = `Ejemplo`
  let message = await prepareWAMessageMedia({ video: fs.readFileSync('.media/menu/menuv2.mp4'), gifPlayback: true }, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           videoMessage: message.videoMessage,
           hydratedContentText: text,
           hydratedFooterText: wm,
           hydratedButtons: [{
             urlButton: {
               displayText: '𝙂𝙞𝙩𝙃𝙪𝙗',
               url: "https://github.com/GataNina-Li/MultiverseBot-MD"
              }   
            },
              {
              urlButton: {
               displayText: '𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢',
               url: instagram	           
             }
           },
			     {
             quickReplyButton: {
               displayText: 'Velocidad',
               id: '.ping',
             }
	   },
             {
             quickReplyButton: {
               displayText: 'Menu completo',
               id: '.allmenu',
             }
	   },
             {
             quickReplyButton: {
               displayText: 'Menu',
               id: '.menu',
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
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(owner|creator)$/i

module.exports = handler
