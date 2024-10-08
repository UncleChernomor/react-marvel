import {useHttp} from "../hooks/http.hook";

export const useMarvelService = () => {
    const {data, loading, error, request, clearError} = useHttp();

    const apiUrl = 'https://gateway.marvel.com:443/v1/public/';
    const apiKey = 'apikey=8fb523c96bd8bd56d48b2de659931ac6';
    let slug = '';

    const getData = async (url) => {
        try {
            const response = await request(url);

            if (!response.ok) {
                throw new Error(`Failed to execute request on path ${url}`);
            }

            return await response.json();

        } catch (error) {
            console.error('Error during fetch operation:', error.message);
            throw error;
        }
    }

    const getAllCharacters = async () => {
        slug = `characters?`;

        const result = await request(`${apiUrl}${slug}${apiKey}`);

        return result.data.results.map(transformCharacter);
    }

    const getCharacter = async (id) => {
        const currentId = id ?? '1011334';

        slug = `characters/${currentId}?`;

        const result = await request(`${apiUrl}${slug}${apiKey}`);

        return transformCharacter(result.data.results[0]);
    }

    const getCharacterListByCount = async (count = 9, offset = 0) => {

        slug = `characters?limit=${count}&`;
        slug = offset ? `${slug}offset=${offset}&` : slug;

        const result = await request(`${apiUrl}${slug}${apiKey}`)

        return result.data.results.map((item) => transformCharacter(item, result.data.total));
    }

    const transformCharacter = (character, total) => {

        return {
            total,
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            home: character.urls[0],
            wiki: character.urls[1],
            comics: character.comics,
        };
    };

    const getComicListByCount = async (count = 8, offset = 0) => {
        slug = `comics?limit=${count}&`;
        slug = offset ? `${slug}offset=${offset}&` : slug;

        const result = await request(`${apiUrl}${slug}${apiKey}`);

        return result.data.results.map((item) => transformComic(item, result.data.total));
    };

    const transformComic = (comic, total) => {
        return {
          total,
          id: comic.id,
          title: comic.title,
          price: comic.prices[0].price,
          url: comic.urls[0].url,
          thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
        };
    };


    return {data, loading, error, getCharacter, getData, getCharacterListByCount, clearError, getComicListByCount};
}

export default useMarvelService;