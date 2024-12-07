// Initialize tasks array and fetch from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Select DOM elements
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskButton');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskDueDate = document.getElementById('taskDueDate');
const taskPriority = document.getElementById('taskPriority');
const taskModal = document.getElementById('taskModal');
const saveChangesButton = document.getElementById('saveChanges');
const closeModalButton = document.querySelector('.close-btn');
const editTitle = document.getElementById('editTitle');
const editDescription = document.getElementById('editDescription');
const editDueDate = document.getElementById('editDueDate');
const editPriority = document.getElementById('editPriority');
let editingTaskId = null;

// Function to render tasks to the DOM
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.title} - ${task.priority}</span>
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask() {
  const task = {
    title: taskTitle.value,
    description: taskDescription.value,
    dueDate: taskDueDate.value,
    priority: taskPriority.value,
  };
  
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  clearInputs();
}

// Function to edit an existing task
function editTask(index) {
  const task = tasks[index];
  editingTaskId = index;

  // Fill the modal inputs with the task data
  editTitle.value = task.title;
  editDescription.value = task.description;
  editDueDate.value = task.dueDate;
  editPriority.value = task.priority;

  taskModal.style.display = 'flex';
}

// Function to save changes to a task
function saveChanges() {
  const updatedTask = {
    title: editTitle.value,
    description: editDescription.value,
    dueDate: editDueDate.value,
    priority: editPriority.value,
  };

  tasks[editingTaskId] = updatedTask;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  taskModal.style.display = 'none';
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Function to clear input fields after adding task
function clearInputs() {
  taskTitle.value = '';
  taskDescription.value = '';
  taskDueDate.value = '';
  taskPriority.value = 'high';
}

// Event listeners for task creation and modal actions
addTaskButton.addEventListener('click', addTask);
saveChangesButton.addEventListener('click', saveChanges);
closeModalButton.addEventListener('click', () => {
  taskModal.style.display = 'none';
});

// Initial render of tasks
renderTasks();
