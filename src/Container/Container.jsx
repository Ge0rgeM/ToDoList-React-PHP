import styles from "./Container.module.css";
import React, { useEffect, useState, useRef } from "react";
import garbagePhoto from "../assets/garbage.png";
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

function Container() {
    const [initialData, setInitialData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
    const [id, setId] = useState(0);
    const navigate = useNavigate();
    const hasFetched = useRef(false);
    const [isSaving, setIsSaving] = useState(false);
    const [username, setUsername] = useState('User Not Logged In!');
    useEffect(() => {
        if (hasFetched.current) return;
            hasFetched.current = true;

        fetch('http://localhost:8000/loadTasksFromDb.php', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then((response) => response.json())
        .then(data => {
            setUsername(u => u = data.data.username);
            data.data.tasks.forEach(element => {
                const newTask = {id: element.id, taskTxt: element.tasks_text, isDone: element.tasks_status === "pending" ? false : true};
                console.log("new task:", newTask);
                setId(i => i = element.id + 1);
                setInitialData(i => [...i, newTask]);
                setTasks(t => [...t, newTask]);
            });
            console.log("server reponse:", data);
        })
        .catch(err => {
            console.log("Error:", err);
        });

    }, []);
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
    const handleSaving = async () => {
        if(isSaving) return; // Prevent multiple saves

        setIsSaving(i => i = true);

        return new Promise((resolve, reject) => {
            setInitialData([]);
            tasks.forEach((task) => {
                setInitialData(i => [...i, task]);
            });

            fetch('http://localhost:8000/server.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tasks),
                credentials: 'include'
            })
            .then((response) => response.json())
            .then(data => {
                resolve();
            })
            .catch(err => {
                reject(err);
            })
            .finally(() => {
                setIsSaving(i => i = false);
            });
        });
    }
    async function logout() {
        try {
            const response = await fetch('http://localhost:8000/logout.php', {
                method: 'POST',
                credentials: 'include', // very important for sessions
            });

            if (response.ok) {
                // Clear any React state or context, then redirect or update UI
                navigate('/login');
                console.log('Logged out');
            } else {
                console.error('Logout failed', response);
            }
        } catch (err) {
            console.error('ErrorLogOut:', err);
        }
    }
    async function handleLogOut() {
        if (!_.isEqual(initialData, tasks)) {
            console.log("Atasks:", tasks);
            console.log(initialData);
            if (window.confirm("You have unsaved changes. Do you want to save them before logging out?")) {
                await handleSaving(); // wait for saving to finish
            }
        }
        await logout(); // logout only after saving or if no changes
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.userName}>{username}</div>
                <button className = {styles.butn_logout} onClick={handleLogOut}>Logout</button>
                <div className={styles.inputsWrapper}>
                    <input type="text" value = {taskText} className = {styles.inputCss} placeholder={"Task To Be Done..."} onChange={handleTaskChange} onKeyDown={handleKeyPress}/>
                    <button className = {styles.butn} onClick={handleTaskAdd}>Add</button>
                    <button className = {styles.butn} onClick={handleSaving} disabled={isSaving}>{isSaving?'Saving...':'Save'}</button>
                </div>
                <div id="tasksListContainer" className ={styles.tasksListWrapper}> 
                    {tasks.map((task) => <div className={styles.task} key={task.id}>
                        <div onClick={() => taskTextClickerHandler(task.id)} className={`${styles.taskText} ${task.isDone ? styles.strike : ""}`}>{task.taskTxt}</div>
                        <div><img onClick={() => removeTaskHandler(task.id)} className={styles.deleteImgButn} src={garbagePhoto} alt="remove" width="40px"></img></div>
                    </div>)}
                </div>
            </div>
        </>
    );
}

export default Container;