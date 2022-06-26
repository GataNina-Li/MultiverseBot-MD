et handler = async (m, { conn }) => {
let api-hyzer = 'https://meme-api.herokuapp.com/gimme/sticker'
    conn.sendButtonImg(m.chat, api-hyzer, 'Nih', wm2, 'NEXT', '.random', m)
}
handler.help = ['random']
handler.tags = ['imagen']
handler.command = /^(random)$/i

module.exports = handler
