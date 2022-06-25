// SI VAS A MODIFICAR AL MENOS NO QUITES LOS CREDITOS, WEB, ENLACES, DE ESA FORMA YA ESTAS APOYANDO 
// PARA QUE SE PUEDA SEGUIR ELABORANDO EN ESTE LINDO MULTIVERSEBOT-MD 
// TAMBIEN PUEDES AGREGAR TÚ INFORMACIÓN SIN ESTAR ELIMINANDO LOS CREDITOS 
// EN CASO DE PODER COMPARTIR ESTE REPOSITORIO SE TE AGREDECE, Y GRACIAS POR INTERESARTE EN MULTIVERSEBOT-MD!! 
let { MessageType } = require('@adiwajshing/baileys')
let axios = require('axios')
let fetch = require('node-fetch')
let fs = require('fs')


let handler = async (m, { conn, text } ) => {
  let imgmenu = './src/github.jpg'
  let miniurl = './src/github.jpg'
  let text = '*Test button*'
  
  conn.sendButton(m.chat, text, 'BY 4LB3RTO', imgmenu, [['Cʀᴇᴀᴅᴏʀ🐢', '.menu'], ['Iɴғᴏ📌', '.infobot']], false, { quoted: m, contextInfo: { externalAdReply: {
  showAdAttribution: true,
  mediaType: 'VIDEO',
  mediaUrl: '',
  title: '🐱⸽⃕NʏᴀɴCᴀᴛBᴏᴛ - MD🍁⃨፝⃕✰',
  body: '4LB3RTO',
  thumbnail: miniurl,
  sourceUrl: 'https://chat.whatsapp.com/JdCIiS4NNmC4XyxWM70Ori'
  }}})
}
   
    

handler.help = ['test']
handler.tags = ['info']
handler.command = ['test']

module.exports = handler


// MultiverseBot-MD
