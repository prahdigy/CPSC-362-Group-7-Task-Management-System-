// Function to fetch tasks from the backend
function fetchTasks() {
    fetch('/todos')
      .then(response => response.json())
      .then(tasks => {
        // Update UI with fetched tasks
        console.log('Fetched tasks:', tasks);
        // Example: Render tasks in a Kanban board UI
        renderTasks(tasks);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
}
  
// Function to add a new task
function addTask(taskData) {
  fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })
    .then(response => response.json())
    .then(newTask => {
      // Update UI with the new task
      console.log('New task added:', newTask);
      // Example: Add the new task to the Kanban board UI
      addTaskToUI(newTask);
    })
    .catch(error => {
      console.error('Error adding task:', error);
    });
}
  
// Function to update a task
function updateTask(taskId, updatedTaskData) {
  fetch(`/todos/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTaskData),
  })
    .then(response => response.json())
    .then(updatedTask => {
      // Update UI with the updated task
      console.log('Task updated:', updatedTask);
      // Example: Update the task in the Kanban board UI
      updateTaskInUI(updatedTask);
    })
    .catch(error => {
      console.error('Error updating task:', error);
    });
}

// Function to delete a task
function deleteTask(taskId) {
  fetch(`/todos/${taskId}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      // Update UI (e.g., remove the deleted task)
      console.log('Task deleted:', data.message);
      // Example: Remove the task from the Kanban board UI
      removeTaskFromUI(taskId);
    })
    .catch(error => {
      console.error('Error deleting task:', error);
    });
}
