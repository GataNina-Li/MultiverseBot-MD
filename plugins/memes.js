let fs = require('fs')
let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, command }) => {  
await conn.sendButtonImg(m.chat, pickRandom(asupan), '🌌🌌🌌🌌', '𝑴𝒖𝒍𝒕𝒊𝒗𝒆𝒓𝒔𝒆𝑩𝒐𝒕-𝑴𝑫', 'SIGUIENTE MEME GALACTICO 🔄🌌', `${usedPrefix + command}`, m, false)
}
handler.command = /^(momaso|momaso)$/i
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const asupan = [
"https://i.pinimg.com/236x/9b/73/9e/9b739eca723bd817ad0a9d732555ebdb.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRECVxb-DhVxByWynyoA9Eitozj8vWTYhnBoxXKwDMKsosv0GKfw1_XG3haYVoGrHT3CsE&usqp=CAU",
"https://i.pinimg.com/736x/6f/e8/b8/6fe8b8a9f603b889b59fa5c58fc0dde1.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoyKFwvl_OreufYQCazGDyVECdJtbYELhaqcVVuUFYCVWRfJ9fInYrwJIaAYjtGHjoVy0&usqp=CAU",
"https://i.ytimg.com/vi/2aU89ku_FIk/maxresdefault.jpg"
]
