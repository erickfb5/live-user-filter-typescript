import { useState, useEffect } from "react";

import "./App.css";

interface User {
  login: { uuid: string };
  name: { first: string; last: string };
  location: { city: string; country: string };
  picture: { large: string };
}

const App = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const res = await fetch("https://randomuser.me/api?results=50");
      const { results } = await res.json();
      setUsers(results);
    }
    fetchData();
  }, []);

  const filteredUsers: User[] = users.filter(
    (user: User) =>
      user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h4 className="title">Live User Filter</h4>
        <small className="subtitle">Search by name and/or location</small>
        <input
          type="text"
          id="filter"
          placeholder="Search"
          value={searchTerm}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(event.target.value)
          }
        />
      </header>
      <ul id="result" className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user: User) => (
            <li key={user.login.uuid}>
              <img src={user.picture.large} alt={user.name.first} />
              <div className="user-info">
                <h4>{`${user.name.first} ${user.name.last}`}</h4>
                <p>{`${user.location.city}, ${user.location.country}`}</p>
              </div>
            </li>
          ))
        ) : (
          <li>
            <h3>Loading...</h3>
          </li>
        )}
      </ul>
    </div>
  );
};

export default App;
