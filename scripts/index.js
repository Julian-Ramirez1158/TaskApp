// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);

// Select the New Task Form
const newTaskForm = document.getElementById('form');

// Load the tasks from localStorage
taskManager.load();

// Render the tasks to the page
taskManager.render();

// Select/hide alert components for validation
let nameAlert = document.getElementById('nameAlert');
nameAlert.hidden = true;
let descriptionAlert = document.getElementById('descriptionAlert');
descriptionAlert.hidden = true;
let assignedToAlert = document.getElementById('assignedToAlert');
assignedToAlert.hidden = true;
let dueDateAlert = document.getElementById('dueDateAlert');
dueDateAlert.hidden = true;
let statusAlert = document.getElementById('statusAlert');
statusAlert.hidden = true;

// let alert = document.getElementsByClassName('class');
// alert.hidden = true;

// Boolean that is returned from validator function
let validInput = false;

// Number of form inputs validated
// let numValidInputs = 0;


// Add an 'onsubmit' event listener
newTaskForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();

    // Select the inputs
    const newTaskNameInput = document.getElementById('name');
    const newTaskDescription = document.getElementById('description');
    const newTaskAssignedTo = document.getElementById('assignedTo');
    const newTaskDueDate = document.getElementById('dueDate');
    const newTaskStatus = document.getElementById('select');

    // Get the values of the inputs
    const name = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value;
    const dueDate = newTaskDueDate.value;
    const status = newTaskStatus.value;

    /*
        Validation code here
    */

    validFormFieldInput (name, description, assignedTo, dueDate, status);
    
    if (validInput === true) {
        // Add the task to the task manager
        taskManager.addTask(name, description, assignedTo, dueDate);
        // Render the tasks
        taskManager.render();
    }
    else {
        return;
    }

    // Save the tasks to localStorage
    taskManager.save();
    

    // Clear the form
    newTaskNameInput.value = '';
    newTaskDescription.value = '';
    newTaskAssignedTo.value = '';
    newTaskDueDate.value = '';
    newTaskStatus.value = '';

    // hides alerts that popped up from previous validations after submit
    nameAlert.hidden = true;
    descriptionAlert.hidden = true;
    assignedToAlert.hidden = true;
    dueDateAlert.hidden = true;
    statusAlert.hidden = true;

    // keeps from submitting empty tasks after first submit/validation
    validInput = false;
});


function validFormFieldInput (name, description, assignedTo, dueDate, status) {
    
    // let formInputs = [name, description, assignedTo, dueDate, status]

    // for (let i = 0; i < formInputs.length; i++) {
    //     for (let j = 0; j < alert.length; j++) {
    //         if (formInputs[i] === null || formInputs[i] === '') {
    //             alert[j].hidden = false;
    //         }
    //         else {
    //             alert[j].hidden = true;
    //         }
    //     }
    //     if (alert.hidden === true) {
    //         validInput = true;
    //     }
    // }

    
    // return validInput;

    if (name === null || name === '') {
        nameAlert.hidden = false;
    }
    else if (description === null || description === '') {
        descriptionAlert.hidden = false;
    }
    else if (assignedTo === null || assignedTo === '') {
        assignedToAlert.hidden = false;
    }
    else if (dueDate === null || dueDate === '') {
        dueDateAlert.hidden = false;
    }
    else if (status === null || status === '') {
        statusAlert.hidden = false;
    }
    else {
        validInput = true;
    }
    return validInput;

}

const tasksList = document.querySelector('.list-group');

tasksList.addEventListener('click', (event) => {
     // Check if a "Mark As Done" button was clicked
    if(event.target.classList.contains('done-button')){
        // Get the parent Task
        const parentTask = event.target.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Get the task from the TaskManager using the taskId
        const task = taskManager.getTaskById(taskId);

        // Update the task status to 'DONE'
        console.log(task.status);
        task.status = 'DONE';

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }

    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
})



// let taskHTML = createHTML('trash', 'take out trash', 'Julian', 'TODAY!!!', 'TODO');
// console.log(taskHTML);