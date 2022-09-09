import { useState } from 'react';
import { Alert } from './components/Alert';
import { List } from './components/List';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [editItem, setEditItem] = useState('');
  const [alert, setAlert] = useState({
    show: false,
    message: 'Hello World',
    color: 'green',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'red', 'please enter a note');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              title: name,
            };
          }
          setIsEditing(false);
          setName('');
          return item;
        })
      );
    } else {
      showAlert(true, 'green', 'note added');
      // show alert
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, color = '', message = '') => {
    setAlert({ show, color, message });
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, 'red', 'note removed');
  };
  const changeItem = (id) => {
    const item = list.find((item) => item.id === id);
    setName(item.title);
    setIsEditing(true);
    setEditID(id);
    setEditItem(id);
  };
  return (
    <div className="flex flex-col items-center h-screen ">
      <div className="block p-6 max-w-lg w-full min-wd-md bg-gray-600 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 my-auto ">
        <form action="" className="mt-4" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert alert={alert} removeAlert={showAlert} list={list} />
          )}
          <h1 className="text-3xl font-bold underline text-white">
            Grocery Buddy
          </h1>
          <div>
            <input
              type="text"
              className="block w-full p-2 my-2 bg-gray-200 rounded-lg border border-gray-200 focus:outline-none focus:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:focus:bg-gray-700"
              placeholder="Add an item"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className="block w-full p-2 my-2 bg-gray-200 rounded-lg border border-gray-200 focus:outline-none focus:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:focus:bg-gray-700"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <>
            <List
              items={list}
              removeItem={removeItem}
              changeItem={changeItem}
            />
            <div className="flex flex-col items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                  setList([]);
                  showAlert(true, 'blue', 'list cleared');
                }}
              >
                Clear Items
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
