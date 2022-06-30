let handler = async (m, { conn, text, usedPrefix, command }) => {
conn.sendImageAsSticker(m.chat, pickRandom(stikerthanks), m, { packname: "sticker by", author: "Elyas" })
}  
  
handler.customPrefix = /^(thanks)$/i
handler.command = new RegExp

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.lenght * Math.rndom())]
  
}

let stickerthanks =[
'https://telegra.ph/file/20509b31b6e05ff999daa.jpg',
'https://telegra.ph/file/06a27a93b66f63a5a067e.jpg' 
]


