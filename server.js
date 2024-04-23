const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());

// Server Frontend HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front.html'));
});

// MongoDB Connection
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define MongoDB schema
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
  dueDate: { type: Date, default: null },
});

const Todo = mongoose.model('Todo', taskSchema);

// Routes

// Get all Todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a new Todo
app.post('/todos', async (req, res) => {
    try {
        const { task, description, dueDate, status } = req.body;
        const newTodo = new Todo({ task, description, dueDate, status });
        const savedTodo = await newTodo.save();
        res.json(savedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a Todo by ID
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task, description, dueDate, status } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { task, description, dueDate, status }, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a Todo by ID
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
