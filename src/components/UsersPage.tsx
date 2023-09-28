import React, { useState } from 'react';
import { requestUsers, requestUsersWithError } from "../api";
import './UsersPage.scss';

interface IUsers {
  id: number;
  name: string;
  age: number;
}

export const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [usersError, setUsersError] = useState('');
  const [isUsers, setIsUsers] = useState(false);
  const [users, setUsers] = useState<IUsers[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchAge, setSearchAge] = useState("");
  const [limit, setLimit] = useState(4);

  requestUsers({
    name: `${searchName}`,
    age: `${searchAge}`,
    limit: limit,
    offset: (page - 1) * limit,
  }).then((data) => setUsers(data));

  setTimeout(() => setIsUsers(true), 4000);

  if (users.length === 0) {
    requestUsersWithError({ name: "", age: "", limit: 4, offset: 0 }).catch(
      () => setUsersError("Данные не получены или необходимо дождаться ответа от сервера :(")
    );
  }

  const selectOptions = [
    {id: 1, value: 1},
    {id: 2, value: 2},
    {id: 3, value: 3},
    {id: 4, value: 4},
  ]

  return (
    <div className="wrapper">
      <div className="input__wrapper">
        <div className="input__inner">
          <input
            className="input"
            type="text"
            onChange={(e: any) => setSearchName(e.target?.value)}
            placeholder="Name"
          />
        </div>
        <div className="input__inner">
          <input
            className="input"
            type="text"
            onChange={(e: any) => setSearchAge(e.target?.value)}
            placeholder="Age"
          />
        </div>
      </div>
      <div className="users__wrapper">
        {users.length !== 0 ? (
          users.map((data) => (
            <ul key={data.id}>
              <li className="users__text">
                {data.name}, {data.age}
              </li>
            </ul>
          ))
        ) : page > 1 ? (
          <h2>Users not found</h2>
        ) : (isUsers === true && page === 1 && users.length === 0)  ? (
          <h2>{usersError}</h2>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
      <div className="control__wrapper">
        <div className="countbypage__wrapper">
          <div className="countbypage__text-wrapper">
            <p className="countbypage__text">By page</p>
          </div>
          <div>
            <select
              value={limit}
              onChange={(e: any) => setLimit(e.target.value)}
            >
              {selectOptions.map((data) => (
                <option value={data.value} key={data.id}>
                  {data.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="numpage__wrapper">
          <button
            className="button"
            onClick={() => page > 1 && setPage(page - 1)}
          >
            prev
          </button>
          <div className="numpage__text-wrapper">
            <p className="numpage__text">page: {page} </p>
          </div>
          <button className="button" onClick={() => setPage(page + 1)}>
            next
          </button>
        </div>
      </div>
    </div>
  );
}
