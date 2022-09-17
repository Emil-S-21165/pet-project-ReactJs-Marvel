


class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=10ea0a94773f0843b4334f1b2831d22b';

    getResourse = async(url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could nont fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();

    }

    getAllCharacters = async () => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=190&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        if (char.description === null) {
            char.description = 'This character has now describtion';
        }
        if (char.description.length > 250) {
            char.description = char.description.slice(0, 250);
        }
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}

export default MarvelService;