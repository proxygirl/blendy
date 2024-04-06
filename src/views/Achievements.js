import { useState, useEffect } from 'react'

export default function Achievements(props) {

    const [achievements, setAchievements] = useState(
        localStorage.getItem('achievements') ? JSON.parse(localStorage.getItem('achievements')) : null
    )  
    
    return (
        <div className="game dark achievements">
            <header>
                <h1>Achievements</h1>
            </header>
            <main className="menu">
                {achievements &&
                    <div className="">                    
                    <div><i className="bi bi-star-fill"></i> {achievements.solved} Solved</div>
                    <div><i className="bi bi-skip-forward-fill"></i> {achievements.skipped} Skipped</div>
                    {Object.entries(achievements.puzzles).map(([key, achievement]) => {
                    return <div>{achievement.count} {achievement.count != 1 ? `${achievement.label}s` : achievement.label}</div>
                    })}
                    </div>                        
                }

                <div className="menu-item">
                <i class="bi bi-arrow-return-left"></i> <a href="#" onClick={() => {props.viewHandler("Home")}}>Back</a>
                </div>                          
            </main>
            <footer>
                <span className="copyright">© angelcities 2024</span>
            </footer>
        </div>
    )

}     