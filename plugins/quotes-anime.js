let axios = require("axios");
let handler = async(m, { conn, text }) => {

	axios.get(`https://videfikri.com/api/anime/randomquoteanime`).then ((res) => {
	 	let hasil = `${res.data.result.quotes}`

    conn.reply(m.chat, hasil, m)
	})
}
handler.help = ['quoteanime']
handler.tags = ['anime']
handler.command = /^(quoteanime)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = true
handler.botAdmin = false

handler.fail = null
handler.exp = 100
handler.limit = false

module.exports = handler
