//let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
let api = 'https://meme-api.herokuapp.com/gimme/sticker'
//conn.sendButton(m.chat, gimme, wm, api, [['NEXT', `.random`]], m)
    conn.sendButtonImg(m.chat, api, text, wm, 'NEXT', '.random', m)
    //conn.sendButtonLoc(m.chat, await(await fetch(api)).buffer(), 'Nih', wm2, 'NEXT', '.random', m)
    
}
handler.help = ['random']
handler.tags = ['imagen']
handler.command = /^(random)$/i

module.exports = handler
