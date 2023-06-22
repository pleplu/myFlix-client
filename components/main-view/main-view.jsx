import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

import { LoginView } from "../login-view/login-view";

import { SignupView } from "../signup-view/signup-view";

import Button from "react-bootstrap/Button";

import Row from "react-bootstrap/Row";

import Col from "react-bootstrap/Col";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser? storedUser : null);

  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {

    if (!token) return;
    

    fetch("https://my-flix-8675.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description, 
            ImagePath: movie.ImagePath,
            Genre: movie.Genre,
            Director: movie.Director
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  // if (!user) {
  //   return (
  //     <>
  //       <LoginView onLoggedIn={(user, token) => {
  //         setUser(user);
  //         setToken(token);
  //       }} />
  //       or
  //       <SignupView />
  //     </>
  //   );
  // }

  // if (selectedMovie) {
  //   return (
  //     <MovieView movie={selectedMovie} 
  //     onBackClick={() => setSelectedMovie(null)}
  //     />
  //   );
  // }

  // if (movies.length === 0) {
  //   return <div>The list is empty!</div>;
  // } 
    
  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <Col md={6}>
            Login here:
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
            </Col>
            <Col md={6}>
            Or register here:
            <SignupView />
          </Col>
        </>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" md={6} key={movie._id} >
              <MovieCard 
                movie={movie} 
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <Button variant="primary" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
        </>
      )}
    </Row>
  );
};