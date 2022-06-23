let handler = async (m, { conn }) => {
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


 m.reply = async (text, chatId, options) => {
    	let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg')
        let { data } = await conn.getFile(await(await require('node-fetch')(pp)).buffer())
        conn.reply(chatId ? chatId : m.chat, text, m, { contextInfo: { mentionedJid: conn.parseMention(text), externalAdReply: { title: 'Super Bot Whatsapp', body: wm, sourceUrl: 'https://youtube.com/channel/UCpNU4eY7eiI0ve05CssjdbA', thumbnail: data }}, options })
    }
    m.name = m.pushName || conn.getName(m.sender)
    if (m.msg && m.msg.url) m.download = () => conn.downloadM(m.msg, m.mtype.toLowerCase().replace(/message/i, ''))
}
handler.help = ['sewa', 'sewabot']
handler.tags = ['info']
handler.command = /^(sewa|sewabot)?$/i

module.exports = handler
