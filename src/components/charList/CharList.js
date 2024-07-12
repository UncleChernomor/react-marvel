import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {

    #marvelSerice = null;

    state = {
        listCharacters: [],
        loading: true,
        currentItem: 0,
        error: false,
        moreLoading: false,
        maxCount: 30,
    };

    constructor(props) {
        super(props);
        this.#marvelSerice = new MarvelService();
    }

    componentDidMount = () => {
        this.updateList();
    }

    updateList = () => {
        this.#marvelSerice.getCharacterListByCount(9)
        .then(this.onListLoaded)
        .catch(this.onError);
    }

    onListLoaded = async (characters) => {
        const currentId = (!this.state.currentItem && characters.length > 0) ? characters[0].id : 0;
        this.props.selectCharacter(currentId);
        this.setState((prevState) => {
            return {
                listCharacters: characters,
                loading: false,
                currentItem: currentId,
                maxCount: characters[0].total,
            }
        });
    }

    onError = () => {
        this.setState({
            error: true,
        })
    }

    onChooseCharacter = (e, id) => {
        if (id === this.state.currentItem) { return; }

        this.setState({
            currentItem: id,
        })

        this.props.selectCharacter(id);
    }

    loadMore = () => {
        console.log(this.state.listCharacters.length);

        this.setState({
            moreLoading: true,
        });

        this.#marvelSerice.getCharacterListByCount(9, this.state.listCharacters.length)
        .then((characters) => {
            this.setState(() => {
                return {
                    listCharacters: [...this.state.listCharacters, ...characters],
                    moreLoading: false,
                }
            })
        })
        .catch(error => console.log(error));
    }

    render = () => {
        const { loading, error, listCharacters, maxCount, moreLoading } = this.state;

        const viewList = (!loading && !error && listCharacters.length) ?
            <ViewList
                characters={this.state.listCharacters}
                active={this.state.currentItem}
                chooseCharacter={this.onChooseCharacter} /> :
            null;

        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;

        const classesButtonMore = listCharacters.length < maxCount ?
                 'button button__main button__long' :
                 'button button__main button__long stop-load';
        const disabledButtonMore = listCharacters.length < maxCount ? false : true;
        const classesLoadMore = moreLoading ? 'inner go-spinner' : 'inner';

        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {viewList}
                <button className={classesButtonMore} onClick={this.loadMore} disabled={disabledButtonMore}>
                    <div className={classesLoadMore}><span>load more</span><span className='spinner'></span></div>
                </button>
            </div>
        )
    }
}

const ViewList = (props) => {
    const { characters, active, chooseCharacter } = props;
    return (
        <ul className="char__grid">
            {
                characters.map(item => {
                    let classes = "char__item";
                    classes += (item.id === active) ? ' char__item_selected' : '';

                    const imageNotFound = /image_not_available/.test(item.thumbnail);
                    const imageStyle = {
                        objectFit: imageNotFound ? 'contain' : '',
                    }

                    return (
                        <li key={item.id} className={classes} onClick={(e) => chooseCharacter(e, item.id)}>
                            <img src={item.thumbnail} alt={item.name} style={imageStyle} />
                            <div className="char__name">{item.name}</div>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default CharList;