// SI VAS A MODIFICAR AL MENOS NO QUITES LOS CREDITOS, WEB, ENLACES, DE ESA FORMA YA ESTAS APOYANDO 
// PARA QUE SE PUEDA SEGUIR ELABORANDO EN ESTE LINDO MULTIVERSEBOT-MD 
// TAMBIEN PUEDES AGREGAR TÚ INFORMACIÓN SIN ESTAR ELIMINANDO LOS CREDITOS 
// EN CASO DE PODER COMPARTIR ESTE REPOSITORIO SE TE AGREDECE, Y GRACIAS POR INTERESARTE EN MULTIVERSEBOT-MD!! 

let handler = async (m, { conn, isOwner }) => {
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
    
m.reply(conn.sendBut(m.chat, `╭────────────────⚠️
│ *Lista de chats prohibidos*
│ *List of banned chats*
│┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
│ *Total :* ${chats.length} Chat${chats ? '\n' + chats.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
│ ${isOwner ? '@' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
╰────────────⚠️
                          
╭────────────────🚫
│ *Lista de Usuarios Prohibidos*
│ *Banned Users List*
│┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
│ *Total :* ${users.length} Pengguna${users ? '\n' + users.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
│ ${isOwner ? '@' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
╰────────────🚫`, wm, `✨ 𝗠𝗘𝗡𝗨`, '.menu',  m))
    //`.trim())
   //conn.reply(m.chat, caption, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } }) separar contenido
}
handler.help = ['listaban | listban',]
handler.tags = ['info']
handler.command = /^listban(ned)?|listaban|banlista|ban(ned)?list|daftarban(ned)?$/i
handler.owner = false
module.exports = handler

// MultiverseBot-MD
