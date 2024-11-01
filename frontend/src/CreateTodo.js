import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTodo() {
    const [name, setName] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const navigate = useNavigate();

    const addTodo = () => {
        fetch('http://localhost:5008/todoitems', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, isComplete }),
        })
            .then(response => response.json())
            .then(() => {
                setName('');
                setIsComplete(false);
                navigate('/list');  // Redirect to the list page
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Create New Todo</h2>
            <button onClick={() => navigate('/')}>Back</button>
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
            <button onClick={addTodo}>Add Todo</button>
        </div>
    );
}

export default CreateTodo;
