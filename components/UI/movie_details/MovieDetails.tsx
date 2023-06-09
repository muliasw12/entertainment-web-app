import React from 'react';

import { Details } from './MovieDetailsStyle';

import TvIcon from '../../../public/assets/icon-category-tv.svg';
import MovieIcon from '../../../public/assets/icon-category-movie.svg';
import { IMovie } from '../../../@types/types';

const MovieDetails: React.FC<{ data: IMovie, type: string }> = ({
    data,
    type,
}) => {
    return (
        <Details
            layout 
            type={type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-label="movie-details"
        >
            <div>
                <p>{data.year}</p>
                <span></span>
                <p>{data.rating}</p>
            </div>
            <h3>{data.title}</h3>

        </Details>
    );
};

export default MovieDetails; 