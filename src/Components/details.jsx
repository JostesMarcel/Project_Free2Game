import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import "../Components/details.css"

export default function Details() {
    let gameID = useParams('id')

    const [gameDetail, setGameDetail] = useState([])
    const [screenShot, setScreenshot] = useState(['1', '2', '3'])

    useEffect(() => {
        let loaded = true
        fetch(`https://www.freetogame.com/api/game?id=${gameID.id}`)
            .then(resp => resp.json())
            .then(json => {
                if (loaded) {
                    console.log(json);
                    setScreenshot((json.screenshots))
                    console.log(json.screenshots);
                    console.log(json.screenshots.length);
                    setGameDetail(json)
                    console.log('Details Inhalte wurden neu gerendert');
                } return () => {
                    loaded = false
                    console.log('Details fetch closed');
                }
            })
    }, [gameID])

    console.log(screenShot.length);

    return (
        <main className="detailMain">
            <section className="detailHero">
                <div><img src={screenShot[0].image} alt={"Hero Pic of " + (gameDetail.title)} /></div>
            </section>
            <section className="articleDetail">
                <article className="artGameDescription">
                    <div className="gameDetail ">
                        <h2>{gameDetail.title}</h2>
                        <div><img src={gameDetail.thumbnail} alt={"Thumbnail of " + (gameDetail.title)} /></div>
                        <h3>Platform: {gameDetail.platform}</h3>
                        <div className="genreDetailDiv animated-box in">
                            <p className="genreDetail">{gameDetail.genre}</p>
                        </div>
                        <a className="readMore" href={gameDetail.game_url} target="_blank" rel='noopener noreferrer'>PLAY NOW</a>
                    </div>
                    <div className="aboutSec animated-box in">
                        <h2>About</h2>
                        <p className='detailDescription'>{gameDetail.description}</p>
                    </div>
                </article>
                <article className="artGameDetails">
                    <div className="detailsImgFlex">
                        <div><img src={screenShot[1].image} alt={"Screenshot 1 of " + (gameDetail.title)} /></div>
                        <div><img src={screenShot[2].image} alt={"Screenshot 2 of " + (gameDetail.title)} /></div>
                    </div>
                    <section className="lastFlex">
                        <article>
                            <h3>Additional Information</h3>
                            <p>Please not this free-to-play game may or may not offer optional in-game purchases</p>
                            <div>
                                <div className="flex1">
                                    <h3>Developer</h3>
                                    <p className="dev">{gameDetail.developer}</p>
                                </div>
                                <div className="flex2">
                                    <h3>Publisher</h3>
                                    <p className="publisher">{gameDetail.publisher}</p>
                                </div>
                                <div className="flex3">
                                    <h3>Release Date</h3>
                                    <p className="releaseDate">{gameDetail.release_date}</p>
                                </div>
                            </div>

                        </article>
                        <article>
                            {(() => {
                                if (gameDetail.platform === "Windows" || gameDetail.platform === "Windows, Web Browser") {
                                    return (
                                        <article className="system">
                                            <h2>Minimum System Requirements (Windows)</h2>
                                            <div className="grid">
                                                <div>
                                                    <h3>OS</h3>
                                                    <p>{gameDetail.minimum_system_requirements.os}</p>
                                                </div>
                                                <div>
                                                    <h3>Processor</h3>
                                                    <p>{gameDetail.minimum_system_requirements.processor}</p>
                                                </div>
                                                <div>
                                                    <h3>Memory</h3>
                                                    <p>{gameDetail.minimum_system_requirements.memory}</p>
                                                </div>
                                                <div>
                                                    <h3>Graphics</h3>
                                                    <p>{gameDetail.minimum_system_requirements.graphics}</p>
                                                </div>
                                                <div>
                                                    <h3>Storage</h3>
                                                    <p>{gameDetail.minimum_system_requirements.storage}</p>
                                                </div>
                                                <div>
                                                    <h3>Additional Notes</h3>
                                                    <p>Specifications may changes during development</p>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                } else if (gameDetail.platform === "Web Browser") {
                                    return (
                                        null
                                    )
                                }
                            })()}
                        </article>
                    </section>
                </article>
            </section>
        </main>
    )
}