const HttpClient = require('./httpClient');
const LocalStorage = require('./localStorage');

class TaskManager {
  constructor(useServer = false) {
    this.useServer = useServer;
    this.httpClient = new HttpClient();
    this.localStorage = new LocalStorage();
  }

  async getTasks() {
    if (this.useServer) {
      return await this.httpClient.getTasks();
    } else {
      return this.localStorage.getTasks();
    }
  }

  async getTask(id) {
    if (this.useServer) {
      return await this.httpClient.getTask(id);
    } else {
      return this.localStorage.getTask(id);
    }
  }

  async createTask(task) {
    if (this.useServer) {
      return await this.httpClient.createTask(task);
    } else {
      return this.localStorage.createTask(task);
    }
  }

  async updateTask(id, updates) {
    if (this.useServer) {
      return await this.httpClient.updateTask(id, updates);
    } else {
      return this.localStorage.updateTask(id, updates);
    }
  }

  async deleteTask(id) {
    if (this.useServer) {
      return await this.httpClient.deleteTask(id);
    } else {
      return this.localStorage.deleteTask(id);
    }
  }

  async completeTask(id) {
    if (this.useServer) {
      return await this.httpClient.completeTask(id);
    } else {
      return this.localStorage.completeTask(id);
    }
  }
}

module.exports = TaskManager;
