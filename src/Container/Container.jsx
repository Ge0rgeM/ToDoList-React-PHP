import styles from "./Container.module.css";
import React, { useState } from "react";
import garbagePhoto from "../assets/garbage.png";
import $ from "jquery";

function Container() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
    const [id, setId] = useState(0);

    function checkTextInput(txt) {
        if (txt === "") {
            alert("Please enter a task");
            return false;
        }
        return true;
    }
    function handleTaskChange(e) {
        const val = e.target.value;
        setTaskText(t => t = val);
    }
    function handleTaskAdd() {
        if (!checkTextInput(taskText)) {
            return;
        }
        const newTask = {id: id, taskTxt: taskText, isDone: false};
        setTasks(t => [...t, newTask]);
        setTaskText(t => t = "");
        setId(i => i + 1);
    }
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            handleTaskAdd();
        }
    }
    function removeTaskHandler(index) {
        setTasks(t => t.filter((task, _) => task.id !== index));
    }
    function taskTextClickerHandler(index) {
        setTasks(t => t.map((task) => task.id === index ? {...task, isDone: !task.isDone} : task));
    }
    console.log(JSON.stringify(tasks))
    const handleSaving = () => {
        fetch('http://localhost:8000/server.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tasks),
        })
        .then((response) => response.json())
        .then(data => {
            console.log("server reponse:", data);
        })
        .catch(err => {
            console.log("Error:", err);
        });
    }
    return (
        <div className={styles.container}>
            <div className={styles.inputsWrapper}>
                <input type="text" value = {taskText} className = {styles.inputCss} placeholder={"Task To Be Done..."} onChange={handleTaskChange} onKeyDown={handleKeyPress}/>
                <button className = {styles.butn} onClick={handleTaskAdd}>Add</button>
                <button className = {styles.butn} onClick={handleSaving}>Save</button>
            </div>
            <div id="tasksListContainer" className ={styles.tasksListWrapper}> 
                {tasks.map((task) => <div className={styles.task} key={task.id}>
                    <div onClick={() => taskTextClickerHandler(task.id)} className={`${styles.taskText} ${task.isDone ? styles.strike : ""}`}>{task.taskTxt}</div>
                    <div><img onClick={() => removeTaskHandler(task.id)} className={styles.deleteImgButn} src={garbagePhoto} alt="remove" width="40px"></img></div>
                </div>)}
            </div>
        </div>
    );
}

export default Container;