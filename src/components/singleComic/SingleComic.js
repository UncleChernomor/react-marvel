import './singleComic.scss';

import {Link, useParams} from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const SingleComic = () => {
    const {id} = useParams();
    const {loading, error, clearError, getComicById} = useMarvelService();
    const [comic, setComic] = useState();

    const updateComic = () => {
        clearError();
        getComicById(id).then(result => {
            setComic(result);
        });
    }

    useEffect(() => {
        updateComic();
    }, [id]);

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = !loading && error ? <ErrorMessage /> : null;
    const view = !loading && !error ? <View comic={comic} /> : null;
    return (
        <>
            {spinner}
            {errorMessage}
            {view}
        </>
    )
}

const View = ({comic}) => {
    const {thumbnail, title, price, pageCount, description, lang} = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {lang}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    );
}

export default SingleComic;