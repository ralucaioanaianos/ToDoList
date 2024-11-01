import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';

function App() {
    return (
        <Router>
            <div>
                <h1>Todo App</h1>
                <Link to="/create"><button>Create an Item</button></Link>
                <Link to="/list"><button>Show All Items</button></Link>

                <Routes>
                    <Route path="/create" element={<CreateTodo />} />
                    <Route path="/list" element={<TodoList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
