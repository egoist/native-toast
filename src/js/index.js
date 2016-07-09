let prevToast = null

class Toast {
  constructor({
    message = '',
    position = 'bottom',
    timeout = 3000,
    el = document.body,
    square = false
  } = {}) {
    if (prevToast) {
      prevToast.destroy()
    }

    this.message = message
    this.position = position
    this.el = el
    this.timeout = timeout

    this.toast = document.createElement('div')
    this.toast.className = `native-toast native-toast-${this.position}`
    this.toast.innerHTML = this.message

    if (square) {
      this.toast.style.borderRadius = '3px'
    }

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

function toast(message, position, timeout) {
  if (typeof message === 'string') {
    return new Toast({
      message,
      position,
      timeout
    })
  } else {
    return new Toast(message)
  }
}

export default toast
