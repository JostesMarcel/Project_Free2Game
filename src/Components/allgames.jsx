import React, { useEffect, useState } from "react";
import Categories from '../Components/data/category.json'
import '../Components/allgames.css'
import GeneralCard from "./props/generalProps";


export default function AllGames() {
    const [selected, setSelected] = useState([]);
    const [platformSelect, setPlatformSelect] = useState("");
    const [sortSelect, setSortSelect] = useState("")

    const [recent, setRecent] = useState([])
    const [error, setError] = useState(false)

    const [isActivePlatform, setActivePlatform] = useState(false)
    const [isActiveCategor, setActiveCategor] = useState(false)
    const [isActiveSort, setActiveSort] = useState(false)

    //functions for getting values to filter
    const handleChange = event => {
        const { checked, value } = event.currentTarget;

        setSelected(
            prev => checked
                ? [...prev, value]
                : prev.filter(val => val !== value)
        );
        console.log(selected);
    };
    console.log(selected);

    //get Values from click of sortstuff
    const handlePlatformChange = ev => {
        setPlatformSelect(ev.target.value)
    }
    console.log(platformSelect);

    const handleSortingChange = e => {
        setSortSelect(e.target.value)
    }
    console.log(sortSelect);

    //Toggle für Ausklappen
    //Platform
    const handlePlatformOnClick = even => {  //Click for toggle of Platform to displayn options
        setActivePlatform(!isActivePlatform);
        even.stopPropagation()
    }

    //Categories
    const handleCategorOnClick = even => {  //Click for toggle of Categories to displayn options
        setActiveCategor(!isActiveCategor);
        even.stopPropagation()
    }

    //Sorting
    const handleSortOnClick = even => {  //Click for toggle of Sort to displayn options
        setActiveSort(!isActiveSort);
        even.stopPropagation()
    }

    useEffect(() => {
        let newneededArr = []
        if (platformSelect === "" && selected.length === 0 && sortSelect === "") {
            let loaded = true
            console.log('AllGames Inhalte wurden neu gerendert');

            fetch('https://www.freetogame.com/api/games')
                .then(resp => resp.json())
                .then(json => {
                    if (loaded) {
                        console.log(json);
                        newneededArr = json.slice(0, 12)
                        setRecent(newneededArr)
                    } return () => {
                        loaded = false
                        console.log('fetch AllGames closed');
                    }
                })
        } else if (platformSelect === "" && selected.length === 0) {
            let loaded = true
            console.log('Inhalte für Sortierung only wurden neu gerendert');

            fetch(`https://www.freetogame.com/api/games?sort-by=${sortSelect}`)
                .then(resp => resp.json())
                .then(json => {
                    if (loaded) {
                        console.log(json);
                        setRecent(json)
                        console.log(`https://www.freetogame.com/api/games?sort-by=${sortSelect}`);
                    } return () => {
                        loaded = false
                        console.log('fetch sortSelect only closed');
                    }
                })
        } else if (selected.length === 0 && sortSelect === "") {
            let loaded = true;
            console.log('Inhalte für Platform only wurden neu gerendert');
            fetch(`https://www.freetogame.com/api/games?platform=${platformSelect}`)
                .then(resp => resp.json())
                .then(json => {
                    if (loaded) {
                        console.log(json);
                        setRecent(json)
                        console.log(`https://www.freetogame.com/api/games?platform=${platformSelect}`);
                    } return () => {
                        loaded = false
                        console.log(('fetch Platform only closed'));
                    }
                })
        } else if (selected.length === 0) {
            let loaded = true
            console.log('Inhalte für Platform + Sorting wurden neu gerendert');
            fetch(`https://www.freetogame.com/api/games?platform=${platformSelect}&sort-by=${sortSelect}`)
                .then(resp => resp.json())
                .then(json => {
                    if (loaded) {
                        console.log(json);
                        setRecent(json)
                        console.log(`https://www.freetogame.com/api/games?platform=${platformSelect}&sort-by=${sortSelect}`);
                    } return () => {
                        loaded = false
                        console.log('fetch Platform + Sorting closed');
                    }
                })
        } else if (platformSelect === "" && selected.length > 0 && sortSelect === "") {
            let loaded = true
            let selectedTags = selected.join('.')
            console.log(selectedTags);
            console.log('Inhalte für Categories only wurden neu gerendert');

            fetch(`https://www.freetogame.com/api/filter?tag=${selectedTags}`)
                .then(resp => resp.json())
                .then(json => {
                    if (loaded) {
                        console.log(json);
                        console.log(`https://www.freetogame.com/api/filter?tag=${selectedTags}`);
                        if (json.status === 0) {
                            setError(true)
                            setRecent([])
                            console.log('Error: API has no Objects to display');
                        } else {
                            setError(false)
                            setRecent(json)
                            console.log('searched fetch ok, API has Objects to display');
                        }
                    } return () => {
                        loaded = false
                        console.log('fetch Categories only closed');
                    }
                })
        } else if (platformSelect === "" && selected.length > 0) {
            let loaded = true
            let selectedTags = selected.join('.')
            console.log(selectedTags);
            console.log('Inhalte für Categories + Sorting wurden neu gerendert');

            fetch(`https://www.freetogame.com/api/filter?tag=${selectedTags}&sort-by=${sortSelect}`)
                .then(resp => resp.json())
                .then(json => {
                    if (loaded) {
                        console.log(json);
                        console.log(`https://www.freetogame.com/api/filter?tag=${selectedTags}&sort-by=${sortSelect}`);
                        if (json.status === 0) {
                            setError(true)
                            setRecent([])
                            console.log('Error: API has no Objects to display');
                        } else {
                            setError(false)
                            setRecent(json)
                            console.log('searched fetch ok, API has Objects to display');
                        }
                    } return () => {
                        loaded = false
                        console.log('fetch Categories + Sorting closed');
                    }
                })
        } else if (selected.length > 0 && sortSelect === "") {
            let loaded = true
            let selectedTags = selected.join('.')
            console.log(selectedTags);
            console.log('Inhalte für Categories + Platform wurden neu gerendert');

            fetch(`https://www.freetogame.com/api/filter?platform=${platformSelect}&tag=${selectedTags}`)
                .then(resp => resp.json())
                .then(json => {
                    if (loaded) {
                        console.log(json);
                        console.log(`https://www.freetogame.com/api/filter?platform=${platformSelect}&tag=${selectedTags}`);
                        if (json.status === 0) {
                            setError(true)
                            setRecent([])
                            console.log('Error: API has no Objects to display');
                        } else {
                            setError(false)
                            setRecent(json)
                            console.log('searched fetch ok, API has Objects to display');
                        }
                    } return () => {
                        loaded = false
                        console.log('fetch Categories + Platform closed');
                    }
                })
        } else if (selected.length > 0) {
            let loaded = true
            let selectedTags = selected.join('.')
            console.log(selectedTags);
            console.log('Inhalte für Platform + Categories + Sorting wurden neu gerendert');

            fetch(`https://www.freetogame.com/api/filter?platform=${platformSelect}&tag=${selectedTags}&sort-by=${sortSelect}`)
                .then(resp => resp.json())
                .then(json => {
                    if (loaded) {
                        console.log(json);
                        console.log(`https://www.freetogame.com/api/filter?platform=${platformSelect}&tag=${selectedTags}&sort-by=${sortSelect}`);
                        if (json.status === 0) {
                            setError(true)
                            setRecent([])
                            console.log('Error: API has no Objects to display');
                        } else {
                            setError(false)
                            setRecent(json)
                            console.log('searched fetch ok, API has Objects to display');
                        }
                    } return () => {
                        loaded = false
                        console.log('fetch Platform + Categories + Sorting closed');
                    }
                })
        }
    }, [selected, platformSelect, sortSelect])

    console.log(recent);

    // select boxes: 
    //ok: if platformSelect === "" && sortSelect === "" && selected === [] -> allgames slice 12 from json;
    //ok: else if platformSelect === "" && selected === [] -> fetch API https://www.freetogame.com/api/games?sort-by={sortSelect}
    //ok: else if sortSelect === "" && selected ===[] -> fetch API https://www.freetogame.com/api/games?platform={platformSelect}
    //ok: else id selected ===[] -> fetch API https://www.freetogame.com/api/games?platform={platformSelect}&sort-by={sortSelect}

    //ok:  else if platformSelect === "" && sortSelect === "" && selected.length >0 -> map fetch https://www.freetogame.com/api/games?category={selectedmap?}???
    //ok: else if platformSelect === "" &&selected.length >0 -> fetch API https://www.freetogame.com/api/games?category={map???}&sort-by={sortSelect}
    //ok:  else if selected.length >0 && sortSelect = "" -> fetch API https://www.freetogame.com/api/games?platform={platformSelect}&category={map???}
    //else if selected-length>0 -> fetch API https://www.freetogame.com/api/games?platform={platfromSelect}&category={map???}&sort-by={sortSelect}

    return (
        <main>
            <section className="allgamesHero">
                <article>
                    <h1>ALL GAMES</h1>
                </article>
            </section>
            <div className="selection">

            <div className={isActivePlatform ? 'platforms-Check handlePlatformChange' : 'platforms-Check'} onClick={handlePlatformOnClick}>
                    <h3>PLATFORM</h3>
                    <ul className="platforms-Check-list" onClick={handlePlatformOnClick}>
                        <li className="customize-radio">
                            <label htmlFor="all">
                            <input type="radio" value="all" id="all" onChange={handlePlatformChange} name="platform"
                            />
                            <span id="Cross"></span>
                            <span className="textField1">All Platforms</span>
                            </label>
                        </li>
                        <li className="customize-radio">
                        <label htmlFor="pc">
                            <input type="radio" value="pc" id="pc" onChange={handlePlatformChange} name="platform"
                            />
                            <span id="Cross2"></span>
                            <span className="textField2">Windows(PC)</span>
                            
                            </label>
                            
                        </li>
                        <li className="customize-radio">
                            <label htmlFor="browser">
                            <input type="radio" value="browser" id="browser" onChange={handlePlatformChange} name="platform"
                            />
                            <span id="Cross3"></span>
                            <span className="textField3">Browser(Web)</span>
                            
                            </label>
                        </li>
                    </ul>
                </div>
                <div className={isActiveCategor ? 'categor-Check handleCategorChange' : 'categor-Check'} onClick={handleCategorOnClick}>
                    <h3>GENRE/TAG</h3>
                    <ul className="categor-Check-list" onClick={handleCategorOnClick}>
                    {Categories.map((item, key) => (
                            <li key={key} className="customize-radio2">
                                <label htmlFor={`${item.id}`}>
                                <input
                                    id={item.id}
                                    value={item.id}
                                    type="checkbox"
                                    disabled={!(selected.length < 4) && !(selected.some(val => val === item.id))}
                                    checked={(selected.some(val => val === item.id))}
                                    onChange={handleChange}
                                />
                                <span className="Cross4"></span>
                                <span className="textField4">{item.genre}</span>
                                </label>
                            </li>
                    ))}
                    </ul>
                </div>
                <div className={isActiveSort ? 'sort-Check handleSortChange' : 'sort-Check'} onClick={handleSortOnClick}>
                    <h3>SORT BY</h3>
                    <ul className="sort-Check-list" onClick={handleSortOnClick}>
                        <li className="customize-radio">
                            <label htmlFor="relevance">
                            <input type="radio" value="relevance" id="relevance" onChange={handleSortingChange} name="sorting"
                            />
                            <span id="Cross5"></span>
                            <span className="textField5"></span>
                            Relevance
                            </label>
                        </li>

                        <li className="customize-radio">
                            <label htmlFor="popularity">
                            <input type="radio" value="popularity" id="popularity" onChange={handleSortingChange} name="sorting"
                            />
                            <span id="Cross6"></span>
                            <span className="textField5"></span>
                            Popularity
                            </label>
                        </li>

                        <li className="customize-radio">
                        <label htmlFor="release-date">
                            <input type="radio" value="release-date" id="release-date" onChange={handleSortingChange} name="sorting"
                            />
                            <span id="Cross7"></span>
                            <span className="textField5"></span>
                            Release Date
                            </label>
                        </li>

                        <li className="customize-radio">
                            <label htmlFor="alphabetical">
                            <input type="radio" value="alphabetical" id="alphabetical" onChange={handleSortingChange} name="sorting"
                            />
                            <span id="Cross8"></span>
                            <span className="textField5"></span>
                            Alphabetical
                            </label>
                        </li>

                    </ul>
                </div>
                </div>
                <section className="helloooMapp">
                    {selected.map((key) => {
                        return (
                            <div>
                                <p>{key}</p>
                            </div>)
                    })}
                </section>
            <section className="secRecently">
                {(() => {
                    if (error === true) {
                        return (
                            <div className="errorMessage">
                                <h1>Sorry, we couldn't find that mixture of tags :/ Please try selecting some other categories</h1>
                                <div className="kurbi"></div>
                            </div>
                        )
                    } else {
                        return (
                            <article>
                                {recent.map((ele, i) => {
                                    return (
                                        <GeneralCard
                                            key={i}
                                            thumbnail={ele.thumbnail}
                                            title={ele.title}
                                            platform={ele.platform}
                                            genre={ele.genre}
                                            id={ele.id}
                                        />
                                    )
                                })}
                            </article>
                        )
                    }
                })()}

            </section>
        </main>
    );
}
