/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { useState } from 'react';

export const App: React.FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const updateMessage = (message: boolean) => {
    setIsModalOpened(message);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              <TodoList message={updateMessage} />
            </div>
          </div>
        </div>
      </div>

      <TodoModal isModalOpened={isModalOpened} message={updateMessage} />
    </>
  );
};
