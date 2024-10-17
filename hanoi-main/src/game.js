import { sleep } from './util.js'
import { getHanoiSolutions } from './hanoi.js'

// select all tower elements
const towers = document.querySelectorAll('.tower')

// initialize towerContent as an array of arrays representing the discs on each tower
let towerContent = [[], [], []]

// initialize the size of the discs
let size = 3

let discs

// sleep time and speed
const sleepTime = 300
let speed = 100

// colors of the discs
const DISC_COLORS = ['#1b2b34', '#206a5d', '#bfae37', '#cc7722', '#a22222', '#2a5dff'];

// initial width of the discs
const startWidth = 90

// html elements
const newGameBtn = document.getElementById('newGameBtn')
const discSelect = document.getElementById('discSelect')
const speedRange = document.getElementById('speedRange')
const btnSolve = document.getElementById('btnSolve')

// variables to track the current and origin tower during draggind
let currentTower
let originTower

// function to build the towers with stems and plates
const buildTowers = (towers) => {
  towers.forEach(tower => {
    const stem = document.createElement('div')
    stem.className = 'stem'
    const plate = document.createElement('div')
    plate.className = 'plate'
    tower.innerHTML = ''
    tower.appendChild(stem)
    tower.appendChild(plate)
  })
}

// start the game
start()

function start() {
  // reset the towerContent array
  towerContent = [[], [], []]

  // build the towers with stems and plates
  buildTowers(towers)

  // create discs and place them on the first tower
  for (let i = 0; i < size; i++) {
    let tower = document.createElement('div')
    tower.classList.add('disc')
    tower.draggable = true
    tower.style.backgroundColor = DISC_COLORS[i]
    tower.style.width = (startWidth - 15 * i) + 'px'
    towerContent[0].push(tower)
  }

  // add the disc to the first tower in the DOM
  towerContent[0].forEach(t => {
    towers[0].innerHTML = t.outerHTML + towers[0].innerHTML
  })

  // add event listeners for dragenter and dragover to each tower
  for (let i = 0; i < towers.length; i++) {
    towers[i].classList.add('t' + i)
    towers[i].addEventListener('dragenter', dragenter)
    towers[i].addEventListener('dragover', dragover)
  }

  // get references to all discs
  discs = document.querySelectorAll('.disc')

  discs.forEach(disc => {
    disc.addEventListener('dragstart', dragstart)
    disc.addEventListener('dragend', dragend)
  })
}

// event handler for dragenter
function dragenter() {
  if (!originTower) {
    originTower = this
  }
}

// event handler for dragover
function dragover() {
  currentTower = this
}

// event handler for dragstart
function dragstart() {
  this.classList.add('is-dragging')
}

// event handler for dragend

function dragend() {
  let originTowerIndex = originTower.classList[1][1]
  let currentTowerIndex = currentTower.classList[1][1]
  this.classList.remove('is-dragging')

  moveTower(originTowerIndex, currentTowerIndex, this)

  originTower = undefined
  originTowerIndex = undefined
}

// Move the disc from the origin tower to the current tower
function moveTower(originTowerIndex, currentTowerIndex, disc) {
  if (isDroppable(originTowerIndex, currentTowerIndex, disc)) {
    towerContent[currentTowerIndex].push(towerContent[originTowerIndex].pop())
    originTower.removeChild(disc)
    currentTower.prepend(disc)
  }
}

// check if the disc can be dropped on the current tower
function isDroppable(originTowerIndex, currentTowerIndex, disc) {
  let top = isOnTop(originTowerIndex, disc)
  let topDiscIsLess = isDiscLessThan(currentTowerIndex, disc)

  return top && topDiscIsLess
}

// check if the disc is on top of the origin tower
function isOnTop(originTowerIndex, disc) {
  let size = towerContent[originTowerIndex].length
  return disc.style.width === towerContent[originTowerIndex][size - 1].style.width
}

// check if the disc is smaller than the top disc of the current tower
function isDiscLessThan(currentTowerIndex, disc) {
  let size = towerContent[currentTowerIndex].length

  if (!towerContent[currentTowerIndex][size - 1]) {
    return true
  } else {
    let sizeTop = disc.style.width.substring(0, disc.style.width.indexOf('p'))
    let sizeBottom = towerContent[currentTowerIndex][size - 1].style.width.substring(0, towerContent[currentTowerIndex][size - 1].style.width.indexOf('p'))

    return Number(sizeTop) < Number(sizeBottom)
  }
}

// Move the top disc from the origin tower to the destiny tower
function moveTopDisc(originTowerIndex, destinyTowerIndex) {
  originTower = towers[originTowerIndex]
  currentTower = towers[destinyTowerIndex]
  let disc = getTopDisc(originTowerIndex)
  moveTower(originTowerIndex, destinyTowerIndex, disc)
}

// get the top disc from the specified tower
function getTopDisc(towerIndex) {
  let size = towerContent[towerIndex].length

  let sizeDisc = towerContent[towerIndex][size - 1].style.width
  let indexDisc = -1
  discs.forEach((el, index) => {
    if (el.style.width === sizeDisc) {
      indexDisc = index
    }
  })
  return discs[indexDisc]
}

// animate the movements of the solution
async function moves(movements) {
  for (let i = 0; i < movements.length; i++) {
    const element = movements[i];
    moveTopDisc(element.from, element.to)
    await sleep(5 * sleepTime - 14 * speed)
  }
}

// Game class
class Game {
  // method to start a new game
  newGame = () => {
    // Event listner for the speed range input
    speedRange.addEventListener('input', event => {
      speed = event.target.value
    })

    // event listener for the new game button click
    newGameBtn.addEventListener('click', () => {
      size = discSelect.selectedIndex + 1
      start()
      // console.log(towerContent)
    })

    // event handler for the solve button click
    btnSolve.onclick = function() {
      const movements = getHanoiSolutions(size)
      console.log(movements)
      moves(movements)
    }
  }
}

export default Game