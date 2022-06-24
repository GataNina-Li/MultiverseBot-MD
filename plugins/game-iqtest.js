/*let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(global.iq)}`, m)
}
handler.help = ['iqtest']
handler.tags = ['game']
handler.command = /^(iqtest)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.iq = [
'IQ Anda Sebesar : 1',
'IQ Anda Sebesar : 14',
'IQ Anda Sebesar : 23',
'IQ Anda Sebesar : 35',
'IQ Anda Sebesar : 41',
'IQ Anda Sebesar : 50',
'IQ Anda Sebesar : 67',
'IQ Anda Sebesar : 72',
'IQ Anda Sebesar : 86',
'IQ Anda Sebesar : 99',
'IQ Anda Sebesar : 150',
'IQ Anda Sebesar : 340',
'IQ Anda Sebesar : 423',
'IQ Anda Sebesar : 500',
'IQ Anda Sebesar : 676',
'IQ Anda Sebesar : 780',
'IQ Anda Sebesar : 812',
'IQ Anda Sebesar : 945',
'IQ Anda Sebesar : 1000',
'IQ Anda Sebesar : Tidak Terbatas!',
'IQ Anda Sebesar : 5000',
'IQ Anda Sebesar : 7500',
'IQ Anda Sebesar : 10000',
]*/


let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(global.iq)}`, m)
}
handler.help = ['iqtest']
handler.tags = ['game']
handler.command = /^(iqtest)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.iq = [
'Tu coeficiente intelectual es: 1',
'Tu coeficiente intelectual es: 14',
'Tu coeficiente intelectual es: 23',
'Tu coeficiente intelectual es: 35',
'Tu coeficiente intelectual es: 41',
'Tu coeficiente intelectual es: 50',
'Tu coeficiente intelectual es: 67',
'Tu coeficiente intelectual es: 72',
'Tu coeficiente intelectual es: 86',
'Tu coeficiente intelectual es: 99',
'Tu coeficiente intelectual es: 150',
'Tu coeficiente intelectual es: 340', 
'Tu coeficiente intelectual es: 423',
'Tu coeficiente intelectual es: 500',
'Tu coeficiente intelectual es: 676',
'Tu coeficiente intelectual es: 780',
'Tu coeficiente intelectual es: 812',
'Tu coeficiente intelectual es: 945',
'Tu coeficiente intelectual es: 1000',
'Tu coeficiente intelectual es: ¡Ilimitado!',
'Tu coeficiente intelectual es: 5000',
'Tu coeficiente intelectual es: 7500',
'Tu coeficiente intelectual es: 10000',
] 
