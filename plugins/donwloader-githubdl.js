let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let fetch = require('node-fetch')
let handler = async (m, { args, usedPrefix, command }) => {

    if (!args[0]) throw 'link githubnya mana? contoh: https://github.com/Bintang73/botst4rz'

    if (!regex.test(args[0])) throw 'link salah!'

    let [, user, repo] = args[0].match(regex) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    // 'attachment; filename=Nurutomo-wabot-aq-v2.5.1-251-g836cccd.zip'
    m.reply(`*Mohon tunggu, sedang mengirim repository..*`)
    conn.sendFile(m.chat, url, filename, null, m)

}
handler.help = ['gitclone <url>']
handler.tags = ['github']
handler.command = /gitclone/i

handler.limit = true

module.exports = handler
  

/*if (!args[0]) throw 'donde esta el nombre de usuario bro?'
if (!args[1]) throw '¿dónde está el repositorio'
if (!args[2]) throw 'ingrese el nombre de la sucursal'
let url = `https://github.com/${args[0]}/${args[1]}/archive/refs/heads/${args[2]}.zip`
//F
m.reply(`compressing data to file zip*`)
conn.sendFile( m.chat, url, `${args[1]} ${args[2]}.zip`, null, m)*/

}
handler.help = ['githubdl']
handler.tags = ['github']
handler.command = /githubdl/i
handler.limit = true

module.exports = handler
