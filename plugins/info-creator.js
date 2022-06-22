const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let fs = require('fs')
let handler = async(m, { conn }) => {
conn.sendContact(m.chat, numberowner, nameowner, m)

	//let pp = 'https://c.tenor.com/XOJyPTMOUT8AAAAd/cosmos-universo.mp4'
let text = `*Hola! Esos son los Contactos disponibles* 🌟\n*El Bot no responde a dudas para ello consulte con la ✅ Cuenta Oficial de Instagram - Asistencia, Gracias!*`
  let message = await prepareWAMessageMedia({ video: fs.readFileSync('./media/menu/menuv2.mp4'), gifPlayback: true }, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           videoMessage: message.videoMessage,
           hydratedContentText: text,
           hydratedFooterText: wm,
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
               displayText: '𝗩𝗘𝗟𝗢𝗖𝗜𝗗𝗔𝗗',
               id: '.ping',
             }
	   },
             {
             quickReplyButton: {
               displayText: '𝗠𝗘𝗡𝗨 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗢',
               id: '.allmenu',
             }
	   },
             {
             quickReplyButton: {
               displayText: '𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟',
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
handler.help = ['creador | owner']
handler.tags = ['info']
handler.command = /^(contacto|owner|creator|propietario|dueño|dueña|propietaria|dueño|creadora|creador)$/i

module.exports = handler
