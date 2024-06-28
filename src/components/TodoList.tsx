interface Todo {
  id: number;
  title: string;
}

// import axios from 'axios';
// import { useEffect, useState } from 'react';

import Hoc from './Hoc';

export function TodoList({ data }: { data: Todo[] }) {
  //   const [todos, setTodos] = useState([]);
  //   const [term, setTerm] = useState('');

  //   useEffect(() => {
  //     const fetchTodos = async () => {
  //       const response = await axios.get(
  //         'https://jsonplaceholder.typicode.com/todos'
  //       );
  //       setTodos(response.data);
  //     };
  //     fetchTodos();
  //   }, []);

  //   const filteredTodos = todos
  //     .filter(({ title }) => {
  //       return title.indexOf(term) >= 0;
  //       //   return name.toLowerCase().includes(term.toLowerCase());
  //     })
  //     .slice(0, 10)
  //     .map((todo: Todo) => {
  //       return todo;
  //     });

  const renderTodos = data.map((todo: Todo) => {
    return (
      <div key={todo.id}>
        <p>
          <strong>{todo.title}</strong>
        </p>
      </div>
    );
  });

  return (
    <div>{renderTodos.length > 0 ? renderTodos : <p>No Todos found</p>}</div>
  );
}

const SearchTodos = Hoc({ WrappedComponent: TodoList, entity: 'todos' });

export default SearchTodos;
