interface User {
  id: number;
  name: string;
}

interface Todo {
  id: number;
  title: string;
}

interface HocProps {
  WrappedComponent: React.ComponentType<{ data: User[] | Todo[] }>;
  entity: string;
}

import axios from 'axios';
import React, { ReactNode } from 'react';

export default function Hoc({ WrappedComponent, entity }: HocProps) {
  return class extends React.Component {
    state = {
      term: '',
      data: [],
    };

    componentDidMount(): void {
      const fetchData = async () => {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/${entity}`
        );
        this.setState({ ...this.state, data: response.data });
      };

      fetchData();
    }

    render(): ReactNode {
      const { term, data } = this.state;
      const filteredData = data.slice(0, 10).filter((d) => {
        if (entity === 'users') {
          const { name } = d;
          return name.indexOf(term) >= 0;
        }
        if (entity === 'todos') {
          const { title } = d;
          return title.indexOf(term) >= 0;
        }
      });

      return (
        <div>
          <h2>{entity.toUpperCase()} List</h2>
          <input
            type="text"
            value={term}
            onChange={(e) =>
              this.setState({ ...this.state, term: e.target.value })
            }
            placeholder={`Search ${entity}...`}
          />
          <WrappedComponent data={filteredData} />
        </div>
      );
    }
  };
}
