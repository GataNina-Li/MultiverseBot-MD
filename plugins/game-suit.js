let handler = async (m, { text, usedPrefix }) => {
    let salah = `Opciones Disponibles\n\ntijeras, papel, roca\n\n${usedPrefix}armar traje\n\n¡Me encanta el espacio!`
    if (!text) throw salah
    var astro = Math.random()

    if (astro < 0.34) {
        astro = 'piedra'
    } else if (astro > 0.34 && astro < 0.67) {
        astro = 'tijeras'
    } else {
        astro = 'papel'
    }

    //menentukan rules
    if (text == astro) {
        m.reply(`Serie!\ntú: ${text}\nBot: ${astro}`)
    } else if (text == 'piedra') {
        if (astro == 'tijeras') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`¡Tú ganas! +Rp1000\ntú: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`¡Tú pierdes!\ntú: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'tijeras') {
        if (astro == 'papel') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`¡Tú ganas! +Rp1000\ntú: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`¡Tú pierdes!\ntú: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'papel') {
        if (astro == 'piedra') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`¡Tú ganas! +Rp1000\ntú: ${text}\nBot: ${astro}`)
        } else {
            m.reply(`¡Tú pierdes!\ntú: ${text}\nBot: ${astro}`)
        }
    } else {
        throw salah
    }
}
handler.help = ['suit']
handler.tags = ['game']
handler.command = /^(suit)$/i

module.exports = handler

