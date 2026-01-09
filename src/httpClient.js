const axios = require('axios');

class HttpClient {
  constructor(baseURL = process.env.TASKARU_SERVER_URL || 'http://localhost:3000') {
    this.client = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getTasks() {
    try {
      const response = await this.client.get('/tasks');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTask(id) {
    try {
      const response = await this.client.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createTask(task) {
    try {
      const response = await this.client.post('/tasks', task);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateTask(id, updates) {
    try {
      const response = await this.client.put(`/tasks/${id}`, updates);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteTask(id) {
    try {
      const response = await this.client.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async completeTask(id) {
    try {
      const response = await this.client.patch(`/tasks/${id}/complete`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Unable to connect to server. Please ensure the server is running.');
    } else if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response received from server. Please check your network connection.');
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
}

module.exports = HttpClient;
