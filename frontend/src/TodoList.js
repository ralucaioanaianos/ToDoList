import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TodoList() {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        fetch('http://localhost:5008/todoitems')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    };

    const updateTodo = () => {
        fetch(`http://localhost:5008/todoitems/${selectedId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, isComplete }),
        })
            .then(() => {
                setName('');
                setIsComplete(false);
                setSelectedId(null);
                fetchTodos();
            })
            .catch(error => console.error(error));
    };

    const deleteTodo = (id) => {
        fetch(`http://localhost:5008/todoitems/${id}`, { method: 'DELETE' })
            .then(() => fetchTodos())
            .catch(error => console.error(error));
    };

    const handleEdit = (todo) => {
        setSelectedId(todo.id);
        setName(todo.name);
        setIsComplete(todo.isComplete);
    };

    return (
        <div>
            <h2>All Todos</h2>
            <button onClick={() => navigate('/')}>Back</button>
            <ul>
                {data.map((todo) => (
                    <li key={todo.id}>
                        <span>{todo.name}</span>
                        <span>{todo.isComplete ? ' (Complete)' : ''}</span>
                        <button onClick={() => handleEdit(todo)}>Edit</button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {selectedId && (
                <div>
                    <h3>Edit Todo</h3>
                    <input
                        type="text"
                        placeholder="Todo Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={isComplete}
                            onChange={(e) => setIsComplete(e.target.checked)}
                        />
                        Complete
                    </label>
                    <button onClick={updateTodo}>Update Todo</button>
                    <button onClick={() => setSelectedId(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default TodoList;
