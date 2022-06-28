let fs = require('fs')
let handler  = async (m, { conn, usedPrefix }) => {
const ftroli = {
	key : {
                          participant : '0@s.whatsapp.net'
                        },
       message: {
                    orderMessage: {
                            itemCount : 1,
                            status: 1,
                            surface : 1,
                            message: 'MikeBot', //Kasih namalu
                            orderTitle: 'Bang',
                            thumbnail: fs.readFileSync('./media/welcome.jpg'), //Gambarnye
                            sellerJid: '0@s.whatsapp.net'
          
                          }
                        }
                      }

m.reply(`Hola`, ftroli)



handler.help = ['ftroli']

handler.tags = ['main']

handler.command = /^ftroli$/i
handler.owner = false

module.exports = handler
