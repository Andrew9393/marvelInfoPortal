import { useHttp } from "../hooks/http.hook";


const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _appiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=e17d8ab7f895204f28a89aeb6a00693a';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_appiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter) 
    }
    const getCharacter = async(id) => {
        const res = await request(`${_appiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) => {
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

    return {loading, error, getAllCharacters, getCharacter, clearError}

}

export default useMarvelService;