import {useState} from "react";
import {Card, Col, Row, Form, Button} from "react-bootstrap";
import {MovieCard} from "../movie-card/movie-card";

export const ProfileView = ({user, token, movies, updateUser, onLoggedOut}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthdate] = useState("");

    let FavoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));
    
    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }

        fetch(`https://my-flix-8675.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                alert("Update successful");
                updateUser(user);
                onLoggedOut();
            } else {
                alert("Action failed");
            }
        })
    }

    const deleteAccount = () => {
        fetch(`https://my-flix-8675.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${token}`}
        }).then(response => {
            if (response.ok) {
                alert("User deleted");
                onLoggedOut();
            } else {
                alert("Action failed");
            }
        })
    }

    return (
        <>
            <Row>
                <Col md={6}>           
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title >User Info</Card.Title>
                            <Card.Text>Username: {user.Username}</Card.Text>
                            <Card.Text>Email: {user.Email}</Card.Text>
                            <Card.Text>Birthday: {user.Birthday}</Card.Text>
                            <Button variant="danger" onClick={() => {
                                deleteAccount();
                            }}>Delete user account</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card >
                        <Card.Body>
                            <Card.Title>Update Info</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={birthday}
                                        onChange={e => setBirthdate(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <br />
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br />
            <Row>
                <h4 className="mb-4">Favorites:</h4>
                {FavoriteMovies.map(movie => (
                    <Col className="mb-4" md={4} key={movie._id} >
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </>
    );
}
