
class Task{
    id;
    detail
    completed;

    constructor(detail){
        this.id = Math.ceil(Math.random()*1000);
        this.detail = detail;
        this.completed = false;
    }

}

class TaskManager{
    taskArray;

    constructor(){
        this.taskArray=[];
    }

    addTask(text){
        this.taskArray.push((new Task(text)))
    }
    deleteTask(id){
        this.taskArray = this.taskArray.filter((action) => action.id != id);
    }
    updateTask(id,text){
        let upTask = this.taskArray.find((action) => action.id == id);
        let indexUp = this.taskArray.indexOf(upTask);
        this.taskArray[indexUp].detail =text;
    }
    compleTaks(id){
        let comTask = this.taskArray.find((action) => action.id == id)
        let indexCom = this.taskArray.indexOf(comTask);
        this.taskArray[indexCom].completed = true;
    }
}

let arrayTask = new TaskManager;
// alert(arrayTask);

if(localStorage.getItem("tasks") == null){
}else{
    arrayTask.taskArray = JSON.parse(localStorage.getItem("tasks"));
    showTasks();
}

function add(){
    arrayTask.addTask(document.getElementById('detailTask').value);
    document.getElementById('detailTask').value ="";
    showTasks();
}

function end(id){
    arrayTask.deleteTask(id);
    showTasks();
}

function complete(id){
    arrayTask.compleTaks(id);
    showTasks();
}

function update(id){
    let mess = prompt("Enter new name: ");
    arrayTask.updateTask(id,mess);
    showTasks();
}

function showTasks(){
    document.getElementById('completedTasks').innerHTML= "";
    document.getElementById('activeTasks').innerHTML= "";

    for (const x of arrayTask.taskArray) {
        if(x.completed){
            document.getElementById('completedTasks').innerHTML +=
            `
            <div id="taskComCon">
            <textarea id="comTask" readonly>${x.detail}</textarea><button disabled id="endTaskCom"><img id="comp" src="/com.jpg"></button><button disabled id="deletCom"><img id="bin" src="/bin.jpg"></button><button disabled id="editCom"><img id="editi" src="/edit.jpg"></button>
            </div>
            `

        }else{
            document.getElementById('activeTasks').innerHTML += 
            `
            <div id="taskCon">
            <textarea id="taskText" readonly>${x.detail}</textarea><button id="endTask" onclick="complete(${x.id})"><img id="comp" src="/com.jpg"></button><button id="delet" onclick="end(${x.id})"><img id="bin" src="/bin.jpg"></button><button id="edit" onclick="update(${x.id})"><img id="editi" src="/edit.jpg"></button>
            </div>
            `
        }    
    }
    localStorage.setItem("tasks",JSON.stringify(arrayTask.taskArray));
}

function clearLocal(){
    localStorage.clear();
    arrayTask = new TaskManager;
    document.getElementById('completedTasks').innerHTML= "";
    document.getElementById('activeTasks').innerHTML= "";
}



