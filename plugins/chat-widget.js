export default function () {
  if (process.env.NODE_ENV === 'production' && process.client) {
    const script = document.createElement('script')
    script.src = 'https://cdn5.helpdeskeddy.com/js/modules/chat_widget/hde.js'
    script.setAttribute('data-lang', 'ru')
    script.setAttribute('id', 'hde-chat-widget')
    script.setAttribute('data-host', 'ekf.helpdeskeddy.com')
    script.setAttribute('data-position', 'bottom-right')
    script.defer = true

    document.body.appendChild(script)
  }
}
