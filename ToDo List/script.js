document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const dueDateInput = document.getElementById("due-date");
    const prioritySelect = document.getElementById("priority");
    const taskList = document.getElementById("task-list");
    const categoryButtons = document.querySelectorAll(".category-button");

    let tasks = [];

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask(taskInput.value, dueDateInput.value, prioritySelect.value);
        taskInput.value = "";
        dueDateInput.value = "";
        prioritySelect.value = "low";
    });

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".category-button.active").classList.remove("active");
            button.classList.add("active");
            filterTasks(button.dataset.category);
        });
    });

    function addTask(name, dueDate, priority) {
        const task = {
            id: Date.now(),
            name,
            dueDate,
            priority,
            category: document.querySelector(".category-button.active").dataset.category,
            complete: false
        };
        tasks.push(task);
        displayTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        displayTasks();
    }

    function toggleCompleteTask(id) {
        const task = tasks.find(task => task.id === id);
        task.complete = !task.complete;
        displayTasks();
    }

    function filterTasks(category) {
        const filteredTasks = category === "all" ? tasks : tasks.filter(task => task.category === category);
        displayTasks(filteredTasks);
    }

    function displayTasks(filteredTasks = tasks) {
        taskList.innerHTML = "";
        filteredTasks.forEach(task => {
            const taskElement = document.createElement("li");
            taskElement.className = `task ${task.complete ? "complete" : ""}`;
            taskElement.innerHTML = `
                <span>${task.name} (Due: ${task.dueDate || "N/A"}) [${task.priority}]</span>
                <div class="task-actions">
                    <button class="complete-btn" onclick="toggleCompleteTask(${task.id})">Complete</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskElement);
        });
    }

    window.deleteTask = deleteTask;
    window.toggleCompleteTask = toggleCompleteTask;
});
