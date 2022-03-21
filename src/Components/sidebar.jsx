import HomeBtn from "../img/HomeBtn.png"
import AllGame from "../img/AllGame.png"
import RecentlyKreuz from "../img/RecentlyKreuz.png"
import "../Components/sidebar.css"
import { useState } from "react"
import Logo from '../img/LogoFree2game.png'
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {


    const [navbarOpen, setNavbarOpen] = useState(true)

    const handleToggle = (prev) => {
        setNavbarOpen(prev => !prev)
    }

    return (

        <div className="vertical">
            <Link to='/'>
                <div className={`menuNav ${navbarOpen ? "logoClose" : "logoOpen"}`}>
                    <img className="img" src={Logo} alt="Logo Free2Game" />
                </div>
            </Link>

            <aside className={`menuNav ${navbarOpen ? " " : "showMenu"}`}>
                <section onClick={handleToggle} className={navbarOpen ? "burger" : "burger close"} >
                    <span></span>
                </section>
                <section>
                    <ul className="myDiv">
                        <li>
                            <NavLink exact activeClassName="active" to={"/"}>
                                <div>
                                    <img src={HomeBtn} alt="Nav-Menü Home" />
                                </div>
                                <span className={`menuNav ${navbarOpen ? "hideText" : "showText"}`}>Home</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="active" to={"/allgames"}>
                                <div>
                                    <img src={AllGame} alt="Nav-Menü AllGames" />
                                </div>
                                <span className={`menuNav ${navbarOpen ? "hideText" : "showText"}`}>All Games</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="active" to="/Added">
                                <div>
                                    <img src={RecentlyKreuz} alt="Nav-Menü Recently Added" />
                                </div>
                                <span className={`menuNav ${navbarOpen ? "hideText" : "showText"}`}>Recently Added</span>
                            </NavLink>
                        </li>
                    </ul>
                </section>
            </aside>
        </div>

    )
}