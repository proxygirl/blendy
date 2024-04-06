import { useState, useEffect } from 'react'

import Header from './Header'
import Puzzle from './Puzzle'
import Footer from './Footer'

import Level from '../modules/Level'

export default function Game() {
    
    // Game Variables
    
    // Load
    const [level, setLevel] = useState(
       localStorage.getItem('level') ? JSON.parse(localStorage.getItem('level')) : new Level()
    )

    const [isComplete, setisComplete] = useState(
        localStorage.getItem('isComplete') ? 
        (localStorage.getItem('isComplete') === 'true') : 
        false
    )  
    
    const [score, setScore] = useState(
        localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0
    )
    
    const [achievements, setAchievements] = useState(
        localStorage.getItem('achievements') ? localStorage.getItem('achievements') : {
            'solved': 0,
            'skipped': 0,
        }
    )      

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    )
    
    const [selected, setSelected] = useState(null) 
    const [accessible, setAccessible] = useState(false)    

    // Save
    useEffect(() => {
        localStorage.setItem('level',
            JSON.stringify(level)
        )
    }, [level])   
    
    useEffect(() => {
        localStorage.setItem('isComplete', isComplete)
    }, [isComplete])

    useEffect(() => {
        localStorage.setItem('score', score)
    }, [score])

    useEffect(() => {
        localStorage.setItem('achievements', achievements)
    }, [achievements])
    
    useEffect(() => {
        localStorage.setItem('theme', theme)
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
        setLevel(new Level())
        setSelected(null)
        setisComplete(false)
    }
    
    const handleResetLevel = () => {
        setLevel(prev => ({...prev,
            puzzle: JSON.parse(JSON.stringify(prev.reset))
        }))
        setSelected(null)
        setisComplete(false)
    }    
    
    const handleAction = slot => {
        if(!slot.locked && !isComplete) {
            if(selected) {
                const puzzle = {...level.puzzle}

                const selectedID = puzzle[selected.parent].indexOf(selected)
                const tileID = puzzle[slot.parent].indexOf(slot)
                const _temp = slot.tile

                puzzle[slot.parent][tileID].tile = puzzle[selected.parent][selectedID].tile

                puzzle[selected.parent][selectedID].tile = _temp

                let isWon = puzzle['board']
                    .map(s => s.tile ? s.tile.id : null)
                    .every((id, i) => id === level.solution[i])
                
                if(!isWon && level.type === 'line') {
                    isWon = puzzle['board']
                        .reverse()
                        .map(s => s.tile ? s.tile.id : null)
                        .every((id, i) => id === level.solution[i])     
                }
               
                setLevel(prev => ({...prev,
                    puzzle: puzzle
                }))
                
                setScore(isWon ? score + 1 : score)
                setAchievements(isWon ? achievements.solved++ : achievements)
                setisComplete(isWon)
                setSelected(null)
                
            } else if(slot.tile) {
                setSelected(slot)
            }
        }        
    }
    
    const classes = [
        'game',
        theme,
        `${accessible ? 'invert' : ''}`,
        `${isComplete ? 'complete' : ''}`
    ]
        

    return(
        <div className={classes.join(' ')} >
            <Header
                isComplete={isComplete}
                onClick={handleNextLevel}
                reset={handleResetLevel}
            ></Header>
            <Puzzle 
                level={level}
                selected={selected}
                isComplete={isComplete}
                onClick={handleAction}
            ></Puzzle>
            <Footer
                theme={theme}
                accessible={accessible}
                onClick={handleControls}
            ></Footer>
        </div>
    )
}