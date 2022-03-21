import './App.css';
import Header from './Components/header';
import Sidebar from './Components/sidebar';
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [fetchAllAndRecent, setFetchAllAndRecent] = useState([])

  let x

  useEffect(() => {
    let loaded = true
    console.log('RecentGames Inhalte wurden neu gerendert');
    let newRecentArr8 = []

    fetch('https://www.freetogame.com/api/games?sort-by=release-date')
      .then(respone => respone.json())
      .then(json => {
        if (loaded) {
          console.log(json);
          newRecentArr8 = json.splice(0, 8)
          console.log(newRecentArr8);
          setFetchAllAndRecent(newRecentArr8)
        } return () => {
          loaded = false
          console.log('fetch RecentGames closed');
        }
      })
  }, [x])


  //->> this function was originally used to create a second fetch for the child elements but later on in the project wasn't needed anymore
  // useEffect(() => {
  //   let loaded = true
  //   console.log('AllGames Inhalte wurden neu gerendert');

  //   fetch('https://www.freetogame.com/api/games')
  //     .then(resp => resp.json())
  //     .then(json => {
  //       if (loaded) {
  //         console.log(json);
  //         setFetchAllAndRecent(fetchAllAndRecent => [...fetchAllAndRecent, json])
  //       } return () => {
  //         loaded = false
  //         console.log('fetch AllGames closed');
  //       }
  //     })
  // }, [x])



  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Outlet context={[fetchAllAndRecent, setFetchAllAndRecent]} />

    </div>
  );
}

export default App;
