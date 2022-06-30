let handler = async (m, { conn, text, usedPrefix, command }) => {

conn.sendImageAsSticker(m.chat, pickRandom(stikerrandom), m, { packname: "sticker by", author: "Elyas" })
}

handler.customPrefix = /^(thanks)$/i
handler.command = new RegExp

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
let stickerrandom = [
"https://i0.wp.com/eltallerdehector.com/wp-content/uploads/2022/06/fbc6e-bob-esponja-patricio-png-2.png?resize=300%2C434&ssl=1"

]


