import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

export const TodoList: React.FC = ({ message }) => {
  const [todosApi, setTodosFromApi] = useState<Todo[]>([]);
  const [clickButton, setClickButton] = useState(false);
  const error = clickButton === false;

  const handleClick = () => {
    setClickButton(true);
    message(clickButton);
  };

  useEffect(() => {
    getTodos().then(data => setTodosFromApi(data));
  }, []);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todosApi.map(item => (
          <tr
            data-cy="todo"
            className={classNames('', {
              'has-background-info-light': error,
            })}
            key={item.id}
          >
            <td className="is-vcentered">{item.id}</td>
            <td className="is-vcentered" />
            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">{item.title}</p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={handleClick}
              >
                <span className="icon">
                  <i
                    className={classNames('far fa-eye', {
                      '-slash': error,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
