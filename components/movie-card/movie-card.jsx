import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap"

export const MovieCard = ({movie, onMovieClick}) => {
    return (
      <Card className="h-100" style={{ cursor: "pointer" }} onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        {/* <Button onClick={() => onMovieClick(movie)} variant="primary">
          Open
        </Button> */}
      </Card.Body>
    </Card>
    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };