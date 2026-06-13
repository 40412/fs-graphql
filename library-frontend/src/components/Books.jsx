import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";
import { ALL_BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS);

  const { data, loading, refetch } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: null },
  });

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const books = data.allBooks;
  const genres = [...new Set(books.flatMap((b) => b.genres))];

  const selectGenre = (g) => {
    setGenre(g);
    refetch({ genre: g });
  };

  const showAll = () => {
    setGenre(null);
    refetch({ genre: null });
  };

  /* const booksToShow = genre
    ? books.filter((b) => b.genres.includes(genre))
    : books; */

  return (
    <div>
      <h2>books</h2>

      {genre && (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        {genres.map((g) => (
          <button key={g} onClick={() => selectGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={showAll}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
