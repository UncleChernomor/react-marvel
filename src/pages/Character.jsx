import {useParams} from "react-router-dom";
import useMarvelService from "../services/MarvelService";
import {useEffect, useState} from "react";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import AppBanner from "../components/appBanner/AppBanner";

const Character = ({classes}) => {
    const {id} = useParams();
    const {loading, error, clearError, getCharacter} = useMarvelService();
    const [character, setCharacter] = useState();

    const updateCharacter = () => {
        clearError();
        console.log('id: ', id);
        getCharacter(id)
            .then(data => {
                console.log('data: ', data);
                setCharacter(data);
                console.log('character: ', character);
            })
            .catch(error => {
                console.log('ERROR: ', error);
            });
    }

    useEffect(() => {
        updateCharacter();
    }, [id])

    const spinner = loading ? <Spinner/> : null;
    const errorView = error ? <ErrorMessage/> : null;
    const characterView = character?.id ?
                                        <View
                                            image={character.thumbnail}
                                            name={character.name}
                                            description={character.description} /> :
                                        null;
    return (
        <>
            {spinner}
            {errorView}
            {characterView}
        </>
    );
}

const View = ({image, name, description, classes}) => {
    return (
        <>
            <AppBanner/>
            <div
                className={`character ${classes ? ` ${classes}` : ''}`}
                style={{display: 'flex', gap: '40px', marginTop: '50px'}}>
                <div className={`image`} style={{maxWidth: '400px'}}>
                    <img src={image} alt={name} style={{width: '100%'}}/>
                </div>
                <div className={`info`}>
                    <h2>{name}</h2>
                    <div>{description}</div>
                </div>
            </div>
        </>
    )
}

export default Character;