let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
   response = args.join(' ')
  if (!args) throw 'Masukkan Parameter'
  m.reply('Sedang Diproses...')
  let res = `https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture`
  conn.sendFile(m.chat, `${les.data.url}`, '',
}
handler.help = ['wpmobile'].map(v => v + ' ')
handler.tags = ['image']

handler.command = /^(wpmobile)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = true

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true

module.exports = handler

