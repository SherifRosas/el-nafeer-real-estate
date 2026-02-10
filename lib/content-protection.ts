'use client'

export function enableContentProtection() {
  if (typeof window === 'undefined') return

  // Only enable protection on job advertisement page (not admin pages)
  const isAdminPage = window.location.pathname.startsWith('/admin')
  if (isAdminPage) {
    return // Don't enable protection on admin pages
  }

  // Disable copy
  const handleCopy = (e: ClipboardEvent) => {
    e.preventDefault()
    return false
  }

  // Disable paste
  const handlePaste = (e: ClipboardEvent) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return
    }
    e.preventDefault()
    return false
  }

  // Disable keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'a')) {
      const target = e.target as HTMLElement
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        return false
      }
    }
  }

  // Disable right-click
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    return false
  }

  const handleSelectStart = (e: Event) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return
    }
    e.preventDefault()
    return false
  }

  document.addEventListener('copy', handleCopy)
  document.addEventListener('paste', handlePaste)
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('contextmenu', handleContextMenu)
  document.addEventListener('selectstart', handleSelectStart, { passive: false })

  const style = document.createElement('style')
  style.id = 'job-ad-content-protection'
  style.textContent = `
    body:not(.admin-page) *:not(input):not(textarea):not(select) {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
    
    input, textarea, select {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
    }
    
    /* Cyber HQ Watermark */
    body::before {
      content: 'EL-NAFEER_AI_ENCRYPTION_ACTIVE';
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 4rem;
      font-weight: 900;
      color: rgba(6, 182, 212, 0.03);
      pointer-events: none;
      z-index: 1;
      user-select: none;
      letter-spacing: 0.5em;
      white-space: nowrap;
    }

    /* Subtle Scanlines overlay */
    body::after {
      content: "";
      position: fixed;
      inset: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
      background-size: 100% 4px, 3px 100%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.1;
    }
  `
  document.head.appendChild(style)

  return () => {
    document.removeEventListener('copy', handleCopy)
    document.removeEventListener('paste', handlePaste)
    document.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('contextmenu', handleContextMenu)
    document.removeEventListener('selectstart', handleSelectStart)
    const styleElement = document.getElementById('job-ad-content-protection')
    if (styleElement) {
      styleElement.remove()
    }
  }
}


