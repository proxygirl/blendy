// React
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// JSON Validation
import Ajv from 'ajv'
import levelSchema from '../../../data/schema/level.schema.json'

// Components
import Container from '../../../layouts/Container'
import Header from './Header'
import Puzzle from './Puzzle'
import Footer from './Footer'

// Utilities
import validateJSON from '../../../utils/validateJSON'
import makeLevel from '../../../utils/makeLevel'
import loadAchievements from '../../../utils/loadAchievements'

const validator = new Ajv()
const validateLevel = validator.compile(levelSchema)

const Game = () => {
    
    const { state } = useLocation()

    //  Load 
    const [difficulty, setDifficulty] = useState(state.difficulty ? state.difficulty :
      (localStorage.getItem("difficulty") ? localStorage.getItem("difficulty") : "easy"))

    const [level, setLevel] = useState({validated: false})
    const [achievements, setAchievements] = useState(loadAchievements)
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark')
    const [accessible, setAccessible] = useState(false)
    const [selected, setSelected] = useState(null) 

    // Validate Level

    useEffect(() => {
      const savedLevel = localStorage.getItem(`level.${difficulty}`)

      if (validateJSON(savedLevel, validateLevel)) {
        setLevel(JSON.parse(savedLevel))
      } else {
        makeLevel({"difficulty": difficulty})
        .then(result => setLevel(result))        
      }

    }, [])

    // Save
    useEffect(() => {
        localStorage.setItem(`level.${difficulty}`, JSON.stringify(level))
    }, [level])   

    useEffect(() => {
        localStorage.setItem('achievements', JSON.stringify(achievements))
    }, [achievements])

    useEffect(() => {
      localStorage.setItem('difficulty', difficulty)
    }, [difficulty])    
    
    useEffect(() => {
        localStorage.setItem('theme', (theme))
    }, [theme])          
    
    // Event Handlers
    const handleControls = control => {
        switch (control) {
            case 'theme': setTheme(theme === 'light' ? 'dark' : 'light')
                break
            case 'accessible': setAccessible(accessible ? false : true)
                break
            default:
                break
        }
    }

    const handleNextLevel = () => {

      if(!level.solved) {
        const _achievements = {...achievements}
        _achievements[difficulty].skipped++
        setAchievements(_achievements)
      }

      makeLevel({"difficulty": difficulty})
      .then((result) => {
        setLevel(result)
        setSelected(null)    
      })
    }
    
    const handleResetLevel = () => {
        setLevel(prev => ({...prev,
            puzzle: JSON.parse(JSON.stringify(prev.reset)),
            solved: false
        }))
        setSelected(null)
    }    
    
    const handleAction = slot => {
        if(!slot.locked && !level.solved) {
            if(selected) {
                const puzzle = {...level.puzzle}

                const selectedParent = puzzle[selected.parent].tiles
                const slotParent = puzzle[slot.parent].tiles

                const selectedID = selectedParent.indexOf(selected)
                const tileID = slotParent.indexOf(slot)
                const _temp = slot.tile

                slotParent[tileID].tile = selectedParent[selectedID].tile

                selectedParent[selectedID].tile = _temp

                let isWon = puzzle.board.tiles
                    .map(s => s.tile ? s.tile.id : null)
                    .every((id, i) => id === level.solution[i])
                
                if(!isWon && level.type === 'line') {
                    isWon = puzzle.board.tiles
                        .reverse()
                        .map(s => s.tile ? s.tile.id : null)
                        .every((id, i) => id === level.solution[i])     
                }
               
                setLevel(prev => ({...prev,
                    puzzle: puzzle,
                    solved: isWon
                }))
                
                if(isWon) {
                  const _achievements = {...achievements}
                  _achievements[difficulty]["completed"][level.type] ??= 0
                  _achievements[difficulty]["completed"][level.type]++
                  setAchievements(_achievements)
                }
                
                setSelected(null)
                
            } else if(slot.tile) {
                setSelected(slot)
            }
        }        
    }
    
    // const classes = [
    //     'game',
    //     theme,
    //     `${accessible ? 'invert' : ''}`,
    //     `${isComplete ? 'complete' : ''}`
    // ]
        
    if(level.validated) {
      return(
        <Container classes={[
          "game",
          `${level.solved ? 'complete' : ''}`,
          `${accessible ? 'invert' : ''}`,
          theme
        ]}>
            <Header
                solved={level.solved}
                next={handleNextLevel}
                reset={handleResetLevel}
            ></Header>
            <Puzzle
                id = {level.id}
                board = {level.puzzle.board}
                tray = {level.puzzle.tray}
                debug = {level.debug}
                selected = {selected}
                isComplete = {level.solved}
                onClick = {handleAction}
            ></Puzzle>
            <Footer
                theme={theme}
                accessible={accessible}
                onClick={handleControls}
                difficulty = {level.difficulty}
            ></Footer>
        </Container>
    )
    } else {
      return(
       <Container>
            <Header
                solved={level.solved}
                next={handleNextLevel}
                reset={handleResetLevel}
            ></Header>
            <div></div>     
            <Footer
                theme={theme}
                accessible={accessible}
                onClick={handleControls}
                difficulty = {level.difficulty}
            ></Footer>        
       </Container>
    )  
    }

}

export default Game