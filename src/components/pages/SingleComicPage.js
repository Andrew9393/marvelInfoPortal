import './singleComicPage.scss';
import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import { useParams, Link} from 'react-router-dom';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
      setComic(comic);
    }

    const errorMessage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spiner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;
    
    return (
      <>
       {errorMessage}
            {spinner}
            {content}
      </>
    )
}

const View = ({comic}) => {
  const {title, description, pageCount, thumbnail, price, language} = comic;

  return (
    <div className="single-comic">
    <img src={thumbnail} alt={title} className="single-comic__img"/>
    <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}$</div>
    </div>
    <Link to="/comics" className="single-comic__back">Back to all</Link>
    </div>  
  )
}

export default SingleComicPage;