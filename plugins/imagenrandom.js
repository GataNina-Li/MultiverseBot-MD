const axios = require('axios')
 let handler = async(m, { conn }) => {
let les = await axios.get('https://meme-api.herokuapp.com/gimme/sticker')${command}'
            conn.sendFile(m.chat, `${les.data.url}`, '', `${les.data.title} 
            conn.sendButtonImg(m.chat, nyenye, 'Nih', wm2, 'Next', `.${command}`, m) 
  🌌𝑴𝒖𝒍𝒕𝒊𝒗𝒆𝒓𝒔𝒆𝑩𝒐𝒕-𝑴𝑫🌌`, m) 
  }
handler.help = ['imagenrandom']
handler.tags = ['images']
handler.command = /^(imagenrandom|random|epico)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = false

module.exports = handler
