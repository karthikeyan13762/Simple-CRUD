//---------------------------
import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const list = [
    {
      id: 1,
      name: "Karthi",
      phone: "1234567890",
    },
    {
      id: 2,
      name: "Kanan",
      phone: "1234567890",
    },
  ];
  const [lists, setLists] = useState(list);
  const [update, setUpdate] = useState(-1);

  function handleEdit(id) {
    setUpdate(id);
  }

  function handleDelete(id) {
    const newList = lists.filter((li) => li.id !== id);
    setLists(newList);
  }

  function handleUpdate(id, updatedData) {
    const newList = lists.map((li) =>
      li.id === id ? { ...li, ...updatedData } : li
    );
    setLists(newList);
    setUpdate(-1);
  }

  return (
    <div className="crud">
      <div>
        <h2 className="heading">Simple CRUD</h2>
        <AddList setLists={setLists} />
        <form method="post">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((data) =>
                update === data.id ? (
                  <EditList
                    key={data.id}
                    data={data}
                    handleUpdate={handleUpdate}
                  />
                ) : (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.phone}</td>
                    <td>
                      <button
                        className="edit"
                        onClick={() => handleEdit(data.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

function EditList({ data, handleUpdate }) {
  const [formData, setFormData] = useState({
    name: data.name,
    phone: data.phone,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdate(data.id, formData);
  }

  return (
    <tr>
      <td>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
      </td>
      <td>
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          value={formData.phone}
        />
      </td>
      <td>
        <button type="submit" className="update" onClick={handleSubmit}>
          Update
        </button>
      </td>
    </tr>
  );
}

function AddList({ setLists }) {
  const nameRef = useRef();
  const phoneRef = useRef();

  function handleSubmmit(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const phone = e.target.elements.phone.value;
    const newList = {
      id: Date.now(),
      name,
      phone,
    };
    setLists((prev) => [...prev, newList]);
    nameRef.current.value = "";
    phoneRef.current.value = "";
  }

  return (
    <form className="addForm" onSubmit={handleSubmmit} method="post">
      <input
        type="text"
        name="name"
        placeholder="Enter your Name"
        ref={nameRef}
      />
      <input
        type="text"
        name="phone"
        placeholder="Enter your Phone"
        ref={phoneRef}
      />
      <button type="submit">+ADD</button>
    </form>
  );
}

export default App;
