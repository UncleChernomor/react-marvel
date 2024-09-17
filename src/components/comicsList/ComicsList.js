import './comicsList.scss';

import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

function mergeComics(oldComics, newComics) {
    const idMap = new Map(oldComics.map(comic => [comic.id, comic]));

    console.log('old: ', oldComics);
    console.log('new: ', newComics);

    newComics.forEach(comic => {
        if (!idMap.has(comic.id)) {
            idMap.set(comic.id, comic);
        }
    });

    console.log('result: ', Array.from(idMap.values()));

    return Array.from(idMap.values());
}

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const {loading, error, getComicListByCount, clearError} = useMarvelService();

    const updateList = () => {
        getComicListByCount().then((result) => setComics(result));
    }

    const loadMore = () => {
        setLoadingMore(true);
        clearError();
        getComicListByCount(8, comics.length)
            .then((result) => {
                setComics(mergeComics(comics, result));
            })
            .catch((error) => console.log(error))
            .finally(() => setLoadingMore(false));
    };

    useEffect(() => {
            updateList();
        }, []);

    const comicsView = loadMore || (!loading && !error) ? <ComicsView comics={comics}/> : null;
    const spinner = loading && !loadingMore ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const classesLoadMore = loadingMore ? 'inner go-spinner' : 'inner';

    return (
        <div className="comics__list">
            {comicsView}
            {spinner}
            {errorMessage}
            <button
                className="button button__main button__long"
                onClick={loadMore}
            >
                <div className={classesLoadMore}>
                    <span>load more</span>
                    <span className='spinner'></span>
                </div>
            </button>
        </div>
    )
}

const ComicsView = (props) => {
    const {comics} = props;
    return (
        <ul className="comics__grid">
            {
                comics.map((item) => {
                    return (
                        <li className="comics__item" key={item.id}>
                            <Link to={`/comics/${item.id}`}>
                                <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                                <div className="comics__item-name">{item.title}</div>
                                <div className="comics__item-price">{item.price}$</div>
                            </Link>
                        </li>
                    );
                })
            }
        </ul>);
};

export default ComicsList;