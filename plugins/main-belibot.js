//let { data } = await conn.getFile(await(await require('node-fetch')(pp)).buffer())
const fs = require('fs')
let handler = async (m, { text, chatId, options, conn }) => {
/*const ftroli = {
    key : {
    remoteJid: '51993042301@g.us',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 2022,
    status: 1,
    surface : 1,
    message: 'Get Bot', 
    orderTitle: `Hyzer`,
    thumbnail: 'https://telegra.ph/file/5ecbec3e82e247671a18e.jpg', 
    sellerJid: '0@s.whatsapp.net' 
    }
    }
    }
	conn.reply(m.chat, price1, ftroli)*/


let text = `
*ejemplo`.trim()   
conn.reply(m.chat, text, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: 'bot',
body: 'Super Bot WhatsApp',         
previewType: 1, thumbnail: fs.readFileSync("./media/menu/shiraori.jpg"),
sourceUrl: `${youtube}`}}})}  
    	
handler.help = ['sewa', 'sewabot']
handler.tags = ['info']
handler.command = /^(sewa|sewabot)?$/i

module.exports = handler
