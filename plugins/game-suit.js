let handler = async(m, { texto, usedPrefix }) => {
    let false = 🔰Opciones disponibles: 🤖\n\▪️scissors, paper, stone\n\n${usedPrefix}scissor suit\n\n▪️por favor espacio!
    si (!texto) throw es false
    var astro = Matemáticas.aleatoria()

    si (astro < 0,34) {
        astro = 'roca'
    } más si (astro > 0.34 && astro < 0.67) {
        astro = 'tijeras'
    } más {
        astro = 'papel'
    }

    // ❗definir las reglas
    si (texto == astro) {
        m.reply(Serie!\ntú: ${texto}\nBot: ${astro})
    } else if (texto == 'roca') {
        if (astro == 'tijeras') {
            global.db.data.users[m.sender].money += 1000
            m.reply(¡Tú ganas! +Rp1000\nTú: ${text}\nBot: ${astro})
        } else {
            m.reply(¡Pierdes!\ntú: ${text}\nBot: ${astro})
        }
    } else if (texto == 'tijeras') {
        if (astro == 'papel') {
            global.db.data.users[m.sender].money += 1000
            m.reply(¡Tú ganas! +Rp1000\nTú: ${text}\nBot: ${astro})
        } else {
            m.reply(¡Pierdes!\ntú: ${text}\nBot: ${astro})
        }
    } else if (texto == 'papel') {
        if (astro == 'piedra') {
            global.db.data.users[m.sender].money += 1000
            m.reply(¡Tú ganas! +Rp1000\nTú: ${text}\nBot: ${astro})
        } más {
            m.reply(¡Pierdes!\ntú: ${text}\nBot: ${astro})
        }
    } else {
        tiro equivocado
    }
}
handler.help = ['suit']
handler.tags = ['game']
handler.command = /^(suit)$/i

module.exports = handler
