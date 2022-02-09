// Select elements
const form = document.querySelector('form')
const task = document.getElementById('task')
const dayAndTime = document.getElementById('day-and-time')
const taskList = document.querySelector('.task-list')
const template = document.querySelector('template')

form.addEventListener('submit', e => {
  e.preventDefault()

  // generate the listItem html
  const listItemHtml = `
    <div class="list-item">
      <div class="left">
        <h4>${task.value}</h4>
        <p>${dayAndTime.value}</p>
      </div>
      <div class="right">
        <button><ion-icon name="trash-outline"></ion-icon></button>
      </div>
    </div>
  `
  const listItemTemplate = template.content.cloneNode(true).children[0]
  const taskName = listItemTemplate.querySelector('h4')
  const date = listItemTemplate.querySelector('p')
  taskName.textContent = task.value
  date.textContent = dayAndTime.value

  // Adding task to the taskList
  if (task.value && dayAndTime.value) {
    taskList.append(listItemTemplate)
  }

  // Clear the input fields
  task.value = ''
  dayAndTime.value = ''
})

// removing the task from the taskList
taskList.addEventListener('click', e => {
  if (e.target.closest('.trash-icon')) {
    e.target.closest('.list-item').remove()
  }
})
