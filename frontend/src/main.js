import './style.css'
import header from "./sections/header.html?raw"
import hero from "./sections/hero.html?raw"
import about from "./sections/about.html?raw"
import services from "./sections/services.html?raw"
import testimonials from "./sections/testimonials.html?raw"
import contact from "./sections/contact.html?raw"
import footer from "./sections/footer.html?raw"
import { setupMenu } from './js/menu.js'

document.querySelector('#app').innerHTML = `
  ${header}
  ${hero}
  ${about}
  ${services}
  ${testimonials}
  ${contact}
  ${footer}
`

setupMenu()
