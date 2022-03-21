import WindowsImg from '../../img/Windows.png'
import BrowerImg from '../../img/Browser.png'
import { Link } from 'react-router-dom'


const Top4GamesCard = (props) => {
    return (

        <article>
            <div>
                <img className="top4pic" src={props.thumbnail} alt={"Thumbnail of " + (props.title)} />
            </div>
            <div className="top4div">
                <div>
                    <h3>{props.title}</h3>
                    {/* <p className="">{props.short_description}</p> */}
                    <Link className='readMore' to={`/details/${props.id}`}>Read More</Link>
                </div>

                <div className="top4bottom">
                    {(() => {
                        if (props.platform === "PC (Windows)") {
                            return (
                                <div className='windows animated-box in'>
                                    <img src={WindowsImg} alt="windowsImg" />
                                </div>
                            )
                        } else if (props.platform === "Web Browser") {
                            return (
                                <div className='browser animated-box in'>
                                    <img src={BrowerImg} alt="browserImg" />
                                </div>
                            )
                        }
                    })()}
                    <div className='animated-box in'>
                        <p>
                            {props.genre}
                        </p>
                    </div>
                </div>
            </div>
            <div className='testKey'>{props.counter}</div>
        </article>
    )
}

export default Top4GamesCard