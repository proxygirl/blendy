import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import loadAchievements from '../utils/loadAchievements'

import Page from "../layouts/Page"

const Home = () => {

  const [achievements, setAchievements] = useState(loadAchievements)

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements))
  }, [achievements])  

  const threshold = 100

  const difficulties = {
    easy: {
      unlocked: true,
      progress: Object.values(achievements.easy.completed).reduce((a, b) => a + b, 0)
    },
    medium: {
      unlocked: Object.values(achievements.easy.completed).reduce((a, b) => a + b, 0) >= threshold,
      progress: Object.values(achievements.medium.completed).reduce((a, b) => a + b, 0) 
    },
    hard: {
      unlocked: Object.values(achievements.medium.completed).reduce((a, b) => a + b, 0) >= threshold,
      progress: Object.values(achievements.hard.completed).reduce((a, b) => a + b, 0)
    },
    bonus: {
      unlocked: Object.values(achievements.hard.completed).reduce((a, b) => a + b, 0) >= threshold,
      progress: Object.values(achievements.hard.completed).reduce((a, b) => a + b, 0) 
    } 
  }

  const renderDifficulty = ({label, name}, difficulty) => {

    if(difficulty.unlocked) {
      return (
        <li className={`menu-item menu-${name}`}>
          <Link to={`play`} state={{ difficulty: name}}>{label} <span>{`${difficulty.progress} / ${threshold}`}</span></Link>
        </li>
      )
    } else {
      return (
        <li className={`menu-item disabled menu-${name}`}>
          <span>{ label }</span>
        </li>
      )
    }
  }

  return (
    <>
      <Page title = "blendy">
        <ul className="menu">
          <li>
            <ul className="menu menu-difficulty">
              { renderDifficulty({label: "Easy", name: "easy"}, difficulties.easy)}                         
              { renderDifficulty({label: "Medium", name: "medium"}, difficulties.medium)}    
              { renderDifficulty({label: "Hard", name: "hard"}, difficulties.hard)}    
              { renderDifficulty({label: "Bonus", name: "bonus"}, difficulties.bonus)}
            </ul>
          </li>
          <li >
            <ul className="menu menu-auxiliary">
              <li className="menu-item">
              <Link to={`achievements`}>Achievements</Link>
              </li>
              <li className="menu-item">
              <Link to={`about`}>About</Link>
              </li>          
            </ul>
          </li>
        </ul>
      </Page>
      </>
  )
}


export default Home