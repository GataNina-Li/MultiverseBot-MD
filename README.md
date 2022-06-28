> #### Versión Multiverse: 1.0.7 ✨
# MultiverseBot-MD
<p align="center">
<img src="https://i.ibb.co/GMgbjCt/IMG-20220622-WA0001.jpg" width="700" height="300"/>
</p>

>
>
>
</div>
<p align="center">
  <a href="https://github.com/GataNina-Li"><img title="GitHub" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://www.instagram.com/gata_dios"><img title="Instagram" src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a>
  <a href="https://youtube.com/channel/UCpNU4eY7eiI0ve05CssjdbA"><img title="YouTube" src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" /></a>
  <h4 align="center">
  <a
</h4>
</p>

# Obtener sesión
### 👉 <a href="https://replit.com/@GataNina-Li/Session-Md?lita=1&outputonly=1#.replit"><img title="Session" src="https://blog.replit.com/images/logo.png" width="90" /></a> 

# Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/GataNina-Li/MultiverseBot-MD)

# Añada lo siguente al Buildpack
```bash
> heroku/nodejs
```
```bash
> https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
```
```bash
> https://github.com/mcollina/heroku-buildpack-imagemagick
```
------------------
- [x] Resultado <details><summary>Buildpack</summary><img src="https://i.imgur.com/kPtMtP3.jpeg"></details>
------------------

# TERMUX
### INSTALAR DE UNO POR UNO PARA EVITAR UN ERROR
```bash
$ termux-setup-storage
$ pkg update && pkg upgrade
$ pkg install git -y
$ pkg install nodejs -y
$ pkg install ffmpeg -y
$ pkg install imagemagick -y
$ pkg install yarn
$ git clone https://github.com/GataNina-Li/MultiverseBot-MD
$ cd MultiverseBot-MD
$ yarn
$ npm install
$ npm update
$ node .
```
----
## 💻 PARA USUARIOS DE WINDOWS/VPS/RDP (Opcional)

* Descargar e instala Git [`Aquí`](https://git-scm.com/downloads)
* Descargar e instala NodeJS [`Aquí`](https://nodejs.org/en/download)
* Descargar e instala FFmpeg [`Aquí`](https://ffmpeg.org/download.html) (**No olvide agregar FFmpeg a la variable de entorno PATH**)
* Descargar e instala ImageMagick [`Aquí`](https://imagemagick.org/script/download.php)
* Descargar e instala Yarn [`Aquí`](https://classic.yarnpkg.com/en/docs/install#windows-stable)

```bash
git clone https://github.com/GataNina-Li/MultiverseBot-MD
cd MultiverseBot-MD
npm install
npm update
npm index
```

## 💻 Instalación de FFmpeg para Windows 
* Descarga cualquiera de las versiones de FFmpeg disponibles haciendo clic en [FFmpeg](https://www.gyan.dev/ffmpeg/builds/).
* Extraer archivos a `C:\` path.
* Cambie el nombre de la carpeta extraída a `ffmpeg`.
* Ejecute el símbolo del sistema como administrador.
* Ejecute el siguiente comando:
```cmd
> setx /m PATH "C:\ffmpeg\bin;%PATH%"
```
Si tiene éxito, le dará un mensaje como: `SUCCESS: specified value was saved`.
* Ahora que tiene FFmpeg instalado, verifique que funcionó ejecutando este comando para ver la versión:
```cmd
> ffmpeg -version
```
----
## ⚙ Configuracion de la visualización del menú.
### Visualización del menú GIF
```ts
 let message = await prepareWAMessageMedia({ video: fs.readFileSync('./media/menu.mp4'), gifPlayback: true }, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           videoMessage: message.videoMessage,
           hydratedContentText: text.trim(),
           hydratedFooterText: wm,
           hydratedButtons: [{
```

### Visualización del menú con imagen
```ts
let message = await prepareWAMessageMedia({ image: fs.readFileSync('./media/elyas.jpg')}, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           imageMessage: message.imageMessage,
           hydratedContentText: text.trim(),
           hydratedFooterText: wm,
           hydratedButtons: [{
```

### Visualización del menú con ubicación
```ts
 const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: text.trim(),
           locationMessage: { 
           jpegThumbnail: fs.readFileSync('./media/elyas.jpg') },
           hydratedFooterText: wm,
           hydratedButtons: [{       
```

### Visualización del menú con vídeo
```ts
let message = await prepareWAMessageMedia({ video: fs.readFileSync('./media/menu.mp4')}, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           videoMessage: message.videoMessage,
           hydratedContentText: text.trim(),
           hydratedFooterText: wm,
           hydratedButtons: [{           	
```
----- 
### Multiverse - Preguntas

* Cómo detengo el Bot en Termux?
> Use CTRL + z para apagar el Bot

* Cómo enciendo el Bot en termux?
> En caso que vuelva a iniciar en termux use este comando ```cd MultiverseBot-MD && node .```
En caso que este Apagado el Bot sin salir de la carpeta del Bot, use este comando ```node .```

* Que hago si quiero volver a clonar el Bot?
> En caso que quiera eliminar la carpeta del Bot y volver a clonar use este comando ```rm -rf MultiverseBot-MD && git clone https://github.com/GataNina-Li/MultiverseBot-MD && cd MultiverseBot-MD && yarn && npm install && node .``` Esta acción también sirve en caso que quiera Actualizar a la última versión 

* Cómo puedo borrar la Session?
> Ejecute este comando en Termux ```rm -rf multiverse.data.json```
En caso que no tenga nada en el terminar puede usar este comando ```cd MultiverseBot-MD && rm -rf multiverse.data.json``` luego use ```node .``` para obtener un nuevo código QR

* Cómo puedo hacer el Bot Owner?
> Debe de ingresar al archivo `config.js` o también [`Aquí`](https://github.com/GataNina-Li/MultiverseBot-MD/blob/master/config.js) luego añadir su número en donde diga `global.owner` Recuerde que requiere de hacer una Bifurcación, puede hacerla [`Aquí`](https://github.com/GataNina-Li/MultiverseBot-MD/fork)

----- 
### 🌟 DESARROLLADORES
[![Hyzer](https://github.com/GataNina-Li.png?size=100)](https://github.com/GataNina-Li)
[![Hyzer](https://github.com/Abiguelreyes75.png?size=100)](https://github.com/Abiguelreyes75)
[![Hyzer](https://github.com/Sofianayeli.png?size=100)](https://github.com/Sofianayeli)
[![ADOLFO](https://github.com/Adolfo-crazy.png?size=100)](https://github.com/Adolfo-crazy)

### 🌟 AGRADECIMIENTOS
[![Hyzer](https://github.com/Hyzerr.png?size=100)](https://github.com/Hyzerr)
[![Ilman](https://github.com/ilmanhdyt.png?size=100)](https://github.com/ilmanhdyt)
[![Nurutomo](https://github.com/Nurutomo.png?size=100)](https://github.com/Nurutomo)
[![Ariffb](https://github.com/ariffb25.png?size=100)](https://github.com/ariffb25)
[![𝐀𝐃𝐎𝐋𝐅𝐎](https://github.com/Paquito1923.png?size=100)](https://github.com/Paquito1923)
