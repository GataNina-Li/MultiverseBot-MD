let handler = async (m, { conn }) => {
m.reply(conn.sendBut(m.chat, 
`termux-setup-storage

pkg update && pkg upgrade

pkg install git -y

pkg install nodejs -y

pkg install ffmpeg -y

pkg install imagemagick -y

pkg install yarn

git clone https://github.com/GataNina-Li/MultiverseBot-MD

cd MultiverseBot-MD

yarn

npm install

npm update

node .`, wm, `✨ 𝗠𝗘𝗡𝗨`, '.menu',  m))

}
handler.help = ['listaban | listban',]
handler.tags = ['info']
handler.command = /^codigo$/i
//handler.owner = false
module.exports = handler
