// JSON Validation
import Ajv from 'ajv'
import achievementsSchema from '../data/schema/achievements.schema.json'

// Utilities
import validateJSON from './validateJSON'

const validator = new Ajv()
const validateAchievements = validator.compile(achievementsSchema)

const loadAchievements = () => {

  const savedAchievements = localStorage.getItem(`achievements`)

  if (validateJSON(savedAchievements, validateAchievements)) {

    return JSON.parse(savedAchievements)

  } else {
    console.log("new")
    return{
      easy: {
        skipped: 0,
        completed: {}
      },
      medium: {
        skipped: 0,
        completed: {}        
      },
      hard: {
        skipped: 0,
        completed: {}        
      },
      bonus: {
        skipped: 0,
        completed: {}        
      }
    }
    
  }

}

export default loadAchievements