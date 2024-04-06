import { useState, useEffect } from 'react'

export default function Home(props) {
    return (
        <div className="game dark home">
            <header>
                <h1><span>b</span>lendy</h1>
            </header>
            <main className="menu">
                    <div className="menu-item">
                    <i class="bi bi-joystick"></i> <a href="#" onClick={() => {props.viewHandler("Game")}}>Play</a>
                    </div>
                    <div className="menu-item">
                    <i class="bi bi-trophy-fill"></i> <a href="#" onClick={() => {props.viewHandler("Achievements")}}>Achievements</a>
                    </div>                    
                    <div className="menu-item">
                    <i class="bi bi-braces"></i> <a href="https://github.com/proxygirl/blendy">GitHub</a>
                    </div>
            </main>
            <footer>
                <span className="copyright">© angelcities 2024</span>
            </footer>
        </div>
    )
}     