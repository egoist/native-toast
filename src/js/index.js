import assign from 'nano-assign'

let prevToast = null

const icons = {
  warning: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>`,
  success: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  info: `<svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.25%"><path d="M16 14 L16 23 M16 8 L16 10" /><circle cx="16" cy="16" r="14" /></svg>`,
  error: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></svg>`
}

class Toast {
  constructor({
    message = '',
    position = 'south-east',
    timeout = 3000,
    el = document.body,
    rounded = false,
    type = '',
    debug = false,
    edge = false,
    icon = true,
    closeOnClick = false,
    elements = []
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

    const messageElement = document.createElement('div')
    messageElement.className = 'native-toast-message'
    messageElement.innerHTML = this.message

    ;[messageElement, ...elements].forEach(el => {
      this.toast.appendChild(el)
    })

    const isMobile = document.body.clientWidth < 768
    if (edge || isMobile) {
      this.toast.className += ' native-toast-edge'
    } else if (rounded) {
      this.toast.style.borderRadius = '33px'
    }

    this.el.appendChild(this.toast)

    prevToast = this

    this.show()
    if (!debug && timeout) {
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

