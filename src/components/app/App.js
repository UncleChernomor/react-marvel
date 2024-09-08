import {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const App = () => {

    const [selectedCharacter, setSelectedCharacter] = useState(0);

    const onSelectCharacter = (id) => {
        console.log('app onSelectCharacter', id);
        setSelectedCharacter(id);
    }


    return (
        <div className="app">
            <AppHeader/>
            <main style={{padding:'10px 35px'}}>
                {/*<RandomChar/>*/}
                {/*<div className="char__content">*/}
                {/*    <CharList selectCharacter={onSelectCharacter}/>*/}
                {/*    <CharInfo characterId={selectedCharacter}/>*/}
                {/*</div>*/}
                {/*<img className="bg-decoration" src={decoration} alt="vision"/>*/}
                <AppBanner />
                <ComicsList />
            </main>
        </div>
    )
}

export default App;