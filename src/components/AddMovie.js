import { useState } from "react";
import MovieService from "../services/MovieService";

const AddMovie = () => {
  const initialMovieState = {
    id: null,
    title: "",
    cover: "",
    synopsis: "",
    year: 0,
  };

  const [movie, setMovie] = useState(initialMovieState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const saveMovie = () => {
    let data = {
      title: movie.title,
      cover: movie.cover,
      synopsis: movie.synopsis,
      year: movie.year,
    };

    /* const res = await MovieService.create(data);
    console.log(res); */
    MovieService.create(data)
      .then((res) => {
        setMovie({
          id: res.data.id,
          title: res.data.title,
          cover: res.data.cover,
          synopsis: res.data.synopsis,
          year: res.data.year,
        });
        setSubmitted(true);
        console.log(movie);
      })
      .catch((err) => {
        alert("Ocurrió un error");
        console.log(err);
      });
  };

  const newMovie = () => {
    setMovie(initialMovieState);
    setSubmitted(false);
  };

  return (
    <div className="subtmit-form">
      {submitted ? (
        <div>
          <h4>Has creado correctamente la película.</h4>
          <button className="btn btn-primary" onClick={newMovie}>
            Crear otra
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label>Título</label>
            <input
              className="form-control"
              type="text"
              id="title"
              required
              value={movie.title}
              onChange={handleInputChange}
              name="title"
            />
            <label>Portada</label>
            <input
              className="form-control"
              type="text"
              id="cover"
              required
              value={movie.cover}
              onChange={handleInputChange}
              name="cover"
            />
            <label>Synopsis</label>
            <input
              className="form-control"
              type="text"
              id="synopsis"
              required
              value={movie.synopsis}
              onChange={handleInputChange}
              name="synopsis"
            />
            <label>Año</label>
            <input
              className="form-control"
              type="text"
              id="year"
              required
              value={movie.year}
              onChange={handleInputChange}
              name="year"
            />
          </div>
          <br />
          <button className="btn btn-success" onClick={saveMovie}>
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddMovie;
