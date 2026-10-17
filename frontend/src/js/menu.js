export function setupMenu() {
  const navigationToggle = document.querySelector('#navigation-toggle')
  const navigationIcon = document.querySelector('#navigation-toggle-icon')
  const navigation = document.querySelector('#navigation')
  const mobileViewport = window.matchMedia('(max-width: 760px)')

  function setMenuOpen(isOpen) {
    navigation.classList.toggle('navigation-open', isOpen)
    navigationToggle.setAttribute('aria-expanded', String(isOpen))
    navigationToggle.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation' : 'Open navigation'
    )
    navigationIcon.textContent = isOpen ? '✕' : '☰'
  }

  navigationToggle.addEventListener('click', () => {
    const isOpen = navigationToggle.getAttribute('aria-expanded') === 'true'
    setMenuOpen(!isOpen)
  })

  // Keep native anchor scrolling, then collapse the mobile links.
  navigation.addEventListener('click', (event) => {
    if (mobileViewport.matches && event.target.closest('a')) {
      setMenuOpen(false)
      navigationToggle.focus({ preventScroll: true })
    }
  })

  document.addEventListener('keydown', (event) => {
    const isOpen = navigationToggle.getAttribute('aria-expanded') === 'true'
    if (event.key === 'Escape' && isOpen) {
      setMenuOpen(false)
      navigationToggle.focus({ preventScroll: true })
    }
  })

  // Reset the dropdown when switching between mobile and desktop layouts.
  mobileViewport.addEventListener('change', () => {
    const focusedElement = document.activeElement
    setMenuOpen(false)

    if (mobileViewport.matches && navigation.contains(focusedElement)) {
      navigationToggle.focus({ preventScroll: true })
    } else if (!mobileViewport.matches && focusedElement === navigationToggle) {
      navigation.querySelector('a').focus({ preventScroll: true })
    }
  })
}
