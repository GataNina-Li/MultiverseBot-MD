let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  if (!text) throw `Introduce una consulta!`
  let res = await fetch(global.API('https://api.jikan.moe', '/v3/search/anime', { q: text }))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let { title, members, synopsis, episodes, url, rated, score, image_url, type, start_date, end_date } = json.results[0]
let animeingfo = `✨️ Título: ${title}
🎆️ Episodios: ${episodes}
➡️ Fecha de inicio: ${start_date}
🔚 Fecha final: ${end_date}
💬 Mostrar tipo: ${type}
💌️ Clasificación: ${rated}
❤️ Puntaje: ${score}
👥 Miembros: ${members}
💚️ Sinopsis: ${synopsis}
🌐️ URL: ${url}`
  conn.sendFile(m.chat, image_url, '', animeingfo, m)
}
handler.help = ['anime <judul>']
handler.tags = ['anime']
handler.command = /^(anime|animeinfo)$/i
//maapin fatur :<
module.exports = handler
