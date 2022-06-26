//let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
let api = 'https://meme-api.herokuapp.com/gimme/sticker'
    conn.send2ButtonImg(m.chat, api, '', wm, 'NEXT', '.random', 'NEXT', '.random', m)
    //conn.sendButtonLoc(m.chat, await(await fetch(api)).buffer(), 'Nih', wm2, 'NEXT', '.random', m)
    
}
handler.help = ['random']
handler.tags = ['imagen']
handler.command = /^(random)$/i

module.exports = handler
