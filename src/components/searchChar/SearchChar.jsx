import {set, useForm} from "react-hook-form";

import './SearchChar.css';
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const SearchChar = ({classes}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const {
        loading,
        error,
        clearError,
        getCharacterByName,
    } = useMarvelService();

    const [character, setCharacter] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        setFirstLoad(false);
        console.log('first');
    }, []);

    const onSubmit = (data) => {
        clearError();
        setFirstLoad(true);

        getCharacterByName(data?.nameCharacter)
            .then(result => {
                console.log('component: ', result);
                setCharacter(result);
                setFirstLoad(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const classesLoadMore = loading && firstLoad ? 'inner go-spinner' : 'inner';
    const errorService = error ? '<p role="alert">Error in fetch</p>' : null;
    const info = character ? <SearchInfo id={character.id} name={character.name}/> : null;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${classes} search__bar`}>
            <div className="search__bar--col">
                <label>Or find a character by name:</label>
                <input
                    {...register('nameCharacter', {
                        required: true,
                        minLength: 3,
                    })}
                    placeholder="Enter name"
                />
                {errors.nameCharacter?.type === "required" && (
                    <p role="alert">This field is required</p>
                )}
                {errors.nameCharacter?.type === "minLength" && (
                    <p role="alert">This field min length is 3</p>
                )}
                {errorService}
                {info}
            </div>
            <div className={`search__bar--col`}>
                <button className="button button__main" type="submit">
                    <div className={classesLoadMore}>
                        <span>Find</span>
                        <span className="spinner"></span>
                    </div>
                </button>
            </div>
        </form>
    );
}

const SearchInfo = ({id, name, classes}) => {

    if (id) {
        return (
            <p role="status" className={classes}>
                <div className={`status-text`}>There is! Visit <Link to={`/characters/${id}`}>{name}</Link> page?</div>
            </p>
        // <Link className="button button__secondary" to={`/characters/${id}`}>
        //     <div className={`inner`}>GO PAGE</div>
        // </Link>
        );
    } else {
        return (
            <p role="alert" className={classes}>
                The character was not found. Check the name and try again
            </p>
        );
    }
}

export default SearchChar;