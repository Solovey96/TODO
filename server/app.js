const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')




const app = express()

const PORT = 3001;



const DB = {
  todos: []
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.get('/api/v1/todos', (req, res) => {
  return res.json(DB.todos)
})



app.post('/api/v1/todos', (req, res) => {
  const newToDo = {
    id: uuidv4(),
    text: req.body.text,
    completed: false
  }
  DB.todos.push(newToDo)
  return res.json(newToDo)
})

app.patch('/api/v1/todos', (req, res) => {
  const currentToDo = DB.todos.find(todo => todo.id === req.body.id)
  currentToDo.completed = !currentToDo.completed
  return res.json(currentToDo)
})


app.listen(PORT, () => {
  console.log(`server ok na ${PORT}`);
})
