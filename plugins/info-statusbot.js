/**
POR FAVOR TENGAN LA AMABILIDAD Y BONDAD DE NO CAMBIAR MÍNIMAMENTE LOS CRÉDITOS DE MULTIVERSEBOT-MD, 
SI VAS A AÑADIR TUS DATOS O CRÉDITOS, ESTA BIEN. PERO NO QUITEN LOS QUE YA ESTAN DE MULTIVERSEBOT-MD, GRACIAS 
**/

/** PLEASE BE KIND AND KINDNESS NOT TO MINIMALLY CHANGE MULTIVERSEBOT-MD CREDITS, 
IF YOU ARE GOING TO ADD YOUR DATA OR CREDITS, IT'S OK. BUT DO NOT REMOVE THOSE THAT ARE ALREADY FROM MULTIVERSEBOT-MD, THANK YOU **/

const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let fs = require('fs')
let handler = async (m, { command }) => {
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)

let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let name = conn.getName(m.sender)
    
//bear = "Source Code"
//let ye = `Wa.me/${m.sender.split`@`[0]}`
let esce = 
`*╭≛≛≛≛≛≛ ⚕ 𝗘𝗦𝗧𝗔𝗖𝗜𝗢𝗡 ⚕ ≛≛≛≛≛≛⬣*
 ⎸💗 *Hola!!* ${name} 
 ⎸┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 ⎸ *⍟ Versión Multiverse*
 ⎸ 🜚 *_${vs}_*
 ⎸┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 ⎸ ⚶ *Orbita Durante* 
 ⎸ 🜚 *_${uptime}_*
 ⎸┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 ⎸ ⚶ *Acción Cósmica* 
 ⎸ 🜚 *${global.opts['self'] ? '_𝗢𝗿𝗯𝗶𝘁𝗮 𝗣𝗿𝗶𝘃𝗮𝗱𝗮_' : '_𝗢𝗿𝗯𝗶𝘁𝗮 𝗣𝘂𝗯𝗹𝗶𝗰𝗮_'}*
 ⎸┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 ⎸ ⚶ *Usuario(s)* 
 ⎸ 🜚 *_${Object.keys(global.db.data.users).length}_* 
 ⎸┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 ⎸ ⚶ *Chat(s) Prohibido(s)*
 ⎸ 🜚 *_${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}_* 
 ⎸┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 ⎸ ⚶ *Usuario(s) Prohibido(s)*
 ⎸ 🜚 *_${Object.entries(global.db.data.users).filter(user => user[1].banned).length}_* 
*╰𝄗𝄗✦ 𝗘𝗦𝗧𝗢𝗬 𝗘𝗡 𝗢𝗥𝗕𝗜𝗧𝗔 ✦𝄗𝄗⬣*`/*const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: esce,
           locationMessage: { 
           jpegThumbnail: await (await fetch(fla + bear)).buffer() },            
           hydratedFooterText: gt,
           hydratedButtons: [{*/
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
               id: '.sc',
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

handler.help = ['estacion | orbita']
handler.tags = ['info']
handler.command = /^órbita|orbita|orvita|estación|estacion|estacion|estado|status|estate|state|stado|stats|botstat(us)?$/i
handler.exp = 4 

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
	
    }
