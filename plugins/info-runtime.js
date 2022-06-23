let handler = async (m, { conn }) => {
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)

//m.reply(`
//┌─〔 R U N T I M E 〕
//├ Bot  ${uptime}
//└────`)
    
m.reply(conn.sendBut(m.chat, 
 `*╭𝄗𝄗✦ 𝙏𝙄𝙀𝙈𝙋𝙊 | 𝙍𝙐𝙉𝙏𝙄𝙈𝙀 ✦𝄗𝄗⬣*
 ⎸ *⍟ Versión MultiverseBot-MD*
 ⎸ ❉ ➺ ${vs}
 ⎸ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 ⎸ ❉ *Activa durante:*    *_${uptime}_*
 ⎸ ❉ *Active during:*      *_${uptime}_*
*╰𝄗𝄗𝄗𝄗𝄗𝄗𝄗𝄗⬣*`, wm, `𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟 ⚡`, '.menu',  m))
}
handler.help = ['ejecucion | runtime']
handler.tags = ['info']
handler.command = /^(uptime|runtime|ejecucion|ejecución|ejecucción|ejecuccion|ejecusion|runtimes|uptimes)$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
