let handler = async (m, { conn, text, usedPrefix, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    conn.vote = conn.vote ? conn.vote : {}
    let id = m.chat
    if (id in conn.vote) return conn.sendBut(m.chat, 'Todavía hay votos en este chat.!', wm, 'Contento', `${usedPrefix}-vote`, m)
    conn.send2But(m.chat, `Comienza la votación!
*${usedPrefix}upvote* - llegar a un acuerdo
*${usedPrefix}devote* - en desacuerdo
*${usedPrefix}cekvote* - para comprobar el voto
*${usedPrefix}hapusvote* - para borrar votos`, wm, 'Upvote', `${usedPrefix}upvote`, 'Devote', `${usedPrefix}devote`, m)
    conn.vote[id] = [
        text,
        [],
        []
    ]
}
handler.help = ['Empezar a votar [alasan]']
handler.tags = ['vote']
handler.command = /^(start|mulai|\+)vote$/i

module.exports = handler
