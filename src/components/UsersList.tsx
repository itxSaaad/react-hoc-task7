interface User {
  id: number;
  name: string;
}

// import axios from 'axios';
// import { useEffect, useState } from 'react';
import Hoc from './Hoc';

export function UsersList({ data }: { data: User[] }) {
  // const [users, setUsers] = useState([]);
  // const [term, setTerm] = useState('');

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await axios.get(
  //       'https://jsonplaceholder.typicode.com/users'
  //     );
  //     setUsers(response.data);
  //   };
  //   fetchUsers();
  // }, []);

  // const filteredUsers = users
  //   .filter(({ name }) => {
  //     return name.indexOf(term) >= 0;
  //     //   return name.toLowerCase().includes(term.toLowerCase());
  //   })
  //   .map((user: User) => {
  //     return user;
  //   });

  const renderUsers = data.map((user: User) => {
    return (
      <div key={user.id}>
        <p>
          <strong>{user.name}</strong>
        </p>
      </div>
    );
  });

  return (
    <div>{renderUsers.length > 0 ? renderUsers : <p>No users found</p>}</div>
  );
}

const SearchUsers = Hoc({ WrappedComponent: UsersList, entity: 'users' });

export default SearchUsers;
