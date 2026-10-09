import './style.css'
import { setupCounter } from './counter.js'
import header from "./sections/header.html?raw"
import hero from "./sections/hero.html?raw"
import about from "./sections/about.html?raw"
import services from "./sections/services.html?raw"
import testimonials from "./sections/testimonials.html?raw"
import contact from "./sections/contact.html?raw"

document.querySelector('#app').innerHTML = `
  ${header}
  ${hero}
  ${about}
  ${services}
  ${testimonials}
  ${contact}
`

setupCounter(document.querySelector('#counter'))
