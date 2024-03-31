import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import queryString from 'query-string'
import axios from 'axios'

const EditTodo = () => {
  const location = useLocation();
  const id = queryString.parse(location.search).id;
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    if (id) {
      async function fetchItem() {
        try {
          const response = await axios.get(`http://localhost:3002/todos/${id}`);
          setNewItem(response.data.title);
          setNewDate(response.data.Deadline);

        } catch (err) {

          console.log(err);
        }
      }
      fetchItem();
    } else {
      setNewItem('');
    }
  }, [id]);

  async function handleEdit(e) {
    e.preventDefault();

    if (newItem === '')
      return
    try {
      await axios.put('http://localhost:3002/todos/edit/', {
        UUID: id,
        title: newItem,
        Deadline: newDate
      })
      navigate('/home');

    }
    catch (err) {
      console.log(err);
 
    }
  }

  return (
    <form onSubmit={(e) => handleEdit(e)} className="new-item-form">
      <div className="form-row">
        <label htmlFor="EditItem">Edit Item: </label>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="EditItem"
        />
        <input
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          type="date"
          id="EditDateItem"
        />
      </div>
      <button className="btn" type='Submit'>Done</button>
    </form>
  )
}

export default EditTodo