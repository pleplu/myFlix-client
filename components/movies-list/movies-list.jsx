import React from "react";
import { useSelector} from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { Row, Col } from "react-bootstrap";

export const MoviesList = () => {
    const movies = useSelector((state) => state.movies.list);
    const filter = useSelector((state) => state.movies.filter).trim().toLowerCase();
    const filteredMovies = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(filter)
    );

    return (
        <>
            <Row>
                <MoviesFilter />
            </Row>
            <Row>
                {movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={6}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};
