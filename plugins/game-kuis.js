/*global.kuis = global.kuis ? global.kuis : {}
let handler  = async (m, { conn, usedPrefix }) => {

  let id = m.chat
  if (id in global.kuis) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', global.kuis[id][0])
  global.kuis[id] = [
    await conn.reply(m.chat,`「 KUIS 」\n\nPertanyaan :\n${pickRandom(global.kuis)}\n\nWaktu : 30.00 Detik\nBonus : 5000 XP`, m),
    kuis, 4,
    setTimeout(() => {
      if (global.kuis[id]) conn.sendBut(m.chat, `Waktu habis!\n\nCoba Lagi Lain Waktu`, wm, 'Kuis', '.kuis', m)
      delete global.kuis[id]
    }, 30000)
  ]
}
handler.help = ['kuis']
handler.tags = ['game', 'update']
handler.command = /^(kuis)$/i
handler.owner = false
handler.mods = false
handler.off = true
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false
handler.limit = true
handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.kuis = [
'Pemain bola apa yang beratnya 3 kg?',
'Penyanyi luar negeri yang suka sepeda’an ?',
'Penyanyi yang rambutnya gak lurus?',
'Penyanyi luar negeri yang asli Indonesia?',
'Penyanyi luar negeri yang susah nelen?',
'Penyanyi yang sering gak sadar diri?',
'Gubernur apa yang suka nyanyi?',
'Wakil presiden yang sering nonton streaming?',
'Mengapa motor berhenti di depan lampu merah?',
'Tebak binatang apa yang jago renang?',
'Kenapa di rel kereta api ditaruh batu?',
'Cuaca sedang mendung. Ada 5 orang tapi hanya ada 1 payung. Bagaimana caranya agar mereka semua tidak kehujanan?',
'Ayam apa yang bikin sebel?',
'Kenapa di komputer ada tulisan ENTER?',
'Kunci apa yang bisa bikin orang joget?',
'Benda kecil apa yang bisa ngeluarin orang?',
'Belajar bahasa Mandarin, lantai basah artinya apa?',
'Apa jenis kutu yang amat mengerikan?',
'Apa warnanya angin?',
'Benda apa keluar ketika diputar?',
'Malam apa yang sangat mengerikan dan menakutkan?',
'Ada orang sedang mencari sesuatu, datang bersih pulang babak belur. Apa yang sebenanya dia cari?',
'Terjemahkan ke dalam bahasa jepang tidak ada uang?',
'Benda apa yang huruf depannya K belakangnya L. Sedang bila ditarik keras, kalau dilepas lemas?',
'Mengapa mobil dan motor berhenti ketika lampu sedang berwarna merah?',
'Banyak dijauhi orang padahal kulitnya berwarna putih?',
'Apa alasan ninja memakai kain untuk penutup kepala?',
'Apa alasan pohon kelapa di depan rumah wajib ditebang?',
'Jika tidur maka dia bangun. Bila bangun, dia tidur?',
'Penyakit apa yang suka banget diperlihara manusia?',
'Monyet apa yang paling nyebelin?',
'Apa bedanya kamu dengan lukisan?',
'Apa bedanya kalo jam 12:00 sama kamu?',
'Bis apa yang paling membahagiakan?',
'Setan apa yang paling romantis?',
'Cecak apa yang bisa bikin aku mati?',
'Kopi apa yang paling pahit?',
'Rel apa yang paling sakit?',
'Tiang apa yang enak?',
'Tau gak kenapa menara pisa miring ?',
'Susu apa yang indah?',
'Apa Kepanjangan dari Jumat?',
'Awan apa yang bikin seneng?',
'Buah apa yang paling kaya?',
'Apa itu Cemilan?',
'Telur sama Ayam duluan mana?',
'Telur sama Ayam duluan mana?',
'Telur sama Ayam duluan mana?',
'Nembaknya ke lantai tapi yang kena hidung, apakah itu?',
'Tentara apa yang paling kecil?',
'Apa persamaannya uang dan rahasia?',
'Apa bedanya matahari dengan bulan?',
'Apa bahasa Jepangnya Saya dicopet?',
'Lemari yang bisa masuk kantong?',
'Bebek apa yang jalannya muter ke kiri terus?',
'Ada ayam lima, dikali dua. Berapa semuanya?',
'Kalau saja ada sekolah yang berisi semua jenis hewan, siapa yang sering terlambat?',
'Kaki seribu kalau belok kiri kakinya berapa?',
'Ditutup jadi tongkat, dibuka jadi tenda. Apakah itu?',
'Orang apa yang berenang tapi rambutnya tak pernah basah?',
'Bila gajah jadi ayam, lalu singa jadi ayam, dan kambing jadi ayam, maka ayam jadi apa?',
'Apa perbedaan aksi dengan demo?',
'Apa huruf kelima dalam abjad?',
'Pesawat jatuh, kapal tenggelam, munculnya di mana?',
'Apa bedanya sepatu sama jengkol?',
'Mana yang lebih berat, kapas 100 kg atau besi 100 kg?',
'Ditengah sawah ada apa?',
]*/


global.kuis = global.kuis ? global.kuis : {}
let handler  = async (m, { conn, usedPrefix }) => {

  let id = m.chat
  if (id in global.kuis) return conn.reply(m.chat, 'Todavía hay preguntas sin respuesta en este chat.', global.kuis[id][0])
  global.kuis[id] = [
    await conn.reply(m.chat,`「 PRUEBA 」\n\nPregunta :\n${pickRandom(global.kuis)}\n\nTiempo : 30.00 Segundo\nBonus : 5000 XP`, m),
    kuis, 4,
    setTimeout(() => {
      if (global.kuis[id]) conn.sendBut(m.chat, `el tiempo se ha acabado!\n\nInténtalo de nuevo la próxima vez`, wm, 'Prueba', '.kuis', m)
      delete global.kuis[id]
    }, 30000)
  ]
}
handler.help = ['kuis']
handler.tags = ['game', 'update']
handler.command = /^(kuis)$/i
handler.owner = false
handler.mods = false
handler.off = true
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false
handler.limit = true
handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.kuis = [
'¿Qué jugador de fútbol pesa 3 kg?', '¿Un cantante extranjero al que le gustan las bicicletas?', '¿La cantante cuyo cabello no es lacio?', '¿Cantantes extranjeros nativos de Indonesia?', '¿Cantantes extranjeros que son difíciles de tragar?', '¿Un cantante que a menudo es tímido?', '¿A qué gobernador le gusta cantar?', '¿El vicepresidente que suele ver streaming?', '¿Por qué la moto se detiene en un semáforo en rojo?', '¿Adivina qué animal es bueno para nadar?', '¿Por qué se ponen piedras en las vías del tren?', 'Está nublado. Hay 5 personas pero solo hay 1 paraguas. ¿Cómo evitas que les llueva encima?', '¿Qué tipo de pollo es molesto?', '¿Por qué la computadora dice ENTER?', '¿Qué tecla puede hacer bailar a la gente?', '¿Qué cosita puede noquear a la gente?', 'Aprende mandarín, piso mojado, ¿qué significa?', '¿Qué tipo de pulga es tan terrible?', '¿De qué color es el viento?', '¿Qué cosa sale cuando se gira?', '¿Qué noche fue tan terrible y aterradora?', 'Alguien estaba buscando algo, salió limpio y volvió a casa maltratado. ¿Qué está buscando realmente?', '¿Traducir al japonés sin dinero?', '¿Qué tipo de cosa tiene la primera letra K y la parte de atrás es L. Si tiras con fuerza, cojeará cuando la sueltes?', '¿Por qué los coches y las motos se detienen cuando el semáforo está en rojo?', '¿Muchas personas evitan a pesar de que su piel es blanca?', '¿Cuál es la razón por la que los ninjas usan tela para cubrirse la cabeza?', '¿Cuál es la razón por la cual se debe cortar el cocotero frente a la casa?', 'Si se duerme, entonces se despierta. ¿Cuando se despierta, se duerme?', '¿Qué enfermedad les encanta cuidar a los humanos?', '¿Qué mono es el más molesto?', '¿Cuál es la diferencia entre tú y una pintura?', '¿Cuál es la diferencia entre las 12:00 y tú?', '¿Qué autobús es el más feliz?', '¿Qué diablo es el más romántico?', '¿Qué lagarto puede hacerme morir?', '¿Qué café es el más amargo?', '¿Qué barandilla duele más?', '¿Qué polo es delicioso?', '¿Sabes por qué la Torre Inclinada de Pisa?', '¿Qué leche es hermosa?', '¿Qué significa viernes?', '¿Qué nubes te hacen feliz?', '¿Cuál es la fruta más rica?', '¿Qué es un bocadillo?', '¿Qué fue primero con el pollo?', '¿Qué fue primero con el pollo?', '¿Qué fue primero con el pollo?', 'La tiró al piso pero la que le dio en la nariz, ¿qué fue eso?', '¿Qué ejército es el más pequeño?', '¿Qué tienen en común el dinero y los secretos?', '¿Cuál es la diferencia entre el sol y la luna?', '¿Qué dice en japonés que me recogieron?', '¿Un armario que pueda caber en un bolsillo?', '¿Qué pato sigue girando a izquierda y derecha?', 'Hay cinco pollos, multiplicado por dos. ¿Cuánto es el total?', 'Si tan solo hubiera una escuela que contuviera todo tipo de animales, ¿quién llegaba tarde a menudo?', 'Millones de pies si giras a la izquierda, ¿cuántos pies?', 'Cerrado como un palo, abierto en una tienda. ¿Que es eso?', '¿Qué persona nada pero nunca se moja el pelo?', 'Si un elefante se convierte en pollo, luego un león se convierte en pollo, y una cabra se convierte en pollo, entonces, ¿qué es un pollo?', '¿Cuál es la diferencia entre acción y demostración?', '¿Cuál es la quinta letra del alfabeto?', 'Avión estrellado, barco hundido, ¿dónde apareció?', '¿Cuál es la diferencia entre zapatos y jengkol?', '¿Qué pesa más, 100 kg de algodón o 100 kg de hierro?', '¿Qué hay en medio del campo de arroz?',
]
