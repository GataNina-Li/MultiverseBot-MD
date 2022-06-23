/*
 * ngelarang lu biar g diubah kyknya emg susah ya anjg
 * jadi kalau lu g bsa ngehargain orang
 * setidaknya buat sc ori by gw, trs buat sc lu hasil copas tuh
 * better bgtu dripada nma gw dihapus smua
 * najis 👎🗿
*/
const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let fs = require('fs')
let handler = async (m, { conn }) => {
let ye = `@${m.sender.split`@`[0]}`
let esce = `
Hola!! ${ye} Aquí Te dejo Loa Desarroladores
y más Información de MultiverseBot-MD

*REPOSITORIO*
⮊ https://github.com/GataNina-Li/MultiverseBot-MD

*DESARROLLADORES* 
⮊ https://github.com/GataNina-Li
⮊ https://github.com/Abiguelreyes75
⮊ https://github.com/Sofianayeli
⮊ https://github.com/ADOLFO-BOT5

*ASISTENCIA*
⮊ https://www.instagram.com/gata_dios
*Para Dudas, Sugerencias, Preguntas,*
*Informate de las Novedades*

*AGRADECIMIENTO A:*
⮊ https://github.com/Hyzerr
⮊ https://github.com/ilmanhdyt
⮊ https://github.com/Nurutomo
⮊ https://github.com/ariffb25
⮊ https://github.com/Paquito1923


*COMANDOS DE INSTALACIÓN*
*Escribir uno por uno:* 
⮊ termux-setup-storage
⮊ pkg update && pkg upgrade
⮊ pkg install git -y
⮊ pkg install nodejs -y
⮊ pkg install ffmpeg -y
⮊ pkg install imagemagick -y
⮊ pkg install yarn
⮊ git clone https://github.com/GataNina-Li/MultiverseBot-MD
⮊ cd MultiverseBot-MD
⮊ yarn
⮊ node .`

let message = await prepareWAMessageMedia({ video: fs.readFileSync('./media/menu/menuv3.mp4'), gifPlayback: true }, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           videoMessage: message.videoMessage,
           hydratedContentText: esce,
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
               displayText: '𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 ⚡',
               id: '.menu',
             }
	   },
             {
             quickReplyButton: {
               displayText: '𝗠𝗘𝗡𝗨 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗢 💫',
               id: '.? all',
             }
	   },
             {
             quickReplyButton: {
               displayText: '𝗗𝗘𝗦𝗔𝗥𝗥𝗢𝗟𝗟𝗔𝗗𝗢𝗥𝗘𝗦  🛃',
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
//conn.sendBut(m.chat, esce, wm3, 'Thanks', 'thanks', m) 
  
handler.help = ['sc', 'sourcecode']
handler.tags = ['info']
handler.command = /^(sc|sourcecode)$/i

module.exports = handler
