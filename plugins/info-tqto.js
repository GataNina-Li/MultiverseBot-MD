/**
* jangan ganti ya kakak kakak sekalian
* ini cuma buat ninggalin credit gw doang :)
* jangan dihilangin, boleh di tambahin 🐦
**/

let handler = async (m, { conn }) => {
bear = "Source Code"
let esce = `Ejemplo`
conn.sendButtonImg(m.chat, fla + 'CREADORES', esce, wm, 'Menu', '.menu', m) 
}
handler.help = ['creadores | creators']
handler.tags = ['info']
handler.command = /^(creadores|creators)$/i

module.exports = handler
