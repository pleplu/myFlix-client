import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

import { LoginView } from "../login-view/login-view";

import { SignupView } from "../signup-view/signup-view";

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

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} 
      onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } 
    
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie._id} 
          movie={movie} 
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};