import { useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep'
import './App.css';
import Square from './components/Square/Square';
import { useEvent, getColors } from './util';

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }
  
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const UP_ARROW = 38
const DOWN_ARROW = 40
const STOP = 27



function App() {
  let array = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ]

  array = array.map((elem, index) => {
    return(
      elem.map((elem2, index2) => {
        return ({
          value: elem2,
          x: index2,
          y: index
        })
      })
    )
  })

  
  const [squares, setSquares] = useState(array)


  const [gameOver, setGameOver] = useState(false)
  
  
  
  
  
  

  const initialize = () => {
  
    let squaresCopy = cloneDeep(squares)

    // console.log(squaresCopy[1][2]);
    
    setRandomSquareValue(squaresCopy)
    
    setRandomSquareValue(squaresCopy)
    
    // console.log(squaresCopy);
    setSquares(squaresCopy)
  }
  
  
  
  const setRandomSquareValue = (squaresCopy) => {
    let added = false
    let gridFull = false
    let attempts = 0
    
    while (added === false) {
      if (gridFull) {
        break
      }
      
      let random1 = Math.floor(Math.random() * 4)
      let random2 = Math.floor(Math.random() * 4)
      // console.log(squaresCopy[random1][random2]);
      // console.log(random2);
      attempts++
      if (squaresCopy[random1][random2].value === null) {
        squaresCopy[random1][random2].value = Math.random() > 0.5 ? 2 : 4
        added = true
      }
      
      if (attempts > 50) {
        gridFull = true
        
        let gameOver = checkIfGameOver()
        if (gameOver) {
          alert("Game Over")
          // setGameOver(true)
        }
        // setGameOver(true)
      }
    }
  }

  
  
  
  
  
  
  // function setRandomSquareValue2(){
    //   let random2 = getRandomInt(4)
    //   let random22 = getRandomInt(4)
    
    //   if (array[random2][random22] == null) {
      //     array[random2][random22] = getRandomInt(2) ? 2 : 4
      //   } else{
      //     setRandomSquareValue2()
    //   }
  // }
  // setRandomSquareValue2()
        
        
        
    
    
    // console.log(squares);
    
    
    
    let moveCooldown = 0
    
    // function moveCooldownFunc(){
      //   moveCooldown = 1
      //   setTimeout(function(){
        //     moveCooldown = 0
        //     console.log("finish");
        //   }, 1000)
        // }
        
  const handleKeyDown = (event) => {
    if (gameOver) {
      return
    }

    if (event.keyCode !== LEFT_ARROW && event.keyCode !== RIGHT_ARROW && event.keyCode !== UP_ARROW && event.keyCode !== DOWN_ARROW) {
      return
    }

    switch (event.keyCode) {
      case LEFT_ARROW:
        console.log(event.keyCode);
        moveLeft()
        break;
        case RIGHT_ARROW:
        console.log(event.keyCode);
        moveRight()
        break;
        case UP_ARROW:
        console.log(event.keyCode);
        moveUp()
        break;
        case DOWN_ARROW:
        console.log(event.keyCode);
        moveDown()
        break;
      default:
        break;
    }

    // if (event.key === "Arrow Right") {
    //   moveRight()
    // } else if (event.key === "Left Arrow") {
    //   moveLeft()
    // } else if (event.keyCode === UP_ARROW) {
    //   moveUp()
    // } else if (event.keyCode === DOWN_ARROW) {
    //   moveDown()
    // }

    if (event.key === "ArrowUp") {
      console.log("UP");
    }

    let gameOverr = checkIfGameOver()
    if (gameOverr) {
      alert('game over')
      setGameOver(true)
    }
  }


  useEvent('keydown', handleKeyDown)
  
  
  const moveUp = (dummy) => {
    let oldSquaresCopy = squares
    let squaresCopy = cloneDeep(squares)
    // console.log(squaresCopy[3]);
    
    for (let i = 0; i < 4; i++) {
      // let column = squaresCopy[i]
      let num1 = 0
      let num2 = num1 + 1

      while (num1 < 4) {
        if (num2 === 4) {
          num2 = num1 + 1
          num1++
          continue
        }
        
        if (squaresCopy[num1][i].value === null && squaresCopy[num2][i].value === null) {
          num2++
        } else if (squaresCopy[num1][i].value === null &&squaresCopy[num2][i].value !== null) {
          // console.log((num2*4)+i);
          let divs = document.querySelectorAll(`.squares-wrapper > div`)
          // console.log(divs);
          divs[(num2*4)+i].style.transform = `translateY(calc(${-100 * ((num2 - num1) ? num2 - num1 : 1)}% - ${8 * ((num2 - num1) ? num2 - num1 : 1)}px))`
          squaresCopy[num1][i].value = squaresCopy[num2][i].value
          squaresCopy[num2][i].value = null
          num2++
        } else if (squaresCopy[num1][i].value !== null &&squaresCopy[num2][i].value === null) {
          num2++
        } else if (squaresCopy[num1][i].value !== null &&squaresCopy[num2][i].value !== null) {
          if (squaresCopy[num1][i].value === squaresCopy[num2][i].value) {
            let divs = document.querySelectorAll(`.squares-wrapper > div`)
            divs[(num2*4)+i].style.transform = `translateY(calc(${-100 * ((num2 - num1) ? num2 - num1 : 1)}% - ${8 * ((num2 - num1) ? num2 - num1 : 1)}px))`
            squaresCopy[num1][i].value +=squaresCopy[num2][i].value
            squaresCopy[num2][i].value = null
            num2 = num1 + 1
            num1++
          } else{
            num1++
            num2 = num1 + 1
          }
        }
      }
    }


    if (JSON.stringify(oldSquaresCopy) !== JSON.stringify(squaresCopy)) {
      setRandomSquareValue(squaresCopy)
    }
    
    setTimeout(function(){
      if (dummy) {
        return squaresCopy
      } else{
        setSquares(squaresCopy)
      }
    }, 300)
  }

  const moveDown = (dummy) => {
    let oldSquaresCopy = squares
    let squaresCopy = cloneDeep(squares)
    // console.log(squaresCopy[3]);
    
    for (let i = 3; i >= 0; i--) {
      // let column = squaresCopy[i]
      let num1 = squaresCopy.length - 1
      let num2 = num1 - 1

      while (num1 > 0) {
        if (num2 === -1) {
          num2 = num1 - 1
          num1--
          continue
        }
        
        if (squaresCopy[num1][i].value === null && squaresCopy[num2][i].value === null) {
          num2--
        } else if (squaresCopy[num1][i].value === null &&squaresCopy[num2][i].value !== null) {
          // console.log(num2*4+i);
          // console.log(divs[num2*4+i]);
          let divs = document.querySelectorAll(`.squares-wrapper > div`)
          divs[(num2*4)+i].style.transform = `translateY(calc(${100 * (num2 - num1 ? Math.abs(num2 - num1) : 1)}% + ${8 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}px))`
          squaresCopy[num1][i].value =squaresCopy[num2][i].value
          squaresCopy[num2][i].value = null
          num2--
        } else if (squaresCopy[num1][i].value !== null &&squaresCopy[num2][i].value === null) {
          num2--
        } else if (squaresCopy[num1][i].value !== null &&squaresCopy[num2][i].value !== null) {
          if (squaresCopy[num1][i].value === squaresCopy[num2][i].value) {
            let divs = document.querySelectorAll(`.squares-wrapper > div`)
          divs[(num2*4)+i].style.transform = `translateY(calc(${100 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}% + ${8 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}px))`
            squaresCopy[num1][i].value +=squaresCopy[num2][i].value
            squaresCopy[num2][i].value = null
            num2 = num1 - 1
            num1--
          } else{
            num1--
            num2 = num1 - 1
          }
        }
      }
    }

    if (JSON.stringify(oldSquaresCopy) !== JSON.stringify(squaresCopy)) {
      setRandomSquareValue(squaresCopy)
    }
    
    setTimeout(function(){
      if (dummy) {
        return squaresCopy
      } else{
        setSquares(squaresCopy)
      }
    },300)
  }
  
  const moveLeft = (dummy) => {
    console.log('left');
    let oldSquaresCopy = squares
    let squaresCopy = cloneDeep(squares)
    
    for (let i = 0; i < 4; i++) {
      let row = squaresCopy[i]
      let num1 = 0
      let num2 = num1 + 1

      while (num1 < 4) {
        if (num2 === 4) {
          num2 = num1 + 1
          num1++
          continue
        }
        
        if (row[num1].value === null && row[num2].value === null) {
          num2++
        } else if (row[num1].value === null && row[num2].value !== null) {
          let divs = document.querySelectorAll(`.squares-wrapper > div`)
          divs[(i*4)+num2].style.transform = `translateX(calc(-${100 * ((num2 - num1) ? Math.abs(num2 - num1) : 0)}% - ${8 * ((num2 - num1) ? Math.abs(num2 - num1) : 0)}px))`
          console.log(`translateX(calc(-${100 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}% - ${8 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}px))`);
          // divs[(i*4)+num2].style.transform = `translateX(calc(${-100 * ((num2 - num1) ? num2 - num1 : 1)}% - ${8 * ((num2 - num1) ? num2 - num1 : 1)}px))`
          row[num1].value = row[num2].value
          row[num2].value = null
          num2++
        } else if (row[num1].value !== null && row[num2].value === null) {
          num2++
        } else if (row[num1].value !== null && row[num2].value !== null) {
          if (row[num1].value === row[num2].value) {
            let divs = document.querySelectorAll(`.squares-wrapper > div`)
            divs[(i*4)+num2].style.transform = `translateX(calc(-${100 * ((num2 - num1) ? Math.abs(num2 - num1) : 0)}% - ${8 * ((num2 - num1) ? Math.abs(num2 - num1) : 0)}px))`
            // divs[(i*4)+num2].style.transform = `translateX(calc(-${100 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}% - ${8 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}px))`
            // divs[(i*4)+num2].style.transform = `translateX(calc(${-100 * ((num2 - num1) ? num2 - num1 : 1)}% - ${8 * ((num2 - num1) ? num2 - num1 : 1)}px))`
            row[num1].value += row[num2].value
            row[num2].value = null
            num2 = num1 + 1
            num1++
          } else{
            num1++
            num2 = num1 + 1
          }
        }
      }
    }

    if (JSON.stringify(oldSquaresCopy) !== JSON.stringify(squaresCopy)) {
      setRandomSquareValue(squaresCopy)
    }
    
    setTimeout(() => {
      if (dummy) {
        return squaresCopy
      } else{
        setSquares(squaresCopy)
      }
    }, 300)
  }

  const moveRight = (dummy) => {
    console.log('right');
    let oldSquaresCopy = squares
    let squaresCopy = cloneDeep(squares)

    for (let i = 3; i >= 0; i--) {
      let row = squaresCopy[i]
      let num1 = row.length - 1
      let num2 = num1 - 1

      while (num1 > 0) {
        if (num2 === -1) {
          num2 = num1 - 1
          num1--
          continue
        }
        
        if (row[num1].value === null && row[num2].value === null) {
          num2--
        } else if (row[num1].value === null && row[num2].value !== null) {
          let divs = document.querySelectorAll(`.squares-wrapper > div`)
          divs[(i*4)+num2].style.transform = `translateX(calc(${100 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}% + ${8 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}px))`
          row[num1].value = row[num2].value
          row[num2].value = null
          num2--
        } else if (row[num1].value !== null && row[num2].value === null) {
          num2--
        } else if (row[num1].value !== null && row[num2].value !== null) {
          if (row[num1].value === row[num2].value) {
            let divs = document.querySelectorAll(`.squares-wrapper > div`)
            divs[(i*4)+num2].style.transform = `translateX(calc(${100 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}% + ${8 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}px))`
            // console.log(`translateX(calc(${100 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}% + ${8 * ((num2 - num1) ? Math.abs(num2 - num1) : 1)}px))`);
            row[num1].value += row[num2].value
            row[num2].value = null
            num2 = num1 - 1
            num1--
          } else{
            num1--
            num2 = num1 - 1
          }
        }
      }
    }

    if (JSON.stringify(oldSquaresCopy) !== JSON.stringify(squaresCopy)) {
      setRandomSquareValue(squaresCopy)
    }

    setTimeout(() => {
      if (dummy) {
        return squaresCopy
      } else{
        setSquares(squaresCopy)
      }
    }, 300)
  }


  const checkIfGameOver = () => {
    // let original = cloneDeep(squares)
    // let checker = moveRight(true)

    // if (JSON.stringify(squares) !== JSON.stringify(checker)) {
    //   return false
    // }


    // let checker2 = moveRight(true)

    // if (JSON.stringify(squares) !== JSON.stringify(checker2)) {
    //   return false
    // }


    // let checker3 = moveUp(true)

    // if (JSON.stringify(squares) !== JSON.stringify(checker3)) {
    //   return false
    // }


    // let checker4 = moveDown(true)

    // if (JSON.stringify(squares) !== JSON.stringify(checker4)) {
    //   return false
    // }

    // return true
  }


  const resetGame = () => {
    let emptyArray = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ]

    emptyArray = emptyArray.map((elem, index) => {
      return(
        elem.map((elem2, index2) => {
          return ({
            value: elem2,
            x: index2,
            y: index
          })
        })
      )
    })

    setRandomSquareValue(emptyArray)
    setRandomSquareValue(emptyArray)
    setSquares(emptyArray)
  }
  
  
  useEffect(() => {
    initialize()
  },[])
  

  return (
    <div className="App">
      <div className="squares-wrapper">

        {/* <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/>
        <Square value="2"/> */}

        {
          squares.map(elem => elem.map((elem2, index) => <Square key={index + new Date().getTime()} value={elem2.value} getColors={getColors} />))
        }
      </div>

      <button onClick={resetGame}>Новая игра</button>
    </div>
  )
}


export default App;
