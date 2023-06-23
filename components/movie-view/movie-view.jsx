import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom";

import "./movie-view.scss";

export const MovieView = ({movies}) => {
  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId);

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
        <Link to={`/`}>
          <Button className="back-button">Back</Button>
        </Link>
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