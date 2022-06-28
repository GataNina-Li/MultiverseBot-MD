//funciona bien codigo corregido by erika
let fs = require('fs')
let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, command }) => {  
await conn.sendButtonVid(m.chat, pickRandom(asupan), '🔥🔥🔥🔥', 'Gata Dios', 'SIGUIENTE 🔄🥵', `${usedPrefix + command}`, m, false)
}
handler.command = /^(pornovid|pornovideo|Pornovid|Pornovideo|Pornvid|Ponrvid|pornvid|ponrvid|pornov)$/i
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())] 
}

const asupan = [
"https://l.top4top.io/m_22572kvnt0.mp4",

]
