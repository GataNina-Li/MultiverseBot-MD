const axios require('axios'); 
let handler = async(m, { conn, usedPrefix, command }) => {
let res = await axios("https://meme-api.herokuapp.com/gimme/sticker")
let json = res.data
let url = json.url
conn.sendButton(m.chat, "*sticker*", author, url, [['⚽ SIGUIENTE ⚽', `${usedPrefix + command}`]], m)}
handler.help = ['imagenrandom']
handler.tags = ['imagen']
handler.command = /^(imagenrandom)$/i
module.exports = handler
