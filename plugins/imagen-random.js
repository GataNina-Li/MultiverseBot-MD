let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
let api = 'https://meme-api.herokuapp.com/gimme/sticker'
    //conn.sendButtonImg(m.chat, api, 'Nih', wm2, 'NEXT', '.random', m)
    conn.sendButtonLoc(m.chat, await(await fetch(api)).buffer(), 'Nih', wm2, 'NEXT', '.random', m)
    
}
handler.help = ['random']
handler.tags = ['imagen']
handler.command = /^(random)$/i

module.exports = handler
