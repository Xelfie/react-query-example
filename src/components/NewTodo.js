import React from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Formik } from "formik";

function NewTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    // Mutation function
    (newTodo) =>
      axios.post("http://localhost:8000/public/api/answers/new_todo", newTodo),
    // Options
    {
      onSuccess: () => queryClient.invalidateQueries("todos"),
    }
  );

  if (mutation.isLoading) {
    return <div className="container">Mutation running...</div>;
  }

  return (
    <div className="container">
      <Formik
        onSubmit={async (values) => {
          mutation.mutateAsync({ title: values.title });
          console.log("yo");
          return;
        }}
        initialValues={{ title: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Required";
          }
          return errors;
        }}
      >
        {({ errors, touched, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" onChange={handleChange} />
            <button type="submit">Add to-do</button>
            {errors.title && touched.title && errors.title}
          </form>
        )}
      </Formik>
    </div>
  );
}

export default NewTodo;
