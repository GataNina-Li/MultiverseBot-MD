
  let form = new FormData()
  form.append('action', 'wsmd_user_download_request')
  form.append('link', encodeURI(url))
  form.append('requestlink', 'https://video-converter-mp4.com/fb-downloader/')
  form.append('deftab', 'video')
  let res = await fetch('https://video-converter-mp4.com/wp-admin/admin-ajax.php', {
    method: 'POST',
    headers: { ...headers, ...form.getHeaders() },
    body: form
  })
 handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^f((b|acebook)(dl|download)?(er)?)$/i

module.exports = handler
