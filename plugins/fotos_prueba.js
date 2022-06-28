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
"https://i.pinimg.com/originals/2c/80/53/2c80538ba1cac99379dd70ef304f81d7.jpg",
]
