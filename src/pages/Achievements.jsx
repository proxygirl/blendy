import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import SHAPES from '../data/shapes.json'
import DIFFICULTIES from '../data/difficulties.json'

import loadAchievements from '../utils/loadAchievements'

import Page from "../layouts/Page";

const Achievements = () => {
  
  const [achievements, setAchievements] = useState(loadAchievements)

  const [active, setActive] = useState("easy")

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements))
  }, [achievements])  

  const renderAchievements = (difficulty) => {
    const completed = Object.values(achievements[difficulty].completed).reduce((a, b) => a + b, 0)
    const skipped = achievements[difficulty].skipped
    const efficacy = Math.floor((completed / (completed + skipped)) * 100)

    return <>
      <div>
        <h3>Overview</h3>
        <ul>
          <li>{completed} Completed</li>
          <li>{skipped} Skipped</li>
          <hr />
          <li>{efficacy > 0 ? efficacy : "0"}% Solved</li>
        </ul>        
      </div>
      <div>
        <h3>Score</h3>
        <ul>
          { Object.keys(achievements[difficulty].completed).map(shape => {
            const shapeDisplay = SHAPES.find(obj => obj.name == shape) ? SHAPES.find(obj => obj.name == shape).label : {
              singular: "Unknown",
              plural: "Unknown",
            }

            const shapeCount = achievements[difficulty].completed[shape]
            
            return <>
              <li>{`${shapeCount} ${shapeCount > 1 ? shapeDisplay.plural : shapeDisplay.singular}`}</li>
            </>
          }) }
        </ul>        
      </div>      
    </>
  }
  
  return (<>
    <Page title = "Achievements">
      <div class="achievements-container">
        <ul className="menu menu-achievements">
          {Object.keys(achievements).map(difficulty => {
            return (
              <li 
                onClick={() => setActive(difficulty) }
                className={`${difficulty == active ? "active" : ""}`}
               ><h2>
                { DIFFICULTIES[difficulty].label}
                </h2>
              </li>
            )
          })}
        </ul>
        <div class="achievements-display">
          { renderAchievements(active) }
        </div>
        
      </div>

      <ul className="menu">
        <li className="menu-item">
          <Link to={`/`}>Back</Link>
        </li>
      </ul>
    </Page>
  </>)
}

export default Achievements