let handler = async (m, { conn, chatId }) => {
	
	
	/*const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}*/
	
/*let dd = `Hola`	
const ftroli = {
    key : {
    remoteJid: 'status@broadcast',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 2022,
    status: 1,
    surface : 1,
    message: dd, 
    orderTitle: `▮Menu ▸`,
    thumbnail: 'https://telegra.ph/file/5ecbec3e82e247671a18e.jpg',  //Gambarnye
    sellerJid: '0@s.whatsapp.net' 
    }
    }
    }*/


/*const fdoc = {
   key : {
   remoteJid: 'status@broadcast',
   participant : '0@s.whatsapp.net'
   },
   message: {
   documentMessage: {
   title: wm, 
   }
   }
   }*/
	
	
	
/*const ftroli = {
    key : {
    remoteJid: '6283136505591-1614953337@g.us',
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
    }*/
	//conn.reply(m.chat, `price1`, fkontak)

//m.reply = async (text, chatId, options) => {
    {	
	    let text = 'Hola'
	let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg')
        let { data } = await conn.getFile(await(await require('node-fetch')(pp)).buffer())
        conn.reply(chatId ? chatId : m.chat, text, m, { contextInfo: { mentionedJid: conn.parseMention(text), externalAdReply: { title: 'Super Bot Whatsapp', body: wm, sourceUrl: 'https://youtube.com/channel/UCpNU4eY7eiI0ve05CssjdbA', thumbnail: data }}, options })
    }
    m.name = m.pushName || conn.getName(m.sender)
   // if (m.msg && m.msg.url) m.download = () => conn.downloadM(m.msg, m.mtype.toLowerCase().replace(/message/i, ''))
	
}

handler.help = ['sewa', 'sewabot']
handler.tags = ['info']
handler.command = /^(sewa|sewabot)?$/i

module.exports = handler
