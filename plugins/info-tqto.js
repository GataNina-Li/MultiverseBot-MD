/**
* jangan ganti ya kakak kakak sekalian
* ini cuma buat ninggalin credit gw doang :)
* jangan dihilangin, boleh di tambahin 🐦
**/

let handler = async (m, { conn }) => {
bear = "Source Code"
let esce = `*DESARROLLADORES* 
⍟ https://github.com/GataNina-Li
⍟ https://github.com/Abiguelreyes75
⍟ https://github.com/Sofianayeli
⍟ https://github.com/ADOLFO-BOT5

*ASISTENCIA*
⍟ https://www.instagram.com/gata_dios
*Para Dudas, Sugerencias, Preguntas,*
*Informate de las Novedades*

*AGRADECIMIENTO A:*
⍟ https://github.com/Hyzerr
⍟ https://github.com/ilmanhdyt
⍟ https://github.com/Nurutomo
⍟ https://github.com/ariffb25
⍟ https://github.com/Paquito1923`
conn.sendButtonImg(m.chat, fla + 'CREADORES', esce, wm, '𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 ⚡', '.menu', m) 
}
handler.help = ['creadores | creators']
handler.tags = ['info']
handler.command = /^(creadores|creators)$/i

module.exports = handler
