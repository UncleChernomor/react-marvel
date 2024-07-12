class MarvelService {
    #apiUrl;
    #apiKey;
    #slug;
    

    constructor(
        apiUrl = 'https://gateway.marvel.com:443/v1/public/',
        apiKey = 'apikey=8fb523c96bd8bd56d48b2de659931ac6'
    ) {
        this.#apiUrl =  apiUrl ?? 'https://gateway.marvel.com:443/v1/public/';
        this.#apiKey = apiKey ?? '?apikey=8fb523c96bd8bd56d48b2de659931ac6';
    }

    getData = async (url) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to execute request on path ${url}`);
            }

            return await response.json();

        } catch (error) {
            console.error('Error during fetch operation:', error.message);
            throw error;
        }
    }

    getAllCharacters = async () => {
        this.#slug = `characters?`;

        const result = await this.getData(`${this.#apiUrl}${this.#slug}${this.#apiKey}`);

        return result.data.results.map(this.#transformCharacter);
    }

    getCharacter = async (id) => {
        const currentId = id ?? '1011334';

        this.#slug = `characters/${currentId}?`;
        const result = await this.getData(`${this.#apiUrl}${this.#slug}${this.#apiKey}`)

        return this.#transformCharacter(result.data.results[0]);
    }

    getCharacterListByCount = async (count, offset) => {

        this.#slug = `characters?limit=${count}&`;
        this.#slug = offset ? `${this.#slug}offset=${offset}&` : this.#slug;

        const result = await this.getData(`${this.#apiUrl}${this.#slug}${this.#apiKey}`)

        return  result.data.results.map((item) => this.#transformCharacter(item, result.data.total));
    }

    #transformCharacter =  (character, total) => {

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

}

export default MarvelService;