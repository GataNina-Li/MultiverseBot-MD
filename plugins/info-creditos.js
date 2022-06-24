// SI VAS A MODIFICAR AL MENOS NO QUITES LOS CREDITOS, WEB, ENLACES, DE ESA FORMA YA ESTAS APOYANDO 
// PARA QUE SE PUEDA SEGUIR ELABORANDO EN ESTE LINDO MULTIVERSEBOT-MD 
// TAMBIEN PUEDES AGREGAR TÚ INFORMACIÓN SIN ESTAR ELIMINANDO LOS CREDITOS 
// EN CASO DE PODER COMPARTIR ESTE REPOSITORIO SE TE AGREDECE, Y GRACIAS POR INTERESARTE EN MULTIVERSEBOT-MD!! 

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
handler.command = /^(creadores|creators|creditos|credito)$/i

module.exports = handler 

// MultiverseBot-MD
