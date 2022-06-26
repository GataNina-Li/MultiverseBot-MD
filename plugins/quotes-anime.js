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
module.exports = handler
