import GeneralCard from "./props/generalProps"
import "../Components/recentlyadded.css"
import { useOutletContext } from "react-router-dom";

export default function Added() {
    const [fetchAllAndRecent] = useOutletContext();

    return (

        <main>
            <section className="secHero">
                <article>
                    <h1>RECENTLY ADDED</h1>
                </article>
            </section>
            <section className="secRecently">
                <article>
                    {fetchAllAndRecent.slice(0, 8).map((ele, i) => {
                        return (
                            <GeneralCard key={i}
                                thumbnail={ele.thumbnail}
                                title={ele.title}
                                platform={ele.platform}
                                genre={ele.genre}
                                id={ele.id}
                            />
                        )
                    })}
                </article>
            </section>
        </main>
    )

}