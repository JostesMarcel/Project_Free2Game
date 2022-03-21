import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../Components/home.css'
import '../Components/props/top4games.css'
import '../Components/props/topBrowser.css'
import GeneralCard from "./props/generalProps"
import Top4GamesCard from "./props/top4games"
import TopBrowser from "./props/topBroswer"
import { useOutletContext } from "react-router-dom";



export default function Home() {
    const [topgames, setTopgames] = useState([])
    const [topbroswer, setTopBrowser] = useState([])
    const [fetchAllAndRecent] = useOutletContext();  //Netlify will keine Funktion die unbenutzt ist in diesem useState!

    let x
    console.log(fetchAllAndRecent);

    useEffect(() => {
        let loaded = true
        let newTopgamesArr = []

        fetch('https://www.freetogame.com/api/games?platform=pc&sort-by=release-date&sort-by=popularity')
            .then(respone => respone.json())
            .then(json => {
                if (loaded) {
                    console.log(json);
                    newTopgamesArr = json.splice(0, 4)
                    console.log(newTopgamesArr);
                    setTopgames(newTopgamesArr)
                    console.log('Top4PC Inhalte wurden neu gerendert');
                } return () => {
                    loaded = false;
                    console.log('fetch Top4PC closed');
                }
            })
    }, [x])

    useEffect(() => {
        let loaded = true
        let newTopBrowserArr = []

        fetch('https://www.freetogame.com/api/games?platform=browser&sort-by=release-date&sort-by=popularity')
            .then(respone => respone.json())
            .then(json => {
                if (loaded) {
                    console.log(json);
                    newTopBrowserArr = json.splice(0, 4)
                    console.log(newTopBrowserArr);
                    setTopBrowser(newTopBrowserArr);
                    console.log('Top4Browser Inhalte wurden neu gerendert');
                } return () => {
                    loaded = false;
                    console.log('fetch Top4Browser closed');
                }

            })
    }, [x])

    return (

        <main>
            <section className="sectionHero">
                <h1>FIND & TRACK THE BEST FREE-TO-PLAY GAMES!</h1>
            </section>
            <section className="sectionRecently">
                <h2>Recently Added</h2>
                <article>
                    {fetchAllAndRecent.slice(0, 4).map((ele, i) => {
                        return (
                            <GeneralCard key={i}
                                thumbnail={ele.thumbnail}
                                title={ele.title}
                                short_description={ele.short_description}
                                platform={ele.platform}
                                genre={ele.genre}
                                id={ele.id}
                            />
                        )
                    })}
                </article>
                <div className="buttonOutside"><Link to='/allgames'>SHOW MORE</Link></div>

            </section>

            <section className="sectionTop">
                <h2>Top 4 Games for PC in March 2022</h2>
                <article className="sectionTop4Games">
                    {topgames.map((elem, j) => {
                        return (
                            <Top4GamesCard key={j}
                                thumbnail={elem.thumbnail}
                                title={elem.title}
                                short_description={elem.short_description}
                                platform={elem.platform}
                                genre={elem.genre}
                                id={elem.id}
                                counter={j + 1}
                            />
                        )
                    })}
                </article>
                <div className="buttonOutside"><Link to='/allgames'>SHOW MORE</Link></div>
            </section>

            <section className="sectionRecently">
                <h2>Top 4 Games for Browser in June 2021</h2>
                <article>
                    {topbroswer.map((eleme, k) => {
                        return (
                            <TopBrowser key={k}
                                thumbnail={eleme.thumbnail}
                                title={eleme.title}
                                // short_description={eleme.short_description}
                                platform={eleme.platform}
                                genre={eleme.genre}
                                id={eleme.id}
                            />
                        )
                    })}
                </article>
                <div className="buttonOutside"><Link to='/allgames'>SHOW MORE</Link></div>
            </section>

        </main>
    )
}