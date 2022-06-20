let { MessageType } = require('@adiwajshing/baileys')
//let handler = m => m
//handler.before = m => {
let handler = async (m, { conn }) => { 
/*
let test =`
┌─〔 *APIKEY FREE* 〕
├➥ *Bany :* adadeh
├➥ *leyscoders:* MIMINGANZ
├➥ *xteam:* MIMINETBOT
├➥ *Videfikri:* no apikey
├➥ *Caliph:* FreeApi
├➥ *Zeks:* apivinz
├➥ *OnlyDevCity:* PunyaIkyAds
├➥ *Tobs-api:* BotWeA
├➥ *shizukaa:* itsmeiky633
├➥ *vhtear:* LoliHunter
├➥ *ZeksApi* = PmzFe9Hq4xYdwha6pxiXd9jgLnh
├➥ *LeysKey* = MNQYOVSL
├➥ *apixteam* = 7415bc4287ad5ca8
├➥ *apiKey* = 7ed90d537ab5edddb6ba6465
├➥ *LolKey* = Danwfrostkey
├➥ *odckey* = onlygay
├➥ *onlydev* = PunyaIkyAds
├➥ *xteam* = AbilGanss
├➥ *BarBarKey* = IDxO1TFYnKADlX4pxcHa
├➥ *AbilGanssVhtearKey* = 1BlnApiIkyPake
├➥ *xteamkey* = AbilGanss
├➥ *TobzKey* = Bidmzz1sJ2L1TKyqaMEU
├➥ *ApiDevolover* = HokageBR
├➥ *TechApi* = 5BNIDH-1T0kPj-gWqG6q-sHtuHA-AWBSgZ
├➥ *Zeksapi* = apivinz
├➥ *shizukaapi* = itsmeiky633
├➥ *apivhtear* = 1BlnApiIkyPake
┃ 「 *Pesan Dari My Owner* 」
┃ > *Trimakasih Telah Membantu*
┃ *Jalanya Bot Ini :)*
┗━━━━━━━━━━━━━━━━
`.trim() // Tambah sendiri kalo mau*/

//conn.sendButton(m.chat, test, wm, '⋮☰ Menu', '.menu', m)
  
  let buttons = [
{buttonId: '.inv', buttonText: {displayText: 'Inventory'}, type: 1}, 
]
const buttonMessage = {
    contentText: `\nSepertinya Anda Sudah Kecapekan Silahkan Istirahat Dulu sekitar\n🕔 **`,
    footerText: wm2, 
    buttons: buttons,
    headerType: 1
}
//conn.reply(test)  
}
handler.help = ['apikey']
handler.tags = ['info']
handler.command = /^apikey$/i
handler.rowner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = false

module.exports = handler
