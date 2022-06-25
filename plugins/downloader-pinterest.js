const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fs = require('fs')
let fetch = require('node-fetch') 
let xfar = require('xfarr-api')

let handler = async (m, { usedPrefix, command, conn, args }) => {
	 	  if (!args[0]) throw `Gunakan format: ${usedPrefix}${command} naruto`
//xfar.Pinterest(args[0]).then(async data => {
//let pincpt = `🔗Link media : ${data.url}`
//conn.sendFile(m.chat,data.url, 'pin.jpg', pincpt,m)})
//conn.sendButtonImg(m.chat, gggd, mcng, wm2, 'Inventory', '.inv', m)
	 //m.reply(conn.sendBut(m.chat, global.wait, `${wm}`, `✨ 𝗠𝗘𝗡𝗨`, '.menu', fkontak,  m ))
> const buttons = [
  {buttonId: 'MENU', buttonText: {displayText: '.menu'}, type: 1},
   {buttonId: 'MENU2', buttonText: {displayText: '.menu'}, type: 1},
    {buttonId: 'MENU3', buttonText: {displayText: '.menu'}, type: 1},
     {buttonId: 'MENU4', buttonText: {displayText: '.menu'}, type: 1},
]
xfar.Pinterest(args[0]).then(async data => {
let pincpt = `🔗Link media : ${data.url}`
const buttonMessage = {
    text: pincpt,
    footer: wm,
    buttons: buttons,
    headerType: 1
}

const sendMsg = await conn.sendMessage(m.chat, buttonMessage)
	})
}
	
	
/*let message = await prepareWAMessageMedia({ image: fs.readFileSync(data)}, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           imageMessage: message.imageMessage,
           hydratedContentText: pincpt,
           hydratedFooterText: `${wm}`, 
           hydratedButtons: [{
             urlButton: {
               displayText: 'Enlace',
               url: `${data.url}`
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
   await conn.relayMessage(m.chat, template.message, { messageId: template.key.id })  */
   

handler.help = ['pinterest <keyword>']
handler.tags = ['internet', 'downloader']
handler.command = /^(pinterest)$/i

module.exports = handler
