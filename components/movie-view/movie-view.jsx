import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap"

import "./movie-view.scss";

export const MovieView = ({movie, onBackClick}) => {
    return (
      <div>
        <div>
          <img 
          className="w-100"
          src={movie.ImagePath} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <Button variant="primary" onClick={onBackClick}>Back</Button>
      </div>
    );
  };

  MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
      })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };