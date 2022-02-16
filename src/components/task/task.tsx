import React from 'react';
import './task.scss';
import defaultStore from '../../stores/defaultStore';

export const Task = () => {
  const { link } = defaultStore;

  return (
    <div className="task">
      <a href={link} target="_blank" rel="noreferrer">
        Задание
      </a>
    </div>
  );
};
