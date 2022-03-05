// Select elements
const form = document.querySelector('form')
const inputTask = document.getElementById('task')
const inputDayAndTime = document.getElementById('day-and-time')
const taskList = document.querySelector('.task-list')
const template = document.querySelector('template')
const errorMsg = document.querySelector('.error-msg')

let tasks = []

const renderTasks = function (tasks) {
  taskList.innerHTML = ''

  tasks.forEach(task => {
    const listItemTemplate = template.content.cloneNode(true).children[0]
    const taskName = listItemTemplate.querySelector('h4')
    const date = listItemTemplate.querySelector('p')
    listItemTemplate.id = task.id
    taskName.textContent = task.taskName
    date.textContent = task.dayAndTime

    // Adding task to the taskList
    taskList.append(listItemTemplate)
  })
}

// Save tasks in LocalStorage
const setLocalStorage = function (tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Get data from LocalStorage and assign it to tasks Array
const getLocalStorage = function () {
  // If localstorge returns null then assign []
  tasks = JSON.parse(localStorage.getItem('tasks')) || []

  if (!tasks) return

  renderTasks(tasks)
}

const createTask = function () {
  tasks.push({
    taskName: inputTask.value,
    dayAndTime: inputDayAndTime.value,
    id: Number(`${Date.now()}`.slice(-10))
  })

  setLocalStorage(tasks)
}

const addTask = function (e) {
  e.preventDefault()
  if (!inputTask.value || !inputDayAndTime.value) {
    errorMsg.classList.remove('hidden')
    return
  }

  errorMsg.classList.add('hidden')
  createTask()
  renderTasks(tasks)

  // Clear the input fields
  inputTask.value = ''
  inputDayAndTime.value = ''
}

const deleteTasks = function (e) {
  if (!e.target.closest('.trash-icon')) return

  const taskClicked = e.target.closest('.list-item')
  // filtering the tasks other than the deleted task
  tasks = tasks.filter(task => task.id !== Number(taskClicked.id))
  // deleting the task
  taskClicked.remove()

  setLocalStorage(tasks)
}

// Handling the submit event
form.addEventListener('submit', addTask)

// removing the task from the taskList
taskList.addEventListener('click', deleteTasks)

getLocalStorage()
