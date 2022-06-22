/*let handler = async (m, { args, usedPrefix, command }) => {

if (!args[0]) throw 'donde esta el nombre de usuario bro?'
if (!args[1]) throw '¿dónde está el repositorio?'
if (!args[2]) throw 'ingrese el nombre de la sucursal'
let url = `https://github.com/${args[0]}/${args[1]}/archive/refs/heads/${args[2]}.zip`
//F
m.reply(`compressing data to file zip*`)
conn.sendFile( m.chat, url, `${args[1]} ${args[2]}.zip`, null, m)

}
handler.help = ['githubdl']
handler.tags = ['github']
handler.command = /githubdl/i

handler.limit = true

module.exports = handler*/
