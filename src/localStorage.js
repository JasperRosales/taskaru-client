const fs = require('fs');
const path = require('path');
const os = require('os');

class LocalStorage {
  constructor() {
    this.storageDir = path.join(os.homedir(), '.taskaru');
    this.storageFile = path.join(this.storageDir, 'tasks.json');
    this.ensureStorageExists();
  }

  ensureStorageExists() {
    if (!fs.existsSync(this.storageDir)) {
      fs.mkdirSync(this.storageDir, { recursive: true });
    }
    if (!fs.existsSync(this.storageFile)) {
      fs.writeFileSync(this.storageFile, JSON.stringify({ tasks: [], nextId: 1 }, null, 2));
    }
  }

  readData() {
    try {
      const data = fs.readFileSync(this.storageFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { tasks: [], nextId: 1 };
    }
  }

  writeData(data) {
    fs.writeFileSync(this.storageFile, JSON.stringify(data, null, 2));
  }

  getTasks() {
    const data = this.readData();
    return data.tasks;
  }

  getTask(id) {
    const data = this.readData();
    return data.tasks.find(task => task.id === parseInt(id));
  }

  createTask(task) {
    const data = this.readData();
    const newTask = {
      id: data.nextId++,
      title: task.title,
      description: task.description || '',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.tasks.push(newTask);
    this.writeData(data);
    return newTask;
  }

  updateTask(id, updates) {
    const data = this.readData();
    const taskIndex = data.tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    data.tasks[taskIndex] = {
      ...data.tasks[taskIndex],
      ...updates,
      id: data.tasks[taskIndex].id,
      updatedAt: new Date().toISOString()
    };
    this.writeData(data);
    return data.tasks[taskIndex];
  }

  deleteTask(id) {
    const data = this.readData();
    const taskIndex = data.tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    const deletedTask = data.tasks.splice(taskIndex, 1)[0];
    this.writeData(data);
    return deletedTask;
  }

  completeTask(id) {
    return this.updateTask(id, { completed: true });
  }
}

module.exports = LocalStorage;
