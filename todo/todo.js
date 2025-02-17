const fs=require("fs");
const filePath = "./tasks.json";

const loadTasks = () =>{
    try{
        const dataBuffer = fs.readFileSync(filePath) // Reads the file as a buffer
        const dataJSON = dataBuffer.toString(); // Converts buffer to a string
        return JSON.parse(dataJSON); // Parses JSON string into an object
    }
    catch(error){
        return [] //Returns an empty array if file reading fails
    }
};

const saveTasks = (tasks) =>{
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath, dataJSON);
};

const addTask = (task) =>{
    const tasks = loadTasks(); 
    tasks.push({task});
    saveTasks(tasks);
    console.log("Task added", task);
};

const listTasks =() =>{
    const tasks = loadTasks();
    tasks.forEach((task, index)=> console.log(`${index+1} - ${task.task}`));
}

const command = process.argv[2];
const argument = process.argv[3];

switch(command){
    case "add":
        addTask(argument);
        break;

    case "list":
        listTasks();
        break;

    case "remove":
        removeTasks(parseInt(argument));
        break;

    default:
        console.log("Command not found !");
}