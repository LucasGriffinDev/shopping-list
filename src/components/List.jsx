import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const List = ({ items, removeItem, changeItem }) => {
  return (
    <div>
      <ul className="p-2 mb-12 flex flex-col flex-nowrap no-scrollbar">
        {items.map(({ id, title }) => (
          <li
            key={id}
            className="flex flex-row justify-between pl-2 w-full bg-blue-500 border-white border-2 rounded mb-2"
          >
            <div className="">{title}</div>
            <div className="flex flex-row">
              <button
                type="button"
                className="text-green-500 pr-2"
                onClick={() => changeItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="text-red-500 pr-2"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
