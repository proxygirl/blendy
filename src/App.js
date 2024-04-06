import { useState } from 'react'

import Home from './views/Home'
import Game from './views/Game'
import Achievements from './views/Achievements'

export default function App() {

    const [currentView, setCurrentView] = useState("Home")    

    switch(currentView) {
        case 'Home': return <Home viewHandler={setCurrentView}></Home>
        case 'Game': return <Game viewHandler={setCurrentView}></Game>
        case 'Achievements': return <Achievements viewHandler={setCurrentView}></Achievements>
        default: return <Home viewHandler={setCurrentView}></Home>
    }

}     