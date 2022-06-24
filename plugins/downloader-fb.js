const cheerio = require('cheerio')
const fetch = require('node-fetch')
const FormData = require('form-data')
let handler = async (m, { usedPrefix, command, conn, args }) => {
  if (!args[0]) throw `Gunakan format: ${usedPrefix}${command} https://fb.watch/xxxxx/`
  let res = await fbdl(args[0])
  if (!res['mp4'].length) throw 'Video not found'
  let video, index
  for (let i = res['mp4'].length - 1; i > 0; i--) {
    let { link, form } = res['mp4'][i]
    let err
    try {
      let res = await fetch(link, {
        method: 'POST',
        headers: { ...form.getHeaders() },
        body: form
      })
      if (!res.ok) continue
      video = await res.buffer()
      index = i
      break
    } catch (e) {
      err = e
      continue
    }
    throw err
  }
  if (!video) throw 'Can\t get video'
  let json = res['mp4'][index]
  let caption = `
*Size:* ${json.fileSizeF}
*Kualitas:* ${json.quality}
`.trim()
  conn.sendFile(m.chat, video, 'media-fb', caption, m)
}
handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^f((b|acebook)(dl|download)?(er)?)$/i

module.exports = handler
