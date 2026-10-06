import './style.css'
import { setupCounter } from './counter.js'
import header from "./sections/header.html?raw"

document.querySelector('#app').innerHTML = header;

setupCounter(document.querySelector('#counter'))
