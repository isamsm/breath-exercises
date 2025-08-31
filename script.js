const { ipcRenderer } = require("electron");

function minimizeWindow() {
  ipcRenderer.send("minimize-window");
}

let intervalId
let mainEl
let count = 0

function startBreath() {
  mainEl = document.querySelector('.initial-content')
  mainEl.style.display = 'none'

  startCounting()
}

function startCounting() {
  console.log(count)
  if(count < 4) {
    const countingEl = document.querySelector('.counting-content')
    countingEl.style.display = 'flex'

    clearInterval(intervalId)
    
    intervalId = setInterval(() => {
      let current = Number(countingEl.querySelector('span').textContent)

      if(current > 0) {
        countingEl.querySelector('span').textContent = current - 1
      } else {
        clearInterval(intervalId)

        countingEl.querySelector('span').textContent = 3

        countingEl.style.display = 'none'
        const breathEl = document.querySelector('.breath-content')
        breathEl.style.display = 'flex'

        setTimeout(() => {
          breathEl.style.display = 'none'
          startCounting()
        }, 3000)
      }
    }, 1000)

    count++
  } else {
    count = 0
    clearInterval(intervalId)
    const countingEl = document.querySelector('.counting-content')
    countingEl.style.display = 'none'

    mainEl.style.display = 'flex'
  }
}

