/*let handler = async (m, { usedPrefix, text }) => {
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) {
        throw `_*Aun hay ausencias en este chat!*_\n\n*${usedPrefix}hapusabsen* - borrar ausente`
    }
    conn.absen[id] = [
        conn.sendBut(m.chat, `Comenzó con éxito ausente!\n\n*${usedPrefix}Llamada de rol* - estar ausente\n*${usedPrefix}cekabsen* - para comprobar la asistencia\n*${usedPrefix}hapusabsen* - para borrar los datos de asistencia`, wm, 'Llamada de rol', '.Llamada de rol', m),
        [],
        text
    ]
}
handler.help = ['mulaiabsen [teks]']
handler.tags = ['absen']
handler.command = /^(start|mulai)absen$/i
handler.group = true
handler.admin = true
module.exports = handler*/
