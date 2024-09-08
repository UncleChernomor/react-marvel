import {useState, useEffect} from 'react';
import {useMarvelService} from '../../services/MarvelService';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
    const [listCharacters, setListCharacters] = useState([]);
    const [moreLoading, setMoreLoading] = useState(false);
    const [currentItem, setCurrentItem] = useState(0);
    const [maxCount, setMaxCount] = useState(30);

    const {error, loading, getCharacterListByCount} = useMarvelService();

    const updateList = () => {
        getCharacterListByCount(9)
            .then(onListLoaded);
    }

    const onListLoaded = async (characters) => {
        const currentId = (!currentItem && characters.length > 0) ? characters[0].id : 0;
        props.selectCharacter(currentId);
        setListCharacters(characters);

        setCurrentItem(currentId);
        setMaxCount(characters[0].total);
    }

    const onChooseCharacter = (e, id) => {
        if (id === currentItem) {
            return;
        }

        setCurrentItem(id);

        props.selectCharacter(id);
    }

    const loadMore = () => {

        setMoreLoading(true);

        getCharacterListByCount(9, listCharacters.length)
            .then((characters) => {
                setListCharacters(listCharacters => [...listCharacters, ...characters]);
                setMoreLoading(false);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        updateList();
    }, []);

    const viewList = (listCharacters.length || (!loading && !error)) ?
        <ViewList
            characters={listCharacters}
            active={currentItem}
            chooseCharacter={onChooseCharacter}/> :
        null;

    const spinner = loading && !moreLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    const classesButtonMore = listCharacters.length < maxCount ?
        'button button__main button__long' :
        'button button__main button__long stop-load';
    const disabledButtonMore = listCharacters.length >= maxCount;
    const classesLoadMore = moreLoading ? 'inner go-spinner' : 'inner';

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {viewList}
            <button className={classesButtonMore} onClick={loadMore} disabled={disabledButtonMore}>
                <div className={classesLoadMore}><span>load more</span><span className='spinner'></span></div>
            </button>
        </div>
    )
}

const ViewList = (props) => {
    const {characters, active, chooseCharacter} = props;
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
                            <img src={item.thumbnail} alt={item.name} style={imageStyle}/>
                            <div className="char__name">{item.name}</div>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default CharList;