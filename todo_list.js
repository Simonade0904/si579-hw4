const taskList = document.querySelector('#task_list');
const addButton = document.querySelector('#add_task');
const duedateInput = document.querySelector('#duedate_input');
const duetimeInput = document.querySelector('#duetime_input');
const descriptionInput = document.querySelector('#task_description_input');

addTask("Do SI579 homework", 1639944400000);
addTask("Do SI622 homework", 1639745800000);
addTask("Do SI504 homework", 1639759800000);


function addTask(description, dueTime = false) {
    let newTask = document.createElement("li");
    if (dueTime){
        let date = new Date(dueTime);

        dueTime_str = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

        newTask.innerHTML = `${description} <span class="due">due ${dueTime_str} </span><button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`;
    }
    else {
        newTask.innerHTML = `${description} <button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`
    }
    let doneButton = newTask.querySelector('.done');
    doneButton.addEventListener("click", function(){
        newTask.remove();
    })
    descriptionInput.value = '';
    duedateInput.value = '';
    duetimeInput.value = '';
    taskList.append(newTask);
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

addButton.addEventListener('click', generateTask);

function generateTask() {
    const descriptionInput_text = descriptionInput.value;
    console.log("activated");
    timeStamp = dateAndTimeToTimestamp(duedateInput, duetimeInput);
    addTask(descriptionInput_text, timeStamp);
}

descriptionInput.addEventListener('keydown',generateTask_Key);

function generateTask_Key(e) {
    if (e.keyCode === 13){
        generateTask();
    }
}