// SI VAS A MODIFICAR AL MENOS NO QUITES LOS CREDITOS, WEB, ENLACES, DE ESA FORMA YA ESTAS APOYANDO 
// PARA QUE SE PUEDA SEGUIR ELABORANDO EN ESTE LINDO MULTIVERSEBOT-MD 
// TAMBIEN PUEDES AGREGAR TÚ INFORMACIÓN SIN ESTAR ELIMINANDO LOS CREDITOS 
// EN CASO DE PODER COMPARTIR ESTE REPOSITORIO SE TE AGREDECE, Y GRACIAS POR INTERESARTE EN MULTIVERSEBOT-MD!! 

let handler = async(m, { conn, text, usedPrefix, command }) => {
  
    if (!text) throw `${mg}*Escriba un reporte.*\n*Ejemplo:*\n*${usedPrefix + command}* El comando *${usedPrefix}anime* no funciona.\n\n*Write a report.*\n*Example*\n*${usedPrefix + command}* The command *${usedPrefix}owner* it does not work.`
    if (text.length > 1500) throw `${fg}*El reporte mínimo es de 1500 caracteres!*\n*The minimum report must be 1500 characters!*`
    const laporan = `╭━━〔 *REPORTE | REPORT* 〕━━⬣\n┃\n┃✿ *Número | Number*\n┃⇢ *Wa.me/${m.sender.split`@`[0]}*\n┃\n┃✿ *Mensaje | Text*\n┃⇢ *${text}*\n┃\n╰━━━〔 *${wm}* 〕━━━⬣`
  for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid && v != '51993042301@s.whatsapp.net'))
    m.reply(laporan, jid)
    //m.reply(laporan, m.sender) // Mwehehehehe
    //m.reply('╰⊱💚⊱ *𝙀́𝙓𝙄𝙏𝙊 | 𝙎𝙐𝘾𝘾𝙀𝙎𝙎* ⊱💚⊱╮\n\n✔️!')
  m.reply(conn.sendBut(m.chat, `${eg}*El reporte ha sido enviado a Los Autores Correspondientes de mí Desarrollo. Tendrá una respuesta pronto. De ser Falso será Ignorado el reporte.*\n\n*The report has been sent to The Corresponding Authors of my Development. You will have an answer soon. If false, the report will be ignored.*`, wm , `✨ 𝗠𝗘𝗡𝗨`, '.menu',  m))
}
handler.help = ['reporte | bug'].map(v => v + ' *comando con error*')
handler.tags = ['info']
handler.command = /^(bug|report|reports|bugs|request|requests|reportar|reporte|reportes|buggata|gatabug|reportes|informe|informes)$/i 
//handler.exp = 7
module.exports = handler

// MultiverseBot-MD
