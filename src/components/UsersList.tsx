interface User {
  id: number;
  name: string;
}

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter(({ name }) => {
      return name.indexOf(term) >= 0;
      //   return name.toLowerCase().includes(term.toLowerCase());
    })
    .map((user: User) => {
      return user;
    });

  const renderUsers = filteredUsers.map((user: User) => {
    return (
      <div key={user.id}>
        <p>
          <strong>{user.name}</strong>
        </p>
      </div>
    );
  });

  return (
    <div>
      <h2>Users List</h2>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search users..."
      />
      {renderUsers.length > 0 ? renderUsers : <p>No users found</p>}
    </div>
  );
}
