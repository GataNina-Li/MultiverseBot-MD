//import { facebookdl, facebookdlv2 } from '@bochilteam/scraper'
const { facebookdl, facebookdlv2 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args }) => {
if (!args[0]) throw `enlace?`
try {
const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0]))
for (const { url, isVideo } of result.reverse()) await conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, `*Url:* ${url}`, m)
} catch (e) {
await m.reply('error')
console.log(e)
}}
handler.help = ['facebbok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
export default handler
