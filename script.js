function startApp(){
const input=document.getElementById("inputField");
const form=document.getElementById("todo-form");
const list=document.getElementById("todo-list");
const clearAll=document.getElementById("clear-all");
const markAll=document.getElementById("mark-all");
const darkmode=document.getElementById("dark-mode");
 console.log("hello");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(input.value.trim()){
        addTask(input.value);
        input.value="";
    }
    // addTask(input.value);
    // input.value="";
});
// let item1={
//     label:"this is the task",
//     checked:false,
// };

function syntask(){
    const tasks=[];
    const currentTask=list.querySelectorAll(".todo-task");
    currentTask.forEach((task)=>{
const label=task.querySelector(".task-todo-span");
const completed=task.querySelector(".task-todo-staus");
if(label && completed){
    const l=label.innerText;
    const c=completed.classList.contains("checked");
    tasks.push({l,c});
}

    });
    localStorage.setItem("todos",JSON.stringify(tasks));
}

function addTask(label,checked=false){
    const item=document.createElement("li");
    item.classList.add("todo-task");

    const span=document.createElement("span");
    span.classList.add("todo-task-span");
    span.innerText=label;
    if(checked) span.classList.add("completed");
    span.addEventListener("click",()=>{
        span.contentEditable=true;
        span.focus();
        span.addEventListener("blur",()=>{
            span.contentEditable=flase;
            syntask();
        });
    });
 
    const check=document.createElement("img");
    check.classList.add("todo-task-status",checked?"checked":"unchecked");
    // check.classList.add(checked?"checked":"unchecked");
    check.src=checked?"checkbox-checked-svgrepo-com.svg":"checkbox-unchecked-svgrepo-com.svg";//
    check.addEventListener("click",()=>{
        check.classList.toggle("checked");
        span.classList.toggle("completed");
        check.src=check.classList.contains("checked")?"checkbox-checked-svgrepo-com.svg":"checkbox-unchecked-svgrepo-com.svg";
        syntask();
    });

    const trash=document.createElement("img");
    trash.classList.add("todo-task-status");
    trash.src="trash-bin-minimalistic-svgrepo-com.svg";
     trash.addEventListener("click",()=>{
        item.remove();
        syntask();
     });

    item.append(span,check,trash);
    list.appendChild(item);
     syntask();
     
}
const savedTasks = JSON.parse(localStorage.getItem("todos") || "[]");
savedTasks.forEach((task) => addTask(task.label, task.checked));
// syntask();

darkmode.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
    syntask();
});

clearAll.addEventListener("click",()=>{
    list.innerHTML="";
    syntask();
});
markAll.addEventListener("click",()=>{
    const tasks=list.querySelectorAll(".todo-task");
    tasks.forEach((task)=>{
        const check=task.querySelector(".todo-task-status");
        const span=task.querySelector(".todo-task-span");
        if(check.classList.contains("checked")==false){
            check.classList.add("checked");
            span.classList.add("completed");
            check.src="checkbox-checked-svgrepo-com.svg";
        }
    })
    syntask();
})

}
document.addEventListener("DOMContentLoaded",startApp);
//use trim to not insert empty string to the list 
//strick the completd task and clear all task with one button for makr all ans remove all.
//add functionality like make to do list like dark mode add span as input but default it is readable but if we click on it then it shoudl be editable.