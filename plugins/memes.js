let fs = require('fs')
let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, command }) => {  
await conn.sendButtonImg(m.chat, pickRandom(asupan), '🌌🌌🌌🌌', '𝑴𝒖𝒍𝒕𝒊𝒗𝒆𝒓𝒔𝒆𝑩𝒐𝒕-𝑴𝑫', 'SIGUIENTE MEME GALACTICO 🔄🌌', `${usedPrefix + command}`, m, false)
}
handler.command = /^(meme|MEME)$/i
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const asupan = [
"https://i.pinimg.com/originals/2c/80/53/2c80538ba1cac99379dd70ef304f81d7.jpg",
]
