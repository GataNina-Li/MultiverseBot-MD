let handler = async (m, {usedPrefix, command, conn, text}) => {
let video = fs.readFileSync(`./fotos/${pickRandom(['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41'])}.jpg`)

     conn.sendFile(m.chat, video, '2.jpg', caption, m)
}
handler.help = ['xvideo']
handler.tags = ['xvideo']
handler.command = /^foto|fotos$/i
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
