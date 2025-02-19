import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getTodos } from '../../api';

interface TodoModalProps {
  isModalOpened: boolean;
  message: (clickButton: boolean) => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  isModalOpened,
  message,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos().then(() => {
      setLoading(false);
    });
  }, []);

  if (!isModalOpened) {
    return null;
  }

  const handleCloseClick = () => {
    message(false);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #2
          </div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleCloseClick}
          />
        </header>
        <div className="modal-card-body">
          {loading ? (
            <Loader />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                quis ut nam facilis et officia qui
              </p>
              <p className="block" data-cy="modal-user">
                <strong className="has-text-danger">Planned</strong>
                {' by '}
                <a href="mailto:Sincere@april.biz">Leanne Graham</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
