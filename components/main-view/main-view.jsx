import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import {Row, Col} from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
  const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
} 
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
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>

          <Route
            path="/signup"
            element={
              <>
                 {user ? (
                   <Navigate to="/" />
                 ) : (
                   <Col md={12}>
                     <SignupView />
                   </Col>
                 )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={12}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }} />
                  </Col>
                )}
              </>

            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={12}>
                    <MovieView 
                    movies={movies} 
                    user={user} 
                    token={token} 
                    updateUser={updateUser} 
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={6}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path="/user"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView 
                      user={user} 
                      token={token} 
                      movies={movies} 
                      updateUser={updateUser}
                      onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                      />
                  </Col>
                )}
              </>
            }
          />

        </Routes>
      </Row>
    </BrowserRouter>
  );
};