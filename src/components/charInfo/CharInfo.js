import './charInfo.scss';

import {useEffect, useState} from "react";

import MarvelService, {useMarvelService} from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

    const [character, setCharacter] = useState(null);
    const  {error, loading, getCharacter} = useMarvelService();

    useEffect(() => {
        // updateData(props.characterId);
    },[]);

    useEffect(() => {
        console.log('currentID: ', props.characterId);
        if (props.characterId) {
            updateData(props.characterId);
        }
    }, [props.characterId]);


    const updateData = (characterId) => {

        if (!characterId) {
            return;
        }

        getCharacter(characterId)
            .then((character) => {
                setCharacter(character);
            });
    }

    const skeleton = loading || error || character ? null : <Skeleton/>;
    const unionView = (character && !loading) ?
        (
            <>
                <CharacterView character={character}/>
                <ComicsView comics={character.comics}/>
            </>
        ) :
        null;

    const spinner = loading ? <Spinner customSize={'150px'}/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {unionView}
        </div>
    )
}

const CharacterView = ({character}) => {

    const imageNotFound = /image_not_available/.test(character.thumbnail);
    const imageStyle = {
        objectFit: imageNotFound ? 'contain' : '',
    }

    return (
        <>
            <div className="char__basics">
                <img src={character.thumbnail} alt={character.name} style={imageStyle}/>
                <div>
                    <div className="char__info-name">{character.name}</div>
                    <div className="char__btns">
                        <a href={character.home.url} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={character.wiki.url} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{character.description}</div>
        </>

    );
}

const ComicsView = ({comics}) => {

    return (
        <>
            <div className="char__comics">Comics:{(comics.length < 1) ? 'not found comics' : ''}</div>
            <ul className="char__comics-list">
                { comics.items.map((item, index) => {
                        if (index > 9) {
                            return;
                        }

                        return (
                            <li key={index} className="char__comics-item">{item.name}</li>
                        )
                    }
                ) }
            </ul>
        </>
    );
}

export default CharInfo;