let prevToast = null

class Toast {
  constructor({
    message = '',
    position = 'bottom',
    timeout = 3000
  } = {}) {
    if (prevToast) {
      prevToast.destroy()
    }

    this.message = message
    this.position = position
    this.el = document.body
    this.timeout = timeout

    this.toast = document.createElement('div')
    this.toast.className = `native-toast native-toast-${this.position}`
    this.toast.innerHTML = this.message

    this.el.appendChild(this.toast)

    prevToast = this

    this.show()
    this.hide()
  }

  show() {
    setTimeout(() => {
      this.toast.classList.add('native-toast-shown')
    }, 300)
  }

  hide() {
    setTimeout(() => {
      this.destroy()
    }, this.timeout)
  }

  destroy() {
    if (!this.toast) return
    else this.toast.classList.remove('native-toast-shown')

    setTimeout(() => {
      this.el.removeChild(this.toast)
      this.toast = null
    }, 300)
  }
}

function toast(message, position) {
  if (typeof message === 'string') {
    return new Toast({
      message,
      position
    })
  } else {
    return new Toast(message)
  }

}

export default toast
