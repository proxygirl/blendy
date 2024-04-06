import { useState, useEffect } from 'react'

import Header from '../components/Header'
import Puzzle from '../components/Puzzle'
import Footer from '../components/Footer'

import Level from '../modules/Level'

export default function Game(props) {
    
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
    
    const [achievements, setAchievements] = useState(
        localStorage.getItem('achievements') ? JSON.parse(localStorage.getItem('achievements')) : {
            'solved': 0,
            'skipped': 0,
            'puzzles': {
                'line': {'label': 'Line', 'count': 0},
                'square': {'label': 'Square', 'count': 0},
                'branches': {'label': 'Branches', 'count': 0},
                'pyramid': {'label': 'Pyramid', 'count': 0},
                'rectangle': {'label': 'Rectangle', 'count': 0},
                'dualPyramid': {'label': 'Dual Pyramid', 'count': 0},
                'rectanglePyramid': {'label': 'Rectangle Pyramid', 'count': 0}
            },
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
        localStorage.setItem('achievements',
            JSON.stringify(achievements)
        )    
    }, [achievements])      
    
    useEffect(() => {
        localStorage.setItem('isComplete', isComplete)
    }, [isComplete])

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
            case 'back': props.viewHandler('Home')
                break
            default:
                break
        }
    }

    const handleNextLevel = () => {
        console.log('Next Level')
        console.log(isComplete)
        setLevel(new Level())
        setSelected(null)

        const temp = {...achievements}
        temp['puzzles'][level.type]['count'] = isComplete ? temp['puzzles'][level.type]['count'] + 1 : temp['puzzles'][level.type]['count']
        temp['solved'] =  isComplete ? achievements.solved + 1 : achievements.solved
        temp['skipped'] = !isComplete ? achievements.skipped + 1 : achievements.skipped

        setAchievements(temp)

        console.log(level.type)
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
                
                setisComplete(isWon)
                setSelected(null)
                
            } else if(slot.tile) {
                setSelected(slot)
            }
        }        
    }
    
    const classes = [
        'game play',
        theme,
        `${accessible ? 'invert' : ''}`,
        `${isComplete ? 'complete' : ''}`
    ]
        

    return(
        <div className={classes.join(' ')} >
            <Header
                isComplete={isComplete}
                next={handleNextLevel}
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