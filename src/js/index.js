import assign from 'nano-assign'

let prevToast = null

const icons = {
  warning: `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%"><path d="M8 17 C8 12 9 6 16 6 23 6 24 12 24 17 24 22 27 25 27 25 L5 25 C5 25 8 22 8 17 Z M20 25 C20 25 20 29 16 29 12 29 12 25 12 25 M16 3 L16 6" /></svg>`,
  success: `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%"><path d="M2 20 L12 28 30 4" /></svg>`,
  info: `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%"><path d="M16 14 L16 23 M16 8 L16 10" /><circle cx="16" cy="16" r="14" /></svg>`,
  error: `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%"><path d="M16 3 L30 29 2 29 Z M16 11 L16 19 M16 23 L16 25" /></svg>`
}

class Toast {
  constructor({
    message = '',
    position = 'bottom',
    timeout = 3000,
    el = document.body,
    square = false,
    type = '',
    debug = false,
    edge = false,
    icon = true,
    closeOnClick = false
  } = {}) {
    if (prevToast) {
      prevToast.destroy()
    }

    this.message = message
    this.position = position
    this.el = el
    this.timeout = timeout
    this.closeOnClick = closeOnClick

    this.toast = document.createElement('div')
    this.toast.className = `native-toast native-toast-${this.position}`

    if (type) {
      this.toast.className += ` native-toast-${type}`

      if (icon) {
        this.message = `<span class="native-toast-icon-${type}">${icons[type] || ''}</span>${this.message}`
      }
    }

    this.toast.innerHTML = this.message

    if (edge) {
      this.toast.className += ' native-toast-edge'
    } else if (square) {
      this.toast.style.borderRadius = '3px'
    }

    this.el.appendChild(this.toast)

    prevToast = this

    this.show()
    if (!debug && timeout > 0) {
      this.hide()
    }

    if (this.closeOnClick) {
      this.toast.addEventListener('click', () => {
        this.destroy()
      })
    }
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

    this.toast.classList.remove('native-toast-shown')

    setTimeout(() => {
      if (this.toast) {
        this.el.removeChild(this.toast)
        this.toast = null
      }
    }, 300)
  }
}

function toast(options) {
  return new Toast(options)
}

for (const type of ['success', 'info', 'warning', 'error']) {
  toast[type] = options => toast(assign({type}, options))
}

export default toast

