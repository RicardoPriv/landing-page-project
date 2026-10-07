import './style.css'
import { setupCounter } from './counter.js'
import header from "./sections/header.html?raw"
import hero from "./sections/hero.html?raw"

document.querySelector('#app').innerHTML = `
  ${header}
  ${hero}
`

setupCounter(document.querySelector('#counter'))
