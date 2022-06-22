let handler = async (m, { usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) conn.sendBut(m.chat, `_*No hay ausencias en este grupo.!*_\n\n*${usedPrefix}mulaiabsen* - empezar ausente`, wm, 'Empezar ausente', '.mulaiabsen', m)
    delete conn.absen[id]
    m.reply(`Done!`)
}
handler.help = ['hapusabsen']
handler.tags = ['absen']
handler.command = /^(delete|hapus)absen$/i
handler.group = true
handler.admin = true
module.exports = handler
