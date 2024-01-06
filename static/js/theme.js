(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const html = document.querySelector('html');
    const sun = document.querySelector('nav.social > ul > a:nth-child(1)')
    const moon = document.querySelector('nav.social > ul > a:nth-child(2)')

    sun.addEventListener('click', function (e) {
      e.preventDefault()
      showLight(html, sun, moon)
      setThemePreference('light')
    })
    moon.addEventListener('click', function (e) {
      e.preventDefault()
      showDark(html, sun, moon)
      setThemePreference('dark')
    })

    theme = getThemePreference()
    if (theme === 'dark') {
      showDark(html, sun, moon)
    } else {
      showLight(html, sun, moon)
    }
  })

  function showDark(html, sun, moon) {
    html.dataset.theme = 'dark';
    moon.style.display = 'none'
    sun.style.display = 'inline'
  }

  function showLight(html, sun, moon) {
    html.dataset.theme = 'light';
    moon.style.display = 'inline'
    sun.style.display = 'none'
  }

  function getThemePreference() {
    let theme = localStorage.getItem('pref-theme')
    if (theme) {
      return theme
    }

    theme = getCurrentSystemTheme()
    return theme
  }

  function setThemePreference(theme) {
    localStorage.setItem('pref-theme', theme)
  }

  function getCurrentSystemTheme() {
    if (isCurrentSystemThemeLight()) {
      return 'light'
    }

    return 'dark'
  }

  function isCurrentSystemThemeLight() {
    return window.matchMedia
      && window.matchMedia('(prefers-color-scheme: light)').matches
  }
})()