import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from "react";


const RandomChar = () => {
    const [character, setCharacter] = useState(null);

    const minId = 1011000;
    const maxId = 1011400;

    const {data, error, loading, getCharacter, clearError} =  useMarvelService();

    useEffect(() => {
        updateData();
    }, []);

    const updateData = async () => {
        if(error) { clearError(); }
        const id = Math.floor(Math.random() * (maxId - minId) + minId);
        getCharacter(id)
            .then(onCharacterLoaded);
    }

    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }

    const onTryIt = () => {
        updateData();
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const view = !(loading || error) ? <View character={character}/> : null;

    return (
        <div className="randomchar">
            {spinner}
            {errorMessage}
            {view}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={onTryIt}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = (props) => {

    const {name, thumbnail, home, wiki, description} = props.character;
    const imageNotFound = /image_not_available/.test(thumbnail);
    const imageStyle = {
        objectFit: imageNotFound ? 'contain' : '',
    }

    const descriptionNice = description.length < 220 ? description : description.slice(0, 220) + '...';

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className="randomchar__img" style={imageStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {descriptionNice}
                </p>
                <div className="randomchar__btns">
                    <a href={home?.url} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki?.url} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;