import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client/react";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token"),
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notify = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button name="books" onClick={() => setPage("books")}>
          books
        </button>
        {!token && <button onClick={() => setPage("login")}>login</button>}

        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        )}

        {page === "login" && !token && (
          <LoginForm setToken={setToken} setError={notify} />
        )}

        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add" && token} />

      {token && page === "recommend" && <Recommendations />}
    </div>
  );
};

export default App;
