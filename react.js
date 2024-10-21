class Task {
    constructor(name) {
        this.name = name;
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(name) {
        const task = new Task(name);
        this.tasks.push(task);
    }

    completeTask(name) {
        const task = this.tasks.find(t => t.name === name);
        if (task) {
            task.complete();
        } else {
            throw new Error(`Task "${name}" not found.`);
        }
    }

    getSummary() {
        const completedTasks = this.tasks.filter(t => t.completed);
        const pendingTasks = this.tasks.filter(t => !t.completed);

        return {
            completed: completedTasks.length,
            pending: pendingTasks.length,
            tasks: this.tasks.map(t => ({
                name: t.name,
                completed: t.completed
            }))
        };
    }

    async saveTasks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate saving tasks to a database
                console.log("Tasks saved:", this.tasks);
                resolve("Tasks saved successfully.");
            }, 2000);
        });
    }
}

(async () => {
    const taskManager = new TaskManager();
    taskManager.addTask("Learn JavaScript");
    taskManager.addTask("Build a project");
    
    try {
        taskManager.completeTask("Learn JavaScript");
        const summary = taskManager.getSummary();
        console.log("Task Summary:", summary);

        const saveMessage = await taskManager.saveTasks();
        console.log(saveMessage);
    } catch (error) {
        console.error(error.message);
    }
})();
