let handler = async (m, { conn, text, usedPrefix, command }) => {	
let api = 'https://meme-api.herokuapp.com/gimme/sticker'
	
//let pincpt = `🔗Link media : ${data.url}`
//conn.sendButton(m.chat, gimme, wm, api, [['NEXT', `.random`]], m)
    //conn.sendButtonImg(m.chat, api, text, wm, m)
	await conn.sendButtonImg(m.chat, api, ``, wm, 'Thanks', '.thanks', m) 
    //conn.sendButtonLoc(m.chat, await(await fetch(api)).buffer(), 'Nih', wm2, 'NEXT', '.random', m)
}
handler.help = ['random']
handler.tags = ['imagen']
handler.command = /^(random)$/i

module.exports = handler
