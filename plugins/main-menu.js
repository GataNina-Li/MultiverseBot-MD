/* 
ES PREFERIBLE NO CAMBIAR NADA DE AQUÍ SI NO SABES LO QUE HACES
POR FAVOR NO CAMBIE LOS DATOS QUE PROPORCIONA SEGUIR ELABORANDO ESTE PROYECTO
PUEDES ESCRIBIRME AL INSTAGRAM SOLO AHÍ REALIZO LA ASISTENCIA
https://www.instagram.com/gata_dios 

SI HAY ERRORES PREVIO A NO HABER TOCADO NADA DE AQUÍ AVISAME POR FAVOR PARA DAR UNA SOLUCIÓN 

IT IS PREFERRED NOT TO CHANGE ANYTHING HERE IF YOU DON'T KNOW WHAT YOU'RE DOING
PLEASE DO NOT CHANGE THE DATA PROVIDED CONTINUE DEVELOPING THIS PROJECT
YOU CAN WRITE ME ON INSTAGRAM ONLY THERE I DO THE ASSISTANCE
https://www.instagram.com/gata_dios 

IF THERE ARE ERRORS BEFORE HAVING NOT TOUCHED ANYTHING HERE, PLEASE NOTIFY ME TO GIVE A SOLUTION
*/

// ✩｡:*•.─────  AJUSTE DE BASE  ─────.•*:｡✩
let { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let levelling = require('../lib/levelling')
let fs = require('fs')
const util = require('util')
const os = require('os')
let path = require('path')
let { createHash} = require('crypto')
let fetch = require('node-fetch')
let { perfomance } = require('perf_hooks')
let moment = require('moment-timezone')

// ✩｡:*•.─────  MENU PREDETERMINADO  ─────.•*:｡✩
const defaultMenu = {
  before:
`*╭𝄗𝄗𝄗✦ ${global.namebot} ✦𝄗𝄗𝄗⬣*
 ⎸ ☽ *_Usuario(a)_* » %name
 ⎸ ☾ *_Limites de Uso_* » *%limit*
 ⎸ ☽ *_Rango | Rol_* » %role
 ⎸ ☾ *_Nivel_* » *%level (%exp / %maxexp)*
 ⎸ ☽ *_Le Falta_* *%xp4levelup* *_para subir de Nivel_*
 ⎸ ☾ *_Experiencia | XP_* » *%totalexp*
 ⎸一一一一一一一一一一一一一
 ⎸ ☽ *_Fecha_* » *%week, %date*
 ⎸ ☾ *_Hora_* » *%time*
 ⎸一一一一一一一一一一一一一
 ⎸ ☽ *_Actividad_* » *%uptime | (%muptime)*
 ⎸ ☾ *_Respaldo_* » *%rtotalreg* 𝒅𝒆 *%totalreg*
 ⎸ ☽ *_Memoria en Uso_* » *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*╰𝄗𝄗✦ ⍟ ${vs} ✦𝄗𝄗⬣*
%readmore`.trimStart(), 
  header: '*╭𝄗✦ %category ✦𝄗⬣*',
  body: `   ⎸ %cmd %islimit %isPremium`,
  footer: `*╰𝄗𝄗𝄗✦ ⍟ ${vs} ✦𝄗𝄗𝄗⬣*`, 
  after: '',
}

// ✩｡:*•.─────  AGRUPACION POR CATEGORIA  ─────.•*:｡✩
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'absen', 'rpg', 'anime', 'downloader', 'game', 'fun', 'xp', 'github', 'group', 'image', 'quotes', 'admin', 'info', 'internet', 'islam', 'kerang', 'maker', 'owner', 'suara', 'premium', 'quotes', 'info', 'stalk', 'shortlink', 'sticker', 'tools', 'text', 'nsfw', 'asupan', 'random', 'textpro', 'photooxy']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
  'main': 'MENU UTAMA',
  'advanced': 'ADVANCED',
  'absen': 'MENU ABSEN',
  'anime': 'MENU ANIME',
  'sticker': 'MENU CONVERT',
  'downloader': 'MENU DOWNLOADER',
  'xp': 'MENU EXP',
  'fun': 'MENU FUN',
  'game': 'MENU GAME',
  'github': 'MENU GITHUB',
  'group': 'MENU GROUP',
  'image': 'MENU IMAGE',
  'info': 'MENU INFO',
  'internet': 'INTERNET',
  'islam' : 'MENU ISLAMI',
  'kerang': 'MENU KERANG',
  'maker': 'MENU MAKER',
  'owner': 'MENU OWNER',
  'Pengubah Suara': 'PENGUBAH SUARA',
  'premium': 'PREMIUM MENU',
  'quotes' : 'MENU QUOTES',
  'rpg': 'MENU RPG',
  'stalk': 'MENU STALK',
  'shortlink': 'SHORT LINK',
  'tools': 'MENU TOOLS',
  'vote': 'MENU VOTING',
  'nsfw': 'NSFW MENU', 
  'asupan': 'ASUPAN MENU', 
  'random': 'RANDOM MENU', 
  'textpro': 'TEXT PRO MENU', 
  'photooxy': 'PHOTO OXY MENU', 
  }
  if (teks == 'absen') tags = {
    'absen': 'MENU ABSEN',
    'vote': 'MENU VOTING',
  }
  if (teks == 'anime') tags = {
  'anime': 'MENU ANIME',
  }
  if (teks == 'sticker') tags = {
  'sticker': 'MENU CONVERT',
  }
  if (teks == 'downloader') tags = {
  'downloader': 'MENU DOWNLOADER',
  }
  if (teks == 'xp') tags = {
  'xp': 'MENU EXP',
  }
  if (teks == 'fun') tags = {
  'fun': 'MENU FUN',
  }
  if (teks == 'game') tags = {
  'game': 'MENU GAME',
  }
  if (teks == 'github') tags = {
  'github': 'MENU GITHUB',
  }
  if (teks == 'group') tags = {
  'group': 'MENU GROUP',
  }
  if (teks == 'image') tags = {
  'image': 'MENU IMAGE',
  }
  if (teks == 'info') tags = {
  'info': 'MENU INFO',
  }
  if (teks == 'internet') tags = {
  'internet': 'INTERNET',
  }
  if (teks == 'islam') tags = {
  'islam' : 'MENU ISLAMI',
  }
  if (teks == 'kerang') tags = {
  'kerang': 'MENU KERANG',
  }
  if (teks == 'maker') tags = {
  'maker': 'MENU MAKER',
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
  if (teks == 'suara') tags = {
  'Pengubah Suara': 'PENGUBAH SUARA',
  }
  if (teks == 'text') tags = {
  'text': 'MAKER TEXT',
  }
  if (teks == 'premium') tags = {
  'premium': 'PREMIUM MENU',
  }
  if (teks == 'quotes') tags = {
  'quotes' : 'MENU QUOTES',
  }
  if (teks == 'rpg') tags = {
  'rpg': 'MENU RPG',
  }
  if (teks == 'stalk') tags = {
  'stalk': 'MENU STALK',
  }
  if (teks == 'shortlink') tags = {
  'shortlink': 'SHORT LINK',
  }
  if (teks == 'tools') tags = {
  'tools': 'MENU TOOLS',
  }
  if (teks == 'nsfw') tags = {
  'nsfw': 'NSFW MENU', 
  }
  if (teks == 'asupan') tags = {
  'asupan': 'ASUPAN MENU', 
  }
  if (teks == 'random') tags = {
  'random': 'RANDOM MENU', 
  }
  if (teks == 'textpro') tags = {
  'textpro': 'TEXT PRO MENU', 
  }
  if (teks == 'photooxy') tags = {
  'photooxy': 'PHOTO OXY MENU', 
  }

// ✩｡:*•.─────  DATABASE  ─────.•*:｡✩
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let name = conn.getName(m.sender)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let premium = global.db.data.users[m.sender].premium
    let user = global.db.data.users[who]
    let { exp, limit, level, money, role } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let tag = `wa.me/${m.sender.split('@')[0]}`
 m, { contextInfo: { mentionedJid: conn.parseMention(tag) }}

// ✩｡:*•.─────  TIEMPO  ─────.•*:｡✩
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let wib = moment.tz('America/Bogota').format('HH:mm:ss')
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss')

// ✩｡:*•.─────  AJUSTES DE PROTOCOLO - AYUDA  ─────.•*:｡✩
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })

// ✩｡:*•.─────  IGNORA ESTO  ─────.•*:｡✩
const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}
const ftroli = {
    key : {
    remoteJid: 'status@broadcast',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 2022,
    status: 1,
    surface : 1,
    message: `Hai Kak ${name}!`, 
    orderTitle: `▮Menu ▸`,
    thumbnail: await (await fetch(fla + 'Menu')).buffer(), //Gambarnye
    sellerJid: '0@s.whatsapp.net' 
    }
    }
    }
const fdoc = {
   key : {
   remoteJid: 'status@broadcast',
   participant : '0@s.whatsapp.net'
   },
   message: {
   documentMessage: {
   title: wm, 
   }
   }
   }

// ✩｡:*•.─────  MENU DE INICIO  ─────.•*:｡✩
if (teks == '404') {
let menuu = 
`*╭𝄗𝄗𝄗☆ ${namebot} ☆𝄗𝄗𝄗⬣*
 ⎸⍟ *_Version Estelar_* ➟ *${vs}*
 ⎸✪ *_Usuarios_* ➟ *${Object.keys(global.db.data.users).length}* 
 ⎸✪ *_Activa Durante_* ➟ *${uptime}*
 ⎸✪ *_Modo_* ➟ *${global.opts['self'] ? '𝑷𝒓𝒊𝒗𝒂𝒅𝒐' : '𝑷𝒖𝒃𝒍𝒊𝒄𝒐'}*
 ⎸✪ *_Chats Baneados_* ➟ *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}*
 ⎸✪ *_Usuarios Baneados_* ➟ *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}*
*╰𝄗𝄗𝄗𝄗𝄗𝄗𝄗⬣*
*╭𝄗☆ ${name} ☆𝄗⬣*
 ⎸✪ *_Enlace_* ➟ *${tag}*
 ⎸✪ *_Limites de Uso_* ➟ *${limit}*
 ⎸✪ *_Rango | Rol_* ➟ ${role}
 ⎸✪ *_Premium_* ➟ ${global.prem ? '✅' : '❌'}
 ⎸✪ *_Fecha_* ➟ *${week} ${date}* 
 ⎸✪ *_Hora_* ➟ *${wib}*
*╰𝄗𝄗𝄗𝄗⬣*`
const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        listMessage: {
            title: `${ucapan()}`,
            description: menuu,
            buttonText: '𝑴𝑬𝑵𝑼 𝑫𝑰𝑵𝑨𝑴𝑰𝑪𝑶',
            listType: 1,
            footerText: `*_PRESIONE ESTE MENSAJE_*`,
            mtype: 'listMessage',
            sections: [
              {
                "rows": [{
                  "title": `PROPIETARIO(A) BOT`,
                  "description": "Número de Propietario(a) del Bot",
                  "rowId": `.owner`
                },{
                  "title": "❗ INFO BOT",
                  "description": "Mostrar el menú de información",
                  "rowId": `${_p}? info`
                }],
                "title": "INFORMACIÓN SOBRE EL BOT"
              }, {
                "rows": [{
                  "title": `│🧾│ TODOS LOS COMANDOS`,
                  "description": "Mostrar Todo el Menú",
                  "rowId": '.? all'
                  }, {
                  "title": "│ 📝│ ABSEN Y VOTO",
                  "description": "Visualización del menú de ausencias",
                  "rowId": `${_p}? absen`
                }, {
                  "title": "│⛩️│ANIME",
                  "description": "Visualización del menú de anime",
                  "rowId": `${_p}? anime`
                }, {
                  "title": "│🎇│STICKER & CONVERTIDOR",
                  "description": "Mostrar el menú de Sticker",
                  "rowId": `${_p}? sticker`
                }, {
                  "title": "│📺│DESCARGADOR",
                  "description": "Mostrar el menú del descargador",
                  "rowId": `${_p}? downloader`
                }, {
                  "title": "│📈│EXP & LIMIT",
                  "description": "Mostrar el menú Exp",
                  "rowId": `${_p}? xp`
                }, {
                  "title": "│🐣│DIVERSIÓN",
                  "description": "Mostrar el menú de diversión",
                  "rowId": `${_p}? fun`
                }, {
                  "title": "│🎮│JUEGO",
                  "description": "Mostrar el menú del juego",
                  "rowId": `${_p}? game`
                }, {
                  "title": "│🧰│GITHUB",
                  "description": "Mostrar el menú de Github",
                  "rowId": `${_p}? github`
                }, {
                  "title": "│🏢│GRUPO",
                  "description": "Mostrar el menú de grupo",
                  "rowId": `${_p}? group`
                }, {
                  "title": "│🖼│IMAGEN",
                  "description": "Mostrar el menú de imágenes",
                  "rowId": `${_p}? image`
                }, {
                  "title": "│📡│INTERNET",
                  "description": "Mostrar el menú de Internet",
                  "rowId": `${_p}? internet`
                }, {
                  "title": "│🕋│ISLAMIC",
                  "description": "Menampilkan Menu Islam",
                  "rowId": `${_p}? islam`
                }, {
                  "title": "│🐚│MARISCOS",
                  "description": "Visualización del menú de mariscos",
                  "rowId": `${_p}? kerang`
                }, {
                  "title": "│✒️│MAKER",
                  "description": "Mostrar el menú Maker",
                  "rowId": `${_p}? maker`
                }, {
                  "title": "│👨‍💻│OWNER",
                  "description": "Mostrar el menú del propietario(a)",
                  "rowId": `${_p}? owner`
                }, {
                  "title": "│🎙│CAMBIO DE VOZ",
                  "description": "Mostrar el menú del cambiador de voz",
                  "rowId": `${_p}? suara`
                }, {
                  "title": "│🔝│PREMIUM",
                  "description": "Menampilkan Menu Premium",
                  "rowId": `${_p}? premium`
                }, {
                  "title": "│📑│QUOTES",
                  "description": "Menampilkan Menu Quotes",
                  "rowId": `${_p}? quotes`
                }, {
                  "title": "│🌱│RPG",
                  "description": "Menampilkan Menu Rpg",
                  "rowId": `${_p}? rpg`
                }, {
                  "title": "│🐾│STALKER",
                  "description": "Menampilkan Menu Stalker",
                  "rowId": `${_p}? stalk`
                }, {
                  "title": "│🔗│SHORT LINK",
                  "description": "Menampilkan Menu Short Link",
                  "rowId": `${_p}? shortlink`
                }, {
                  "title": "│🛠│TOOLS MENU",
                  "description": "Menampilkan Menu Tools",
                  "rowId": `${_p}? tools`
                }, {
                  "title": "│📃│TEXT MAKER",
                  "description": "Menampilkan Maker Text",
                  "rowId": `${_p}? text`
                }, {
                  "title": "│🧼│HENTAI",
                  "description": "Menampilkan Menu Hentai",
                  "rowId": `${_p}? nsfw`
                }, {
                  "title": "│🌚│RANDOM",
                  "description": "Menampilkan Menu Random/Gabut",
                  "rowId": `${_p}? random`
                }, {
                  "title": "│⛄│TEXT PRO",
                  "description": "Menampilkan Text Pro Menu",
                  "rowId": `${_p}? textpro`
                }, {
                  "title": "│💨│PHOTO OXY",
                  "description": "Menampilkan Photo Oxy Menu",
                  "rowId": `${_p}? textpro`
                }
                  ],
                "title": "LIST MENU"
              }
            ], "contextInfo": {
              "stanzaId": m.key.id,
              "participant": m.sender,
              "quotedMessage": m.message
            }
    }}), { userJid: m.participant || m.key.remoteJid, quoted: fkontak });
    return await conn.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id }
    )
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? 'Ⓛ' : '')
                  .replace(/%isPremium/g, menu.premium ? 'Ⓟ' : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('\n')
      text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name,
      ucapan: ucapan(),
      level, limit, money, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    
// ✩｡:*•.─────  AJUSTES DE MENU - DATOS  ─────.•*:｡✩
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    //let message = await prepareWAMessageMedia({ image: await (await require('node-fetch')(fotonya2)).buffer()}, { upload: conn.waUploadToServer }) 
      //const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     // templateMessage: {
         // hydratedTemplate: {
          //  imageMessage: message.imageMessage, 
           // hydratedContentText: text, 
          //  hydratedFooterText: `Ⓛ ⇢ Limite\nⓅ ⇢ Premium\nMultiverseBot-MD `, 
          //  hydratedButtons: [{
	  
	  
    let message = await prepareWAMessageMedia({ video: fs.readFileSync('./media/menuv1.mp4'), gifPlayback: true }, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           videoMessage: message.videoMessage,
           hydratedContentText: text.trim(),
           hydratedFooterText: `Ⓛ ⇢ Limite\nⓅ ⇢ Premium\nMultiverseBot-MD`,
           hydratedButtons: [{
            urlButton: {
               displayText: 'Website Creator',
               url: web
             }

           },
             {
             urlButton: {
               displayText: 'Group Bot', 
               url: gc
             }

           },
               {
             quickReplyButton: {
               displayText: 'Owner',
               id: '.owner',
             }

           },
               {
             quickReplyButton: {
               displayText: 'Donasi',
               id: '.donasi',
             }

           },
           {
             quickReplyButton: {
               displayText: 'Credits',
               id: '.tqto',
             }
           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
     //conn.reply(m.chat, text.trim(), m)
    return await conn.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
} catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

// ✩｡:*•.─────  IGNORA ESTO  ─────.•*:｡✩
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('America/Los_Angeles').format('HH')
  res = "👋 *BIENVENIDO(A) | WELCOME* 👋"
  if (time >= 4) {
    res = "🌇 *Buenos Días | Good Morning* ⛅"
  }
  if (time >= 11) {
    res = "🏙️ *Buenas Tardes | Good Afternoon* 🌤️"
  }
  if (time >= 15) {
    res = "🌆 *Buenas tardes | Good Afternoon* 🌥️"
  }
  if (time >= 17) {
    res = "🌃 *Buenas noches | Good Evening* 💫"
  }
  return res
}
