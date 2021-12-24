// Select elements
const form = document.querySelector('form')
const task = document.getElementById('task')
const dayAndTime = document.getElementById('day-and-time')
const taskList = document.querySelector('.task-list')

taskList.innerHTML = ''

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

  // Adding tas to the taskList
  if (task.value && dayAndTime.value) {
    taskList.insertAdjacentHTML('beforeend', listItemHtml)
  }

  // Clear the input fields
  task.value = ''
  dayAndTime.value = ''
})

// removing the task from the taskList
taskList.addEventListener('click', e => {
  e.target.closest('.list-item').remove()
})
