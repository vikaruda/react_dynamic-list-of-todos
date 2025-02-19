import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { Loader } from '../Loader';

interface ForMessage {
  message: (clickButton: boolean) => void;
}

export const TodoList: React.FC<ForMessage> = ({ message }) => {
  const [todosApi, setTodosFromApi] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const [clickButtonState, setClickButtonState] = useState<{
    [key: number]: boolean;
  }>({});

  const handleClick = (id: number) => {
    setClickButtonState(prevState => {
      const newState = { ...prevState };

      newState[id] = !newState[id];

      return newState;
    });
    message(!clickButtonState[id]);
  };

  useEffect(() => {
    getTodos().then(data => setTodosFromApi(data));
  }, [clickButtonState]);

  useEffect(() => {
    getTodos().then(() => {
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
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
              'has-background-info-light': clickButtonState[item.id], // Використовуємо стан для конкретного елемента
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
                onClick={() => handleClick(item.id)}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye': !clickButtonState[item.id], // Стан для конкретного елемента
                      'fa-eye-slash': clickButtonState[item.id],
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
