let fs = require('fs')
let fetch = require('node-fetch')
let handler = async(m, { conn, usedPrefix, command }) => {  
await conn.sendButtonImg(m.chat, pickRandom(sagiri), '🔥🔥🔥🔥', 'Gata Dios', 'SIGUIENTE 🔄🥵', `${usedPrefix + command}`, m, false)
}
handler.command = /^(sagiri2)$/i
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const sagiri = [
"https://static.zerochan.net/Izumi.Sagiri.full.2967409.jpg",
"https://static.zerochan.net/Izumi.Sagiri.full.2608844.jpg",
"http://pm1.narvii.com/6475/be36eaec29406115cef8f8125c61f56384ada709_00.jpg",
"https://pm1.narvii.com/6741/1e44c076d4ee143442e1cedb1e22550936f5958dv2_hq.jpg",
"https://pbs.twimg.com/media/Eo58L4PXMAcDLDJ?format=jpg&name=large",
"https://ih1.redbubble.net/image.357041289.2995/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg",
"https://i.pinimg.com/originals/1d/db/43/1ddb4324650a71576be421d7d0cbacd3.jpg",
"https://i.pinimg.com/originals/d7/25/61/d72561d46532ff22ee84a2cb5cdacd83.jpg",
"http://pm1.narvii.com/6720/b3d6ef9adef9860cde46ee8892511b80b9082901_00.jpg",
"http://pm1.narvii.com/6510/7bb51f050f26f0efc9ce26c3d3f318e5350e821b_00.jpg",
"https://i.pinimg.com/736x/e5/72/d7/e572d7ca6d4984ce606e1f1707df603e--anime-girls.jpg"
]
