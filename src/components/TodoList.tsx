interface Todo {
  id: number;
  title: string;
}

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos'
      );
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  const filteredTodos = todos
    .filter(({ title }) => {
      return title.indexOf(term) >= 0;
      //   return name.toLowerCase().includes(term.toLowerCase());
    })
    .slice(0, 10)
    .map((todo: Todo) => {
      return todo;
    });

  const renderTodos = filteredTodos.map((todo: Todo) => {
    return (
      <div key={todo.id}>
        <p>
          <strong>{todo.title}</strong>
        </p>
      </div>
    );
  });

  return (
    <div>
      <h2>Todos List</h2>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search users..."
      />
      {renderTodos.length > 0 ? renderTodos : <p>No Todos found</p>}
    </div>
  );
}
