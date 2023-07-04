import PropTypes from "prop-types";
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {
  return (
    <Link style={{textDecoration: "none"}} to={`/movies/${encodeURIComponent(movie._id)}`}>
      <Card style={{cursor: "pointer"}} className="h-100">      
        <Card.Img variant="top" src={movie.ImagePath}/>      
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Genre.Name}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
};