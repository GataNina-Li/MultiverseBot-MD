const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../lib/exif')
const {
    default: makeWASocket,
    proto,
    downloadContentFromMessage,
    getBinaryNodeChild,
    jidDecode,
    areJidsSameUser,
    generateForwardMessageContent,
    generateWAMessageFromContent
} = require('@adiwajshing/baileys')
const { toAudio, toPTT, toVideo } = require('./converter')
const chalk = require('chalk')
const jimp_1 = require('jimp')
const fetch = require('node-fetch')
const FileType = require('file-type')
const PhoneNumber = require('awesome-phonenumber')
const fs = require('fs')
const tr = require('translate-google-api')
const path = require('path')

exports.makeWASocket = (...args) => {
    let conn = makeWASocket(...args)

    conn.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    if (conn.user && conn.user.id) conn.user.jid = conn.decodeJid(conn.user.id)
    conn.chats = {}
    conn.contacts = {}

    function updateNameToDb(contacts) {
        if (!contacts) return
        for (let contact of contacts) {
            let id = conn.decodeJid(contact.id)
            if (!id) continue
            let chats = conn.contacts[id]
            if (!chats) chats = { id }
            let chat = {
                ...chats,
                ...({
                    ...contact, id, ...(id.endsWith('@g.us') ?
                        { subject: contact.subject || chats.subject || '' } :
                        { name: contact.notify || chats.name || chats.notify || '' })
                } || {})
            }
            conn.contacts[id] = chat
        }
    }
    conn.ev.on('contacts.upsert', updateNameToDb)
    conn.ev.on('groups.update', updateNameToDb)
    conn.ev.on('group-participants.update', async function updateParticipantsToDb({ id, participants, action }) {
        id = conn.decodeJid(id)
        if (!(id in conn.contacts)) conn.contacts[id] = { id }
        let groupMetadata = Object.assign((conn.contacts[id].metadata || {}), await conn.groupMetadata(id))
        for (let participant of participants) {
            participant = conn.decodeJid(participant)
            switch (action) {
                case 'add': {
                    if (participant == conn.user.jid) groupMetadata.readOnly = false
                    let same = (groupMetadata.participants || []).find(user => user && user.id == participant)
                    if (!same) groupMetadata.participants.push({ id, admin: null })
                }
                    break
                case 'remove': {
                    if (participant == conn.user.jid) groupMetadata.readOnly = true
                    let same = (groupMetadata.participants || []).find(user => user && user.id == participant)
                    if (same) {
                        let index = groupMetadata.participants.indexOf(same)
                        if (index !== -1) groupMetadata.participants.splice(index, 1)
                    }
                }
                    break
            }
        }
        conn.contacts[id] = {
            ...conn.contacts[id],
            subject: groupMetadata.subject,
            desc: groupMetadata.desc.toString(),
            metadata: groupMetadata
        }
    })

    conn.ev.on('groups.update', function groupUpdatePushToDb(groupsUpdates) {
        for (let update of groupsUpdates) {
            let id = conn.decodeJid(update.id)
            if (!id) continue
            if (!(id in conn.contacts)) conn.contacts[id] = { id }
            if (!conn.contacts[id].metadata) conn.contacts[id].metadata = {}
            let subject = update.subject
            if (subject) conn.contacts[id].subject = subject
            let announce = update.announce
            if (announce) conn.contacts[id].metadata.announce = announce
        }
    })
    conn.ev.on('chats.upsert', function chatsUpsertPushToDb(chats_upsert) {
        console.log({ chats_upsert })
    })
    conn.ev.on('presence.update', function presenceUpdatePushToDb({ id, presences }) {
        let sender = Object.keys(presences)[0] || id
        let _sender = conn.decodeJid(sender)
        let presence = presences[sender]['lastKnownPresence'] || 'composing'
        if (!(_sender in conn.contacts)) conn.contacts[_sender] = {}
        conn.contacts[_sender].presences = presence
    })

    conn.logger = {
        ...conn.logger,
        info(...args) { console.log(chalk.bold.rgb(57, 183, 16)(`INFO [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.cyan(...args)) },
        error(...args) { console.log(chalk.bold.rgb(247, 38, 33)(`ERROR [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.rgb(255, 38, 0)(...args)) },
        warn(...args) { console.log(chalk.bold.rgb(239, 225, 3)(`WARNING [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.keyword('orange')(...args)) }
    }

    /**
     * getBuffer hehe
     * @param {String|Buffer} path
     * @param {Boolean} returnFilename
     */
    conn.getFile = async (PATH, returnAsFilename) => {
        let res, filename
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        if (data && returnAsFilename && !filename) (filename = path.join(__dirname, '../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
        return {
            res,
            filename,
            ...type,
            data
        }
    }
    //acak
    conn.acak = async(isi) => {
        return isi[Math.floor(Math.random() * isi.length)]
    }

    /**
     * waitEvent
     * @param {*} eventName 
     * @param {Boolean} is 
     * @param {Number} maxTries 
     * @returns 
     */
    conn.waitEvent = (eventName, is = () => true, maxTries = 25) => {
        return new Promise((resolve, reject) => {
            let tries = 0
            let on = (...args) => {
                if (++tries > maxTries) reject('Max tries reached')
                else if (is()) {
                    conn.ev.off(eventName, on)
                    resolve(...args)
                }
            }
            conn.ev.on(eventName, on)
        })
    }
    
    //filter
    conn.filter = (text) => {
      let mati = ["q", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
      if (/[aiueo][aiueo]([qwrtypsdfghjklzxcvbnm])?$/i.test(text)) return text.substring(text.length - 1)
      else {
        let res = Array.from(text).filter(v => mati.includes(v))
        let resu = res[res.length - 1]
        for (let huruf of mati) {
          if (text.endsWith(huruf)) {
            resu = res[res.length - 2]
          }
        }
        let misah = text.split(resu)
        return resu + misah[misah.length - 1]
      }
    }

    /**
    * Send Media/File with Automatic Type Specifier
    * @param {String} jid
    * @param {String|Buffer} path
    * @param {String} filename
    * @param {String} caption
    * @param {Object} quoted
    * @param {Boolean} ptt
    * @param {Object} options
    */
    conn.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await conn.getFile(path, true)
        let { res, data: file, filename: pathFile } = type
        if (res && res.status !== 200 || file.length <= 65536) {
            try { throw { json: JSON.parse(file.toString()) } }
            catch (e) { if (e.json) throw e.json }
        }
        let opt = { filename }
        if (quoted) opt.quoted = quoted
        if (!type) if (options.asDocument) options.asDocument = true
        let mtype = '', mimetype = type.mime
        if (/webp/.test(type.mime)) mtype = 'sticker'
        else if (/image/.test(type.mime)) mtype = 'image'
        else if (/video/.test(type.mime)) mtype = 'video'
        else if (/audio/.test(type.mime)) (
            convert = await (ptt ? toPTT : toAudio)(file, type.ext),
            file = convert.data,
            pathFile = convert.filename,
            mtype = 'audio',
            mimetype = 'audio/ogg; codecs=opus'
        )
        else mtype = 'document'
        return await conn.sendMessage(jid, {
            ...options,
            caption,
            ptt,
            [mtype]: { url: pathFile },
            mimetype
        }, {
            ...opt,
            ...options
        })
    }
    //GANTI WM STIKER
    conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
    
    conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
    //send contact versi array
    conn.sendContactArray = async (jid, data, quoted, options) => {
        let contacts = []
        for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
            number = number.replace(/[^0-9]/g, '')
            let njid = number + '@s.whatsapp.net'
            let biz = await conn.getBusinessProfile(njid) || {}
            // N:;${name.replace(/\n/g, '\\n').split(' ').reverse().join(';')};;;
            let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:📧 Email
item3.ADR:;;${isi3};;;;
item3.X-ABADR:ac
item3.X-ABLabel:📍 Region
item4.URL:${isi4}
item4.X-ABLabel:Website
item5.X-ABLabel:${isi5}
END:VCARD`.trim()
            contacts.push({ vcard, displayName: name })

        }
        return await conn.sendMessage(jid, {
            contacts: {
                displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null,
                contacts,
            }
        },
            {
                quoted,
                ...options
            })
    }
    /**
 * send Button Vid
 * @param {String} jid 
 * @param {String} contentText 
 * @param {String} footer
 * @param {Buffer|String} buffer 
 * @param {String[]} buttons 
 * @param {Object} quoted 
 * @param {Object} options 
 */
    conn.sendBV = async (jid, contentText, footer, video, buttons, quoted, options) => {
        let message = {
            video: { url: video }, ...options,
            caption: contentText,
            headerType: 4,
            footer: footer,
            buttons: buttons.map(mk => {
                return {
                    buttonId: mk[1] || mk[0] || '',
                    buttonText: {
                        displayText: mk[0] || mk[1] || ''
                    }
                }
            })
        }
        return await conn.sendMessage(jid, message, { quoted: quoted, ...options })
    }

    /**
     * send Button Document 
     * @param {String} jid 
     * @param {String} contentText 
     * @param {String} footer
     * @param {Buffer|String} buffer 
     * @param {String[]} buttons 
     * @param {Object} quoted 
     * @param {Object} options 
     */
    conn.sendBD = async (jid, contentText, footer, doc, buttons, quoted, options) => {
        let message = {
            document: { url: doc },
            ...options,
            caption: contentText,
            headerType: 4,
            footer: footer,
            buttons: buttons.map(mk => {
                return {
                    buttonId: mk[1] || mk[0] || '',
                    buttonText: {
                        displayText: mk[0] || mk[1] || ''
                    }
                }
            })
        }
        return await conn.sendMessage(jid, message, { quoted: quoted, ...options })
    }

    /**
    * send Button
    * @param {String} jid 
    * @param {String} contentText 
    * @param {String} footer
    * @param {Buffer|String} buffer 
    * @param {String[]} buttons 
    * @param {proto.WebMessageInfo} quoted 
    * @param {Object} options 
    */
    conn.sendButton = async (jid, text = '', footer = '', buffer, buttons, quoted, options = {}) => {
        let type
        if (buffer) try { (type = await conn.getFile(buffer), buffer = type.data) } catch { buffer = null }
        let message = {
            ...options,
            [buffer ? 'caption' : 'text']: text || '',
            footer,
            buttons: buttons.map(btn => ({
                buttonId: btn[1] || btn[0] || '',
                buttonText: {
                    displayText: btn[0] || btn[1] || ''
                }
            })),
            ...(buffer ?
                options.asLocation && /image/.test(type.mime) ? {
                    location: {
                        ...options,
                        jpegThumbnail: buffer
                    }
                } : {
                    [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer
                } : {})
        }
        delete options.asLocation
        delete options.asVideo
        delete options.asDocument
        delete options.asImage
        return await conn.sendMessage(jid, message, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
    }

    /**
     * 
     * @param {String} jid 
     * @param {String} text 
     * @param {String} footer 
     * @param {fs.PathLike} buffer 
     * @param {String} url 
     * @param {String} urlText
     * @param {String} call 
     * @param {String} callText
     * @param {String} buttons 
     * @param {proto.WebMessageInfo} quoted 
     * @param {Object} options 
     */
    conn.sendHydrated = async (jid, text = '', footer = '', buffer, url, urlText, call, callText, buttons, quoted, options = {}) => {
        let type
        if (buffer) try { (type = await conn.getFile(buffer), buffer = type.data) } catch { buffer = null }
        let templateButtons = []
        if (url || urlText) templateButtons.push({
            index: 1,
            urlButton: {
                displayText: urlText || url || '',
                url: url || urlText || ''
            }
        })
        if (call || callText) templateButtons.push({
            index: templateButtons.length + 1,
            callButton: {
                displayText: callText || call || '',
                phoneNumber: call || callText || ''
            }
        })
        templateButtons.push(...(buttons.map(([text, id], index) => ({
            index: templateButtons.length + index + 1,
            quickReplyButton: {
                displayText: text || id || '',
                id: id || text || ''
            }
        })) || []))
        let message = {
            ...options,
            [buffer ? 'caption' : 'text']: text || '',
            footer,
            templateButtons,
            ...(buffer ?
                options.asLocation && /image/.test(type.mime) ? {
                    location: {
                        ...options,
                        jpegThumbnail: buffer
                    }
                } : {
                    [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer
                } : {})
        }

        delete options.asLocation
        delete options.asVideo
        delete options.asDocument
        delete options.asImage
        return await conn.sendMessage(jid, message, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
    }
    //========== Template Here ==========// 

    /**
    * send Template Button
    * @param {String} jid 
    * @param {String} contentText 
    * @param {String} footer
    * @param {String} buttons
    * @param {String} row
    * @param {Object} quoted 
    */
    conn.sendTB = async (jid, contentText, footer, dtux, urlx, dtcx, nmbrx, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
        const message = {
            ...options,
            text: contentText,
            footer: footer,
            templateButtons: [
                {
                    urlButton: {
                        displayText: dtux,
                        url: urlx
                    }
                },
                {
                    callButton: {
                        displayText: dtcx,
                        phoneNumber: nmbrx
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons1,
                        id: row1
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons2,
                        id: row2
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons3,
                        id: row3
                    }
                },
            ]
        }
        return await conn.sendMessage(jid, message, { quoted: quoted, ...options })
    }
    
    /**
     * send Template Button Doc  
     * @param {String} jid 
     * @param {String} contentText 
     * @param {String} footer
     * @param {Buffer|String} buffer 
     * @param {String} buttons1
     * @param {String} row1
     * @param {Object} quoted 
     * @param {Object} options 
     */
    conn.sendTBD = async (jid, contentText, footer, thumb, dtux, urlx, dtcx, nmbrx, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
        const message = {
            document: { url: docux }, ...options,
            jpegThumbnail: await (await fetch(thumb)).buffer(), fileName: global.nd, mimetype: global.td, fileLength: global.fsdx, pageCount: global.pcdx,
            caption: contentText,
            footer: footer,
            templateButtons: [
                {
                    urlButton: {
                        displayText: dtux,
                        url: urlx
                    }
                },
                {
                    callButton: {
                        displayText: dtcx,
                        phoneNumber: nmbrx
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons1,
                        id: row1
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons2,
                        id: row2
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons3,
                        id: row3
                    }
                },
            ]
        }
        return await conn.sendMessage(jid, message, { quoted: quoted, ...options })
    }

    /**
     * send Template Button Loc
     * @param {String} jid 
     * @param {String} contentText 
     * @param {String} footer
     * @param {Buffer|String} buffer 
     * @param {String} buttons1
     * @param {String} row1
     * @param {Object} quoted 
     * @param {Object} options 
     */
    conn.sendTBL = async (jid, contentText, footer, thumb, dtux, urlx, dtcx, nmbrx, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
        const message = {
            location: { jpegThumbnail: await (await fetch(thumb)).buffer() },
            ...options,
            caption: contentText,
            footer: footer,
            templateButtons: [
                {
                    urlButton: {
                        displayText: dtux,
                        url: urlx
                    }
                },
                {
                    callButton: {
                        displayText: dtcx,
                        phoneNumber: nmbrx
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons1,
                        id: row1
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons2,
                        id: row2
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons3,
                        id: row3
                    }
                },
            ]
        }
        return await conn.sendMessage(jid, message, { quoted: quoted, ...options })
    }
    
    /**
  * send Button Img
  * @param {String} jid 
  * @param {String} contentText 
  * @param {String} footer
  * @param {Buffer|String} buffer 
  * @param {String} buttons1
  * @param {String} row1
  * @param {Object} quoted 
  * @param {Object} options 
  */
    conn.sendTBI = async (jid, contentText, footer, image, dtux, urlx, dtcx, nmbrx, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
        const message = {
            image: { url: image }, ...options,
            jpegThumbnail: await (await fetch(thumbt)).buffer(),
            caption: contentText,
            footer: footer,
            templateButtons: [
                {
                    urlButton: {
                        displayText: dtux,
                        url: urlx
                    }
                },
                {
                    callButton: {
                        displayText: dtcx,
                        phoneNumber: nmbrx
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons1,
                        id: row1
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons2,
                        id: row2
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons3,
                        id: row3
                    }
                },
            ]
        }
        return await conn.sendMessage(jid, message, { quoted: quoted, ...options })
    }
    
    /**
  * send Button Video 
  * @param {String} jid 
  * @param {String} contentText 
  * @param {String} footer
  * @param {Buffer|String} buffer 
  * @param {String} buttons1
  * @param {String} row1
  * @param {Object} quoted 
  * @param {Object} options 
  */
    conn.sendTBV = async (jid, contentText, footer, video, dtux, urlx, dtcx, nmbrx, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
        const message = {
            video: { url: video }, ...options,
            jpegThumbnail: await (await fetch(thumbt)).buffer(),
            caption: contentText,
            footer: footer,
            templateButtons: [
                {
                    urlButton: {
                        displayText: dtux,
                        url: urlx
                    }
                },
                {
                    callButton: {
                        displayText: dtcx,
                        phoneNumber: nmbrx
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons1,
                        id: row1
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons2,
                        id: row2
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons3,
                        id: row3
                    }
                },
            ]
        }
        return await conn.sendMessage(jid, message, { quoted: quoted, ...options })
    }

    /**
       * send Button Video Gif
       * @param {String} jid 
       * @param {String} contentText 
       * @param {String} footer
       * @param {Buffer|String} buffer 
       * @param {String} buttons1
       * @param {String} row1
       * @param {Object} quoted 
       * @param {Object} options 
       */
    conn.sendTBVG = async (jid, contentText, footer, video, dtux, urlx, dtcx, nmbrx, buttons1, row1, buttons2, row2, buttons3, row3, quoted, options) => {
        const message = {
            video: { url: video }, ...options,
            gifPlayback: true, jpegThumbnail: await (await fetch(thumbt)).buffer(), fileLength: fsx,
            caption: contentText,
            footer: footer,
            templateButtons: [
                {
                    urlButton: {
                        displayText: dtux,
                        url: urlx
                    }
                },
                {
                    callButton: {
                        displayText: dtcx,
                        phoneNumber: nmbrx
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons1,
                        id: row1
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons2,
                        id: row2
                    }
                },
                {
                    quickReplyButton: {
                        displayText: buttons3,
                        id: row3
                    }
                },
            ]
        }
        return await conn.sendMessage(jid, message, { quoted: quoted, ...options })
    }
    //=============Template============//
  conn.sendTemplateLoc = async (jid, contentText, footer, buffer, quoted) => {
    const { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys')
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          locationMessage: { jpegThumbnail: buffer },
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: 'Source Code Bot',
              url: 'https://github.com/ilmanhdyt/ShiraoriBOT-Md'
            }
          }, {
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            urlButton: {
              displayText: global.dtu2,
              url: global.urlnya2
            }
          }, {
            callButton: {
              displayText: global.dtc,
              phoneNumber: global.phn
            }
          }
          ]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.sendTemplateButtonLoc = async (jid, contentText, footer, buffer, buttons1, row1, quoted) => {
    const { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys')
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          locationMessage: { jpegThumbnail: buffer },
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            callButton: {
              displayText: global.dtc,
              phoneNumber: global.phn
            }
          },
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          }]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send2TemplateButtonLoc = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, quoted) => {
    const { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys')
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          locationMessage: { jpegThumbnail: buffer },
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            callButton: {
              displayText: global.dtc,
              phoneNumber: global.phn
            }
          },
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          },
          {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
          }]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send3TemplateButtonLoc = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, buttons3, row3, quoted) => {
    const { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys')
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          locationMessage: { jpegThumbnail: buffer },
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            callButton: {
              displayText: global.dtc,
              phoneNumber: global.phn
            }
          },
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          },
          {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
           },
          {
            quickReplyButton: {
              displayText: buttons3,
              id: row3
            }
          }]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.sendTemplate2UrlButtonLoc = async (jid, contentText, footer, buffer, buttons1, row1, quoted) => {
    const { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys')
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          locationMessage: { jpegThumbnail: buffer },
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            urlButton: {
              displayText: global.dtu2,
              url: global.urlnya2
            }
          }, {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          }
          ]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send2Template2UrlButtonLoc = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, quoted) => {
    const { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys')
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          locationMessage: { jpegThumbnail: buffer },
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            urlButton: {
              displayText: global.dtu2,
              url: global.urlnya2
            }
          }, {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          },
          {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
          }
          ]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send3Template2UrlButtonLoc = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, buttons3, row3, quoted) => {
    const { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys')
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          locationMessage: { jpegThumbnail: buffer },
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            urlButton: {
              displayText: global.dtu2,
              url: global.urlnya2
            }
          }, {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          },
          {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
          },
          {
            quickReplyButton: {
              displayText: buttons3,
              id: row3
            }
          }
          ]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }

  /**
* send Button Img
* @param {String} jid 
* @param {String} contentText 
* @param {String} footer
* @param {Buffer|String} buffer 
* @param {String} buttons1
* @param {String} row1
* @param {Object} quoted 
* @param {Object} options 
*/
conn.sendUrlButtonImg = async (jid, contentText, footer, buffer, buttons1, row1, quoted) => {
    const { default: makeWASocket, generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: elyas.imageMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, 
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          }]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.sendTemplateButtonImg = async (jid, contentText, footer, buffer, buttons1, row1, quoted) => {
    const { default: makeWASocket, generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: elyas.imageMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            callButton: {
              displayText: global.dtc,
              phoneNumber: global.phn
            }
          },
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          }]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send2TemplateButtonImg = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, quoted) => {
    const { default: makeWASocket, generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: elyas.imageMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            callButton: {
              displayText: global.dtc,
              phoneNumber: global.phn
            }
          },
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          },
          {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
          }]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send3TemplateButtonImg = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, buttons3, row3, quoted) => {
    const { default: makeWASocket, generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: elyas.imageMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            callButton: {
              displayText: global.dtc,
              phoneNumber: global.phn
            }
          },
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          },
          {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
          },
          {
            quickReplyButton: {
              displayText: buttons3,
              id: row3
            }
          }
          ]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  /**
* send Button Img
* @param {String} jid 
* @param {String} contentText 
* @param {String} footer
* @param {Buffer|String} buffer 
* @param {String} buttons1
* @param {String} row1
* @param {Object} quoted 
* @param {Object} options 
*/
  conn.sendTemplate2UrlButtonImg = async (jid, contentText, footer, buffer, buttons1, row1, quoted) => {
    const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: elyas.imageMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            urlButton: {
              displayText: global.dtu2,
              url: global.urlnya2
            }
          }, {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          }
          ]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send2Template2UrlButtonImg = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, quoted) => {
    const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: elyas.imageMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            urlButton: {
              displayText: global.dtu2,
              url: global.urlnya2
            }
          }, {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          }, {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
          }
          ]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send3Template2UrlButtonImg = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, buttons3, row3, quoted) => {
    const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: elyas.imageMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            urlButton: {
              displayText: global.dtu2,
              url: global.urlnya2
            }
          }, {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          }, {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
          }, {
            quickReplyButton: {
              displayText: buttons3,
              id: row3
            }
          }
          ]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.sendTemplateButtonVid = async (jid, contentText, footer, buffer, buttons1, row1, quoted) => {
    const { default: makeWASocket, generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ video: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          videoMessage: elyas.videoMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            callButton: {
              displayText: global.dtc,
              phoneNumber: global.phn
            }
          },
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          }]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send2TemplateButtonvid = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, quoted) => {
    const { default: makeWASocket, generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ video: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          videoMessage: elyas.videoMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            callButton: {
              displayText: global.dtc,
              phoneNumber: global.phn
            }
          },
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          },
          {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
          }]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send3TemplateButtonVid = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, buttons3, row3, quoted) => {
    const { default: makeWASocket, generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ video: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          videoMessage: elyas.videoMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            callButton: {
              displayText: global.dtc,
              phoneNumber: global.phn
            }
          },
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          },
          {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
          },
          {
            quickReplyButton: {
              displayText: buttons3,
              id: row3
            }
          }
          ]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.sendTemplate2UrlButtonVid = async (jid, contentText, footer, buffer, buttons1, row1, quoted) => {
    const { default: makeWASocket, generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ video: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          videoMessage: elyas.videoMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            urlButton: {
              displayText: global.dtu2,
              url: global.urlnya2
            }
          },
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          }]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send2Template2UrlButtonVid = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, quoted) => {
    const { default: makeWASocket, generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ video: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          videoMessage: elyas.videoMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            urlButton: {
              displayText: global.dtu2,
              url: global.urlnya2
            }
          }, {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
            }, {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
          }]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.send3Template2UrlButtonVid = async (jid, contentText, footer, buffer, buttons1, row1, buttons2, row2, buttons3, row3, quoted) => {
    const { default: makeWASocket, generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ video: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          videoMessage: elyas.videoMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            urlButton: {
              displayText: global.dtu2,
              url: global.urlnya2
            }
          }, {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
           }, {
            quickReplyButton: {
              displayText: buttons2,
              id: row2
            }
           }, {
            quickReplyButton: {
              displayText: buttons3,
              id: row3
            }
          }]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
    /**
     * Send Contact
     * @param {String} jid 
     * @param {String} number 
     * @param {String} name 
     * @param {Object} quoted 
     * @param {Object} options 
     */
    conn.sendContact = async (jid, number, name, quoted, options) => {
        number = number.replace(/[^0-9]/g, '')
        let njid = number + '@s.whatsapp.net'
        let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD
    `
        return await conn.sendMessage(jid, {
            contacts: {
                displayName: name,
                contacts: [{ vcard }],
                quoted, ...options
            },
            quoted, ...options
        })
    }
    /**
     * Reply to a message
     * @param {String} jid
     * @param {String|Object} text
     * @param {Object} quoted
     * @param {Object} options
     */
    conn.reply = (jid, text = '', quoted, options) => {
        return Buffer.isBuffer(text) ? conn.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, { contextInfo: { mentionedJid: conn.parseMention(text)}, ...options, text }, { quoted, ...options })
    }
    /**
     * send Button
     * @param {String} jid 
     * @param {String} contentText 
     * @param {String} footer
     * @param {Buffer|String} buffer 
     * @param {String[]} buttons 
     * @param {Object} quoted 
     * @param {Object} options 
     */
    conn.sendButton = async (jid, contentText, footer, buffer, buttons, quoted, options) => {
        if (buffer) try { buffer = (await conn.getFile(buffer)).data } catch { buffer = null }
        let message = {
            ...options,
            ...(buffer ? { caption: contentText || '' } : { text: contentText || '' }),
            footer,
            buttons: buttons.map(btn => {
                return {
                    buttonId: btn[1] || btn[0] || '',
                    buttonText: {
                        displayText: btn[0] || btn[1] || ''
                    }
                }
            }),
            ...(buffer ? { image: buffer } : {})
        }
        return await conn.sendMessage(jid, message, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
    }
    
       conn.sendBut = async(id, content, footer, button1, row1, quoted) => {
	  const buttons = [
	  {buttonId: row1, buttonText: {displayText: button1}, type: 1}
	  ]
const buttonMessage = {
    text: content,
    footer: footer,
    buttons: buttons,
    headerType: 1,
    mentions: conn.parseMention(footer+content)
}
return await conn.sendMessage(id, buttonMessage, {quoted})
  }
  
   conn.send2But = async(id, content, footer, button1, row1, button2, row2, quoted) => {
	  const buttons = [
	   { buttonId: row1, buttonText: { displayText: button1 }, type: 1 },
          { buttonId: row2, buttonText: { displayText: button2 }, type: 1 }
	  ]
const buttonMessage = {
    text: content,
    footer: footer,
    buttons: buttons,
    headerType: 1,
    mentions: conn.parseMention(footer+content)
}
return await conn.sendMessage(id, buttonMessage, {quoted})
  }
  
   conn.send3But = async(id, content, footer,button1, row1, button2, row2, button3, row3, quoted) => {
	  const buttons = [
	  { buttonId: row1, buttonText: { displayText: button1 }, type: 1 },
          { buttonId: row2, buttonText: { displayText: button2 }, type: 1 },
          { buttonId: row3, buttonText: { displayText: button3 }, type: 1 }
	  ]
const buttonMessage = {
    text: content,
    footer: footer,
    buttons: buttons,
    headerType: 1,
    mentions: conn.parseMention(footer+content)
}
return await conn.sendMessage(id, buttonMessage, {quoted})
  }
  
conn.sendButtonImg = async(id, buffer, content, footer, button1, row1, quoted) => {
	  const buttons = [
	  {buttonId: row1, buttonText: {displayText: button1}, type: 1}
	  ]
const buttonMessage = {
    image: {url: buffer},
    caption: content,
    footer: footer,
    buttons: buttons,
    headerType: 1
}
return await conn.sendMessage(id, buttonMessage, {quoted})
  }
  
   conn.send2ButtonImg = async(id, content, footer, button1, row1, button2, row2, quoted) => {
	  const buttons = [
	   { buttonId: row1, buttonText: { displayText: button1 }, type: 1 },
          { buttonId: row2, buttonText: { displayText: button2 }, type: 1 }
	  ]
const buttonMessage = {
   image: {url: buffer},
    caption: content,
    footer: footer,
    buttons: buttons,
    headerType: 1
}
return await conn.sendMessage(id, buttonMessage, {quoted})
  }
  
   conn.send3ButtonImg = async(id, content, footer,button1, row1, button2, row2, button3, row3, quoted) => {
	  const buttons = [
	  { buttonId: row1, buttonText: { displayText: button1 }, type: 1 },
          { buttonId: row2, buttonText: { displayText: button2 }, type: 1 },
          { buttonId: row3, buttonText: { displayText: button3 }, type: 1 }
	  ]
const buttonMessage = {
    image: {url: buffer},
    caption: content,
    footer: footer,
    buttons: buttons,
    headerType: 1
}
return await conn.sendMessage(id, buttonMessage, {quoted})
  }
  conn.sendUrlButtonImg = async (jid, buffer, contentText, footer, buttons1, row1, quoted) => {
    const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require('@adiwajshing/baileys')
    const elyas = await prepareWAMessageMedia({ image: buffer }, { upload: conn.waUploadToServer })
    const template = generateWAMessageFromContent(quoted.key.remoteJid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          imageMessage: elyas.imageMessage,
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu1,
              url: global.urlnya1
            }
          }, {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          }
          ]
        }
      }
    }), { quoted: quoted });
    return await conn.relayMessage(
      jid,
      template.message,
      { messageId: template.key.id }
    )
  }
  conn.sendUrlButton = async (jid, content, distek, link,  retek, id,quoted) => {
	let template = generateWAMessageFromContent(jid, proto.Message.fromObject({
	             templateMessage: {
             hydratedTemplate: {
                 hydratedContentText: content,
                 hydratedButtons: [{
                     urlButton: {
                         displayText: distek,
                         url: link
                     }
                 }, 
                 {
                     quickReplyButton: {
                         displayText:retek,
                         id: id
                     }
                 }
                 ]
             }
         }
     }), { userJid: conn.user.jid, quoted: quoted});
     return await conn.relayMessage(
         jid,
         template.message,
         { messageId: template.key.id }
     )
    }
    conn.sendH3Button = async (jid, content, displayText, link, displayCall, number, quickReplyText, id, quickReplyText2, id2, quickReplyText3, id3, quoted) => {
		let template = generateWAMessageFromContent(jid, proto.Message.fromObject({
			         templateMessage: {
             hydratedTemplate: {
                 hydratedContentText: content,
                 hydratedButtons: [{
                     urlButton: {
                         displayText: displayText,
                         url: link
                     }
                 }, {
                     callButton: {
                         displayText: displayCall,
                         phoneNumber: number
                     }
                 },
                 {
             quickReplyButton: {
               displayText: quickReplyText,
               id: id,
             }

           },
               {
             quickReplyButton: {
               displayText: quickReplyText2,
               id: id2,
             }
           },
           {
             quickReplyButton: {
              displayText: quickReplyText3,
               id: id3,
            }
		   }]
         }
       }
     }), { userJid: conn.user.jid, quoted: quoted});
     return await conn.relayMessage(
         jid,
         template.message,
         { messageId: template.key.id }
     )
	}
    /**
    * sendGroupV4Invite
    * @param {String} jid 
    * @param {*} participant 
    * @param {String} inviteCode 
    * @param {Number} inviteExpiration 
    * @param {String} groupName 
    * @param {String} caption 
    * @param {*} options 
    * @returns 
    */
    conn.sendGroupV4Invite = async (jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', caption = 'Invitation to join my WhatsApp group', options = {}) => {
        let msg = proto.Message.fromObject({
            groupInviteMessage: proto.GroupInviteMessage.fromObject({
                inviteCode,
                inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
                groupJid: jid,
                groupName: groupName ? groupName : this.getName(jid),
                caption
            })
        })
        let message = await this.prepareMessageFromContent(participant, msg, options)
        await this.relayWAMessage(message)
        return message
    }

    /**
    *Message
    */
    conn.relayWAMessage = async (pesanfull) => {
        if (pesanfull.message.audioMessage) {
            await conn.sendPresenceUpdate('recording', pesanfull.key.remoteJid)
        } else {
            await conn.sendPresenceUpdate('composing', pesanfull.key.remoteJid)
        }
        var mekirim = await conn.relayMessage(pesanfull.key.remoteJid, pesanfull.message, { messageId: pesanfull.key.id })
        conn.ev.emit('messages.upsert', { messages: [pesanfull], type: 'append' });
        return mekirim
    }

    // const { generateWAMessageFromContent, proto } = require('@adiwajshing/baileys')
    // const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
    //     templateMessage: {
    //         hydratedTemplate: {
    //             hydratedContentText: 'Testing',
    //             hydratedButtons: [{
    //                 urlButton: {
    //                     displayText: 'test',
    //                     url: 'whatsapp://send?text=HI'
    //                 }
    //             }, {
    //                 callButton: {
    //                     displayText: 'call ...',
    //                     phoneNumber: '+62 8733'
    //                 }
    //             },
    //             {
    //                 quickReplyButton: {

    //                     displayText: 'Hii',
    //                     id: 'id1'
    //                 }
    //             }
    //             ]
    //         }
    //     }
    // }), { userJid: m.sender, quoted: m });
    // return await conn.relayMessage(
    //     m.chat,
    //     template.message,
    //     { messageId: template.key.id }
    // )
    // templateMessage: {
    //     hydratedTemplate: {
    //       hydratedContentText: text.trim(),
    //       hydratedButtons: [{
    //         urlButton: {
    //           displayText: 'RestApi',
    //           url: 'https://api.dhamzxploit.my.id'
    //         }

    //       },
    //           {
    //         callButton: {
    //           displayText: 'Call Me',
    //           phoneNumber: '+6285294959195'
    //         }
    //       },
    //           {
    //         quickReplyButton: {
    //           displayText: 'BUTTON 1 ',
    //           id: '.ping'
    //         }

    //       },
    //           {
    //         quickReplyButton: {
    //           displayText: 'BUTTON 2',
    //           id: '.ping'
    //         }

    //       },
    //           {
    //         quickReplyButton: {
    //           displayText: 'BUTTON 3',
    //           id: '.ping'
    //         }

    //       }]
    //     }
    //   }
    // }), { userJid: m.sender, quoted: m });
    // return await conn.relayMessage(
    //   m.chat,
    //   template.message,
    //   { messageId: template.key.id }
    // )
    
    /**
    * cMod
    * @param {String} jid 
    * @param {*} message 
    * @param {String} text 
    * @param {String} sender 
    * @param {*} options 
    * @returns 
    */
    conn.sendH3Button = async (jid, content, displayText, link, displayCall, number, quickReplyText, id, quickReplyText2, id2, quickReplyText3, id3, quoted) => {
		let template = generateWAMessageFromContent(jid, proto.Message.fromObject({
			         templateMessage: {
             hydratedTemplate: {
                 hydratedContentText: content,
                 hydratedButtons: [{
                     urlButton: {
                         displayText: displayText,
                         url: link
                     }
                 }, {
                     callButton: {
                         displayText: displayCall,
                         phoneNumber: number
                     }
                 },
                 {
             quickReplyButton: {
               displayText: quickReplyText,
               id: id,
             }

           },
               {
             quickReplyButton: {
               displayText: quickReplyText2,
               id: id2,
             }
           },
           {
             quickReplyButton: {
              displayText: quickReplyText3,
               id: id3,
            }
		   }]
         }
       }
     }), { userJid: conn.user.jid, quoted: quoted});
     return await conn.relayMessage(
         jid,
         template.message,
         { messageId: template.key.id }
     )
	}
	
    conn.cMod = (jid, message, text = '', sender = conn.user.jid, options = {}) => {
        let copy = message.toJSON()
        let mtype = Object.keys(copy.message)[0]
        let isEphemeral = false // mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
        let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text
        if (typeof content !== 'string') msg[mtype] = { ...content, ...options }
        if (copy.participant) sender = copy.participant = sender || copy.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
        copy.key.remoteJid = jid
        copy.key.fromMe = areJidsSameUser(sender, conn.user.id) || false
        return proto.WebMessageInfo.fromObject(copy)
    }
        conn.sendHButtonLoc = async (jid, buffer, content, footer, distek, link1, quick1, id1,quoted) => {
		let template = generateWAMessageFromContent(jid, proto.Message.fromObject({
			         templateMessage: {
             hydratedTemplate: {
                 hydratedContentText: content,
                 mentions: conn.parseMention(content + footer),
                 locationMessage: { 
                 jpegThumbnail: buffer },
                 hydratedFooterText: footer,
    mentions: conn.parseMention(content + footer),
                 hydratedButtons: [{
                     urlButton: {
                         displayText: distek,
                         url: link1
                     }
                 },  {
                     quickReplyButton: {
                         displayText:quick1,
                         id: id1
                     }
                 }],  mentions: conn.parseMention(content + footer)
             }
         }
     }), { userJid: conn.user.jid, quoted: quoted,     mentions: conn.parseMention(content + footer)});
     return await conn.relayMessage(
         jid,
         template.message,
         { messageId: template.key.id }
     )
	}

	conn.sendHButt = async (jid, content, distek, link, discall, number, retek, id,quoted) => {
		let template = generateWAMessageFromContent(jid, proto.Message.fromObject({
			         templateMessage: {
             hydratedTemplate: {
                 hydratedContentText: content,
                 hydratedButtons: [{
                     urlButton: {
                         displayText: distek,
                         url: link
                     }
                 }, {
                     callButton: {
                         displayText: discall,
                         phoneNumber: number
                     }
                 },
                 {
                     quickReplyButton: {
                         displayText:retek,
                         id: id
                     }
                 }
                 ]
             }
         }
     }), { userJid: conn.user.jid, quoted: quoted});
     return await conn.relayMessage(
         jid,
         template.message,
         { messageId: template.key.id }
     )
	}
	conn.sendButtonLoc= async (jid, buffer, content, footer, button1, row1, quoted, options = {}) => {
		let buttons = [{buttonId: row1, buttonText: {displayText: button1}, type: 1}]
		let buttonMessage = {
	location: { jpegThumbnail: buffer },
    caption: content,
    footer: footer,
    buttons: buttons,
    headerType: 6
}
      return await  conn.sendMessage(jid, buttonMessage, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
	}
	conn.send2ButtonLoc= async (jid, buffer, content, footer, button1, row1, button2, row2, quoted, options = {}) => {
		let buttons = [{buttonId: row1, buttonText: {displayText: button1}, type: 1},
		{ buttonId: row2, buttonText: { displayText: button2 }, type: 1 }]
		let buttonMessage = {
	location: { jpegThumbnail: buffer },
    caption: content,
    footer: footer,
    buttons: buttons,
    headerType: 6
}
      return await  conn.sendMessage(jid, buttonMessage, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
	}
		conn.send3ButtonLoc= async (jid, buffer, content, footer, button1, row1, button2, row2, quoted, options = {}) => {
		let buttons = [{buttonId: row1, buttonText: {displayText: button1}, type: 1},
		{ buttonId: row2, buttonText: { displayText: button2 }, type: 1 },
		 { buttonId: row3, buttonText: { displayText: button3 }, type: 1 }
        ]
		let buttonMessage = {
	location: { jpegThumbnail: buffer },
    caption: content,
    footer: footer,
    buttons: buttons,
    headerType: 6
}
      return await  conn.sendMessage(jid, buttonMessage, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
	}
    /**
     * Exact Copy Forward
     * @param {String} jid
     * @param {Object} message
     * @param {Boolean|Number} forwardingScore
     * @param {Object} options
     */
    conn.copyNForward = async (jid, message, forwardingScore = true, options = {}) => {
        let m = generateForwardMessageContent(message, !!forwardingScore)
        let mtype = Object.keys(m)[0]
        if (forwardingScore && typeof forwardingScore == 'number' && forwardingScore > 1) m[mtype].contextInfo.forwardingScore += forwardingScore
        m = generateWAMessageFromContent(jid, m, { ...options, userJid: conn.user.id })
        await conn.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options } })
        return m
    }
    /**
     * Download media message
     * @param {Object} m
     * @param {String} type 
     * @param {fs.PathLike|fs.promises.FileHandle} filename
     * @returns {Promise<fs.PathLike|fs.promises.FileHandle|Buffer>}
     */
    conn.downloadM = async (m, type, filename = '') => {
        if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
        const stream = await downloadContentFromMessage(m, type)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        if (filename) await fs.promises.writeFile(filename, buffer)
        return filename && fs.existsSync(filename) ? filename : buffer
    }

/**
    * isi
    */
    conn.rand = async (isi) => {
        return isi[Math.floor(Math.random() * isi.length)]
    }

    conn.trans = async (code, text) => {
        return tr(text, { from: 'id', to: code }).catch((_) => tr2(text, { from: 'id', to: code }))
    }
    /**
     * Read message
     * @param {String} jid 
     * @param {String|undefined|null} participant 
     * @param {String} messageID 
     */
    conn.chatRead = async (jid, participant, messageID) => {
        return await conn.sendReadReceipt(jid, participant, [messageID])
    }

    /**
     * Parses string into mentionedJid(s)
     * @param {String} text
     */
    conn.parseMention = (text = '') => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }

    /**
     * Get name from jid
     * @param {String} jid
     * @param {Boolean} withoutContact
     */
    conn.getName = (jid, withoutContact = false) => {
        jid = conn.decodeJid(jid)
        withoutContact = this.withoutContact || withoutContact
        let v
        if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
            v = conn.contacts[jid] || {}
            if (!(v.name || v.subject)) v = await conn.groupMetadata(jid) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = jid === '0@s.whatsapp.net' ? {
            jid,
            vname: 'WhatsApp'
        } : jid === conn.user.jid ?
            conn.user :
            (conn.contacts[jid] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

    conn.saveName = async (id, name = '') => {
        if (!id) return
        id = conn.decodeJid(id)
        let isGroup = id.endsWith('@g.us')
        if (id in conn.contacts && conn.contacts[id][isGroup ? 'subject' : 'name'] && id in conn.chats) return
        let metadata = {}
        if (isGroup) metadata = await conn.groupMetadata(id)
        let chat = { ...(conn.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc.toString(), metadata } : { name }) }
        conn.contacts[id] = chat
        conn.chats[id] = chat
    }

    conn.pushMessage = (m) => {
        if (['senderKeyDistributionMessage', 'protocolMessage'].includes(m.mtype)) return 
        let id = m.chat
        let chats = conn.chats[id]
        if (!chats) chats = { id }
        if (!chats.messages) chats.messages = {}
        chats.messages[m.id] = JSON.stringify(m, null, 2)
    }

    conn.getBusinessProfile = async (jid) => {
        const results = await conn.query({
            tag: 'iq',
            attrs: {
                to: 's.whatsapp.net',
                xmlns: 'w:biz',
                type: 'get'
            },
            content: [{
                tag: 'business_profile',
                attrs: { v: '244' },
                content: [{
                    tag: 'profile',
                    attrs: { jid }
                }]
            }]
        })
        const profiles = getBinaryNodeChild(getBinaryNodeChild(results, 'business_profile'), 'profile')
        if (!profiles) return {} // if not bussines
        const address = getBinaryNodeChild(profiles, 'address')
        const description = getBinaryNodeChild(profiles, 'description')
        const website = getBinaryNodeChild(profiles, 'website')
        const email = getBinaryNodeChild(profiles, 'email')
        const category = getBinaryNodeChild(getBinaryNodeChild(profiles, 'categories'), 'category')
        return {
            jid: profiles.attrs?.jid,
            address: address?.content.toString(),
            description: description?.content.toString(),
            website: website?.content.toString(),
            email: email?.content.toString(),
            category: category?.content.toString(),
        }
    }
    /**
     * Serialize Message, so it easier to manipulate
     * @param {Object} m
     */
    conn.serializeM = (m) => {
        return exports.smsg(conn, m)
    }

    Object.defineProperty(conn, 'name', {
        value: 'WASocket',
        configurable: true,
    })
    return conn
}
/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {Boolean} hasParent 
 */
exports.smsg = (conn, m, hasParent) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id && m.id.length === 16 || false
        m.chat = conn.decodeJid(m.key.remoteJid || m.msg && m.msg.groupId || '')
        m.isGroup = m.chat.endsWith('@g.us')
        m.fromMe = m.key.fromMe
        m.sender = conn.decodeJid(m.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
    }
    if (m.message) {
        m.mtype = Object.keys(m.message)[0]
        m.msg = m.message[m.mtype]
        if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = m.sender
        // if (m.mtype === 'ephemeralMessage') {
        //     exports.smsg(conn, m.msg)
        //     m.mtype = m.msg.mtype
        //     m.msg = m.msg.msg
        //   }
        if (m.mtype == 'protocolMessage') {
            if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
            if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
            m.msg.key.fromMe = conn.decodeJid(m.msg.key.participant) === conn.decodeJid(conn.user.id)
            if (!m.msg.key.fromMe && m.msg.key.remoteJid === conn.decodeJid(conn.user.id)) m.msg.key.remoteJid = m.sender
        }
        m.text = m.msg.text || m.msg.caption || m.msg.contentText || m.msg || ''
        m.mentionedJid = m.msg && m.msg.contextInfo && m.msg.contextInfo.mentionedJid && m.msg.contextInfo.mentionedJid.length && m.msg.contextInfo.mentionedJid || []
        let quoted = m.quoted = m.msg && m.msg.contextInfo && m.msg.contextInfo.quotedMessage ? m.msg.contextInfo.quotedMessage : null
        if (m.quoted) {
            let type = Object.keys(m.quoted)[0]
            m.quoted = m.quoted[type]
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = conn.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
            m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
            m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
            m.quoted.fromMe = m.quoted.sender === conn.user.jid
            m.quoted.text = m.quoted.text || m.quoted.caption || ''
            m.quoted.mentionedJid = m.quoted.contextInfo && m.quoted.contextInfo.mentionedJid && m.quoted.contextInfo.mentionedJid.length && m.quoted.contextInfo.mentionedJid || []
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    fromMe: m.quoted.fromMe,
                    remoteJid: m.quoted.chat,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })
            m.getQuotedObj = m.getQuotedMessage = () => {
                if (!m.quoted.id) return false
                let q = ((conn.chats[m.quoted.chat] || {}).messages || {})[m.quoted.id]
                return exports.smsg(conn, q ? q : vM)
            }

            if (m.quoted.url || m.quoted.directPath) m.quoted.download = () => conn.downloadM(m.quoted, m.quoted.mtype.toLowerCase().replace(/message/i, ''))

            /**
             * Reply to quoted message
             * @param {String|Object} text
             * @param {String|false} chatId
             * @param {Object} options
             */
            m.quoted.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, vM, options)

            /**
             * Copy quoted message
             */
            m.quoted.copy = () => exports.smsg(conn, M.fromObject(M.toObject(vM)))

            /**
             * Exact Forward quoted message
             * @param {String} jid
             * @param {Boolean|Number} forceForward
             * @param {Object} options
            */
            m.quoted.copyNForward = (jid, forceForward = true, options = {}) => conn.copyNForward(jid, vM, forceForward, options)

            /**
             * Delete quoted message
             */
            m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })
        }
    }
    m.name = m.pushName || conn.getName(m.sender)
    if (m.msg && m.msg.url) m.download = () => conn.downloadM(m.msg, m.mtype.toLowerCase().replace(/message/i, ''))
    /**
     * Reply to this message
     * @param {String|Object} text
     * @param {String|false} chatId
     * @param {Object} options
     */
    m.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, m, options)

    /**
     * Exact Forward this message
     * @param {String} jid
     * @param {Boolean} forceForward
     * @param {Object} options
     */
    m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => conn.copyNForward(jid, m, forceForward, options)

    /**
     * Modify this Message
     * @param {String} jid 
     * @param {String} text 
     * @param {String} sender 
     * @param {Object} options 
     */
    m.cMod = (jid, text = '', sender = m.sender, options = {}) => conn.cMod(jid, m, text, sender, options)

    /**
     * Delete this message
     */
    m.delete = () => conn.sendMessage(m.chat, { delete: m.key })

    try {
        conn.saveName(m.sender, m.name)
        conn.pushMessage(m)
        if (m.isGroup) conn.saveName(m.chat)
        if (m.msg && m.mtype == 'protocolMessage') conn.ev.emit('message.delete', m.msg.key)
    } catch (e) {
        console.error(e)
    }
    return m
}

exports.logic = (check, inp, out) => {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}
async function
generateProfilePicture(buffer) {
  const jimp = await jimp_1.read(buffer)
  const min = jimp.getWidth()
  const max = jimp.getHeight()
  const cropped = jimp.crop(0, 0, min, max)
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
  }
}
