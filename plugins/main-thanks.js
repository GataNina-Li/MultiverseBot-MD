
let handler = async (m, { conn, text, usedPrefix, command }) => {

conn.sendImageAsSticker(m.chat, pickRandom(stikerhuuu), m, { packname: "sticker by", author: "Erika" })
}

handler.customPrefix = /^(gracias)$/
handler.command = new RegExp

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
let stikerhuuu = [
 "https://telegra.ph/file/06a27a93b66f63a5a067e.jpg",//patrick huu

]
