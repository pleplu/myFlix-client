import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Button, Card } from "react-bootstrap"
import { useEffect, useState } from "react";

import "./movie-view.scss";

export const MovieView = ({movies, user, token, updateUser}) => {
  const {movieId} = useParams();
  const movie = movies.find((x) => x._id === movieId);

  const [isFavorite, setIsFavorite] = useState(user.FavoriteMovies.includes(movieId));

  useEffect(() => {
      setIsFavorite(user.FavoriteMovies.includes(movieId));
  }, [movieId])

  const addFavorite = () => {
      fetch(`https://my-flix-8675.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "POST",
          headers: {Authorization: `Bearer ${token}`}
      }).then(response => {
          if (response.ok) {
              return response.json();
          } else {
              alert("Action failed");
          }
      }).then(user => {
          if (user) {
              alert("Successfully added to favorites");
              setIsFavorite(true);
              updateUser(user);
          }
      }).catch(e => {
          alert(e);
      });
  }

  const removeFavorite = () => {
      fetch(`https://my-flix-8675.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
          if (response.ok) {
              return response.json();
          } else {
              alert("Failed");
              return false;
          }
      }).then(user => {
          if (user) {
              alert("Successfully deleted from favorites");
              setIsFavorite(false);
              updateUser(user);
          }
      }).catch(e => {
          alert(e);
      });
  }

    return (
      <Card className="h-100">      
        <Card.Img variant="top" src={movie.ImagePath}/>      
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Director.Name}</Card.Text>   
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
            {isFavorite ? 
                <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
                : <Button variant="success" className="ms-2" onClick={addFavorite}>Add to favorites</Button>
            }                   
      </Card>
    );
  };

  MovieView.propTypes = {
      Title: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
      })
    }.isRequired