import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {
    return (
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card style={{ cursor: "pointer" }} className="h-100">      
          <Card.Img variant="top" src={movie.ImagePath}/>      
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Director.Name}</Card.Text>
            {/* <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button variant="link">Open</Button>
            </Link> */}
          </Card.Body>
        </Card>
      </Link>
    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };