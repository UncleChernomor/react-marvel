import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

import MarvelService from '../../services/MarvelService';

// console.log(await new MarvelService().getCharacter(1009146));
// console.log(await new MarvelService().getAllCharacters())


class App extends Component {

    state = {
        selectedCharacter: null,
    }

    onSelectCharacter = (id) => {
        this.setState({
            selectedCharacter: id,
        });
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList selectCharacter={this.onSelectCharacter}/>
                        <CharInfo characterId={this.state.selectedCharacter}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }   
}

export default App;