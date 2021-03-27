import { useEffect, useState } from "react";
import MovieService from "../services/MovieService";

const Movie = (props) => {
  const initialMovieState = {
    id: null,
    title: "",
    cover: "",
    synopsis: "",
  };

  const [currentMovie, setCurrentMovie] = useState(initialMovieState);
  const [message, setMessage] = useState("");

  const getMovie = async (id) => {
    try {
      const res = await MovieService.getById(id);
      console.log(res);
      setCurrentMovie(res.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentMovie({ ...currentMovie, [name]: value });
  };

  const updateMovie = () => {
    /* const res = await MovieService.create(data);
    console.log(res); */
    MovieService.update(currentMovie.id, currentMovie)
      .then((res) => {
        console.log(res);
        setMessage("La película fue actualizada correctamente.");
      })
      .catch((err) => {
        setMessage("Ocurrió un error!!");
        console.log(err);
      });
  };

  const deleteMovie = async () => {
    try {
      if (!window.confirm("Seguro desea eliminar esta película?")) {
        return;
      }
      await MovieService.remove(currentMovie.id);
      props.history.push("/movies");
    } catch (error) {
      console.log(error);
      alert("Ocurrió un error al tratar de eliminar una película");
    }
  };

  return (
    <div className="subtmit-form">
      {!currentMovie ? (
        <div>
          <h4>Selecciona una película!!</h4>
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
              defaultValue={currentMovie.title}
              onChange={handleInputChange}
              name="title"
            />
            <label>Portada</label>
            <input
              className="form-control"
              type="text"
              id="cover"
              required
              defaultValue={currentMovie.cover}
              onChange={handleInputChange}
              name="cover"
            />
            <label>Synopsis</label>
            <input
              className="form-control"
              type="text"
              id="synopsis"
              required
              defaultValue={currentMovie.synopsis}
              onChange={handleInputChange}
              name="synopsis"
            />
            <label>Año</label>
            <input
              className="form-control"
              type="number"
              id="year"
              required
              defaultValue={currentMovie.year}
              onChange={handleInputChange}
              name="year"
            />
          </div>
          <br />
          <button className="btn btn-success" onClick={updateMovie}>
            Actualizar
          </button>
          <button className="btn btn-danger" onClick={deleteMovie}>
            Eliminar
          </button>
          <div>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
