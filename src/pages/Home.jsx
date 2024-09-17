import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import decoration from "../resources/img/vision.png";
import RandomChar from "../components/randomChar/RandomChar";

import {useState} from "react";

const HomePage = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(0);

    const onSelectCharacter = (id) => {
        console.log('app onSelectCharacter', id);
        setSelectedCharacter(id);
    }

    return (
      <>
          <RandomChar/>
          <div className="char__content">
              <CharList selectCharacter={onSelectCharacter}/>
              <CharInfo characterId={selectedCharacter}/>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision"/>
      </>

  );
};

export default HomePage;