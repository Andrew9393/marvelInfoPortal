class MarvelServuce {
    _appiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=e17d8ab7f895204f28a89aeb6a00693a';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._appiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter) 
    }
    getCharacter = async(id) => {
        const res = await this.getResource(`${this._appiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: (char.description == '' ? 'There is no character description.' : char.description),
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url, 
            id: char.id,
            comics: char.comics.items,           
        }
    }

}

export default MarvelServuce;