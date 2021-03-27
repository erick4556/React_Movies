import { useState, useEffect } from "react";
import MovieService from "../services/MovieService";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [curretMovie, setCurrentMovie] = useState(null);
  const [curretIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveMovies();
  }, []);

  const retrieveMovies = async () => {
    try {
      const res = await MovieService.getAll();
      console.log(res);
      setMovies(res.data);
    } catch (error) {
      console.log(error);
      alert("Ocurrió un error");
    }
    /*  MovieService.getAll()
      .then((res) => {
        setMovies(res.data);
        console.log(movies);
      })
      .catch((err) => {
        console.log(err);
        alert("Ocurrió un error");
      }); */
  };

  const refreshList = () => {
    retrieveMovies();
  };

  const setActiveMovie = (movie, i) => {
    setCurrentMovie(movie);
    setCurrentIndex(i);
  };

  return (
    <div className="row">
      <div className="col-6">
        <h4>Películas</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Título</th>
              <th scope="col">Año</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movies &&
              movies.map((movie, i) => (
                <tr key={i}>
                  <th scope="row">{movie.id}</th>
                  <td>{movie.title}</td>
                  <td>{movie.year}</td>
                  <td>
                    <i
                      className="bi bi-eye"
                      onClick={() => setActiveMovie(movie, i)}
                    />
                    <Link className="bi bi-pencil" to={"/movies/" + movie.id} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="col-6">
        {curretMovie ? (
          <div>
            <h4>{curretMovie.title}</h4>
            <div>
              <label>
                <strong>Año: </strong>
                {curretMovie.year}
              </label>
            </div>
            <div>
              <label>
                <strong>Sinopsis: </strong>
                {curretMovie.synopsis}
              </label>
            </div>
            <div>
              <img className="img-fluid" src={curretMovie.cover} />
            </div>
            <Link
              to={"/movies/" + curretMovie.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecciona una película</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
