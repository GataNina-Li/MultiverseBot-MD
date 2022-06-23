async function handler(m, { command, usedPrefix, isOwner }) {
    if (!global.db.data.settings[this.user.jid].anon) return await this.sendBut(m.chat, isOwner ? 'Activar' : 'Anonymous Chat dimatikan', wm2, isOwner ? 'Activar' : 'Owner', isOwner ? '.on anonimo' : '.owner', m)
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) return await this.sendBut(m.chat, 'No estás en el chat anónimo', wm2, 'Buscar socio', `${usedPrefix}start`, m)
            m.reply('Ok')
            let other = room.other(m.sender)
            if (other) await this.sendBut(other, 'Los socios abandonan el chat', wm2, 'Buscar socio', `${usedPrefix}start`, m)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) return await this.sendBut(m.chat, 'Todavía estás en el chat anónimo, Espere socio', wm2, 'Salir', `${usedPrefix}leave`, m)
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendBut(room.a, 'Socios encontrados!', wm2, 'Next', `${usedPrefix}next`, m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendBut(room.b, 'Socios encontrados!', wm2, 'Next', `${usedPrefix}next`, m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendBut(m.chat, 'esperando pareja...', wm2, 'Salir', `${usedPrefix}leave`, m)
            }
            break
        }
    }
}
handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']

handler.private = true

module.exports = handler
