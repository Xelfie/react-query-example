import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

function TodoList() {
  const { error, data, isFetching } = useQuery(
    // Query key
    "todos",
    // Query function
    () =>
      axios
        .get("http://localhost:8000/public/api/answers/todos")
        .then((res) => res.data),
    // Options
    {
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="container">
      {data && (
        <ul>
          {data.payload.map((todo) => (
            <li>{todo.title}</li>
          ))}
        </ul>
      )}

      {isFetching && <div>Fetching...</div>}

      {error && <div>An error has occurred: ${error.message}</div>}
    </div>
  );
}

export default TodoList;
