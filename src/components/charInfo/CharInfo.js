import { Component } from 'react';

import './charInfo.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {

    state = {
        character: null,
        loading: true,
        error: false,
    }

    #marvelService = new MarvelService();

    componentDidMount = () => {
        // this.updateData();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.characterId !== this.props.characterId) {
            this.updateData();
        }
    }

    updateData() {
        const { characterId } = this.props;

        if (!characterId) {
            return;
        }

        this.onCharacterLoading();

        this.#marvelService.getCharacter(characterId)
            .then((character) => {
                this.setState({
                    character,
                    loading: false,
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false,
                    error: true,
                });
            });
    }

    onCharacterLoading = () => {
        this.setState({
            loading: true,
            error: false,
        });
    }

    render() {
        const { loading, error, character } = this.state;

        const skeleton = loading || error || character ? null : <Skeleton />;
        const unionView = (character && !loading) ?
            (
                <>
                    <CharacterView character={character} />
                    <ComicsView comics={character.comics} />
                </>
            ) :
            null;

        const spinner = loading ? <Spinner customSize={'150px'} /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {errorMessage}
                {unionView}
            </div>
        )
    }

}

const CharacterView = ({ character }) => {

    const imageNotFound = /image_not_available/.test(character.thumbnail);
    const imageStyle = {
        objectFit: imageNotFound ? 'contain' : '',
    }

    return (
        <>
            <div className="char__basics">
                <img src={character.thumbnail} alt={character.name} style={imageStyle} />
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

const ComicsView = ({ comics }) => {

    return (
        <>
            <div className="char__comics">Comics:{(comics.length < 1) ? 'not found comics' : ''}</div>
            <ul className="char__comics-list">
                {comics.items.map((item, index) => {
                    if(index > 9) { return; }

                    return (
                        <li key={index} className="char__comics-item">{item.name}</li>
                    )}
                )}
            </ul>
        </>
    );
}

export default CharInfo;