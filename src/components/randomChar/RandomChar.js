import { useState, useEffect } from 'react';

import ErrorMassage from '../errorMassage/ErrorMassage';
import Spiner from '../spiner/Spiner';
import MarvelServuce from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    // state = {
    //     char: {},
    //     loading: true,
    //     error: false
    // }

    const onError = () => {
        setError(true)
        setLoading(false)
        // this.setState({
        //     loading: false,
        //     error: true
        // })
    }

    const marvelService = new MarvelServuce();

    useEffect(() => {
        updateChar();
    }, [])
    // componentDidMount() {
    //     this.updateChar();

    // }

    const onCharLoaded = (char) => {
        setChar(char)
        setLoading(false)
    }
    

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        marvelService
            .getCharacter(id)
            .then(onCharLoaded) 
            .catch(onError)
    }

        const errorMassage = error ? <ErrorMassage/> : null;
        const spiner = loading ? <Spiner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null

        return (
            <div className="randomchar">
                {errorMassage}
                {spiner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgObj = {'objectFit': 'cover'}
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgObj = {'objectFit': 'contain'}
    }
    return (
        <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgObj}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;