const axios = require('axios')
let les = await axios.get('https://meme-api.herokuapp.com/gimme/sticker')
            conn.sendButtonImg(m.chat, les,'NEXT', '.imagenrandom', m)
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
