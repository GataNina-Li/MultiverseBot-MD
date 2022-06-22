let handler = async (m, { conn, isOwner }) => {
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
    
m.reply(conn.sendBut(m.chat, `╭────────────────🚫
│ *Lista de chats prohibidos*
│ *List of banned chats*
│┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
│ Total : ${chats.length} Chat${chats ? '\n' + chats.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
│ ${isOwner ? '@' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
╰────────────🚫
                          
╭────────────────🚫
│ *Lista de Usuarios Prohibidos*
│ *Banned Users List*
│┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
│ Total : ${users.length} Pengguna${users ? '\n' + users.map(([jid], i) => `
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
│ ${isOwner ? '@' + jid.split`@`[0] : jid}
`.trim()).join('\n') : ''}
╰────────────🚫`, wm, `Menu`, '.menu',  m))
    //`.trim())
   //conn.reply(m.chat, caption, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } }) separar contenido
}
handler.help = ['listaban | listban',]
handler.tags = ['info']
handler.command = /^listban(ned)?|listaban|banlista|ban(ned)?list|daftarban(ned)?$/i
handler.owner = false
module.exports = handler
