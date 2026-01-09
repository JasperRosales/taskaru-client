const { Command } = require('commander');
const TaskManager = require('./taskManager');

const program = new Command();

program
  .name('taskaru')
  .description('A CLI tool for task management with HTTP request capabilities')
  .version('1.0.0')
  .option('--server', 'Use server mode instead of local storage')
  .option('--server-url <url>', 'Set the server URL (default: http://localhost:3000)');

// Add task command
program
  .command('add')
  .description('Add a new task')
  .requiredOption('-t, --title <title>', 'Task title')
  .option('-d, --description <description>', 'Task description')
  .action(async (options) => {
    try {
      const useServer = program.opts().server;
      if (program.opts().serverUrl) {
        process.env.TASKARU_SERVER_URL = program.opts().serverUrl;
      }
      const manager = new TaskManager(useServer);
      const task = await manager.createTask({
        title: options.title,
        description: options.description || ''
      });
      console.log('✓ Task created successfully:');
      console.log(`  ID: ${task.id}`);
      console.log(`  Title: ${task.title}`);
      if (task.description) console.log(`  Description: ${task.description}`);
    } catch (error) {
      console.error('✗ Error creating task:', error.message);
      process.exit(1);
    }
  });

// List tasks command
program
  .command('list')
  .description('List all tasks')
  .option('-c, --completed', 'Show only completed tasks')
  .option('-p, --pending', 'Show only pending tasks')
  .action(async (options) => {
    try {
      const useServer = program.opts().server;
      if (program.opts().serverUrl) {
        process.env.TASKARU_SERVER_URL = program.opts().serverUrl;
      }
      const manager = new TaskManager(useServer);
      let tasks = await manager.getTasks();
      
      if (options.completed) {
        tasks = tasks.filter(task => task.completed);
      } else if (options.pending) {
        tasks = tasks.filter(task => !task.completed);
      }

      if (tasks.length === 0) {
        console.log('No tasks found.');
        return;
      }

      console.log('\nTasks:');
      console.log('─────────────────────────────────────────────────────');
      tasks.forEach(task => {
        const status = task.completed ? '✓' : '○';
        console.log(`${status} [${task.id}] ${task.title}`);
        if (task.description) {
          console.log(`    ${task.description}`);
        }
      });
      console.log('─────────────────────────────────────────────────────');
      console.log(`Total: ${tasks.length} task(s)`);
    } catch (error) {
      console.error('✗ Error listing tasks:', error.message);
      process.exit(1);
    }
  });

// Get task command
program
  .command('get <id>')
  .description('Get details of a specific task')
  .action(async (id) => {
    try {
      const useServer = program.opts().server;
      if (program.opts().serverUrl) {
        process.env.TASKARU_SERVER_URL = program.opts().serverUrl;
      }
      const manager = new TaskManager(useServer);
      const task = await manager.getTask(id);
      
      if (!task) {
        console.error(`✗ Task with id ${id} not found`);
        process.exit(1);
      }

      console.log('\nTask Details:');
      console.log('─────────────────────────────────────────────────────');
      console.log(`ID: ${task.id}`);
      console.log(`Title: ${task.title}`);
      console.log(`Description: ${task.description || 'N/A'}`);
      console.log(`Status: ${task.completed ? 'Completed' : 'Pending'}`);
      console.log(`Created: ${new Date(task.createdAt).toLocaleString()}`);
      console.log(`Updated: ${new Date(task.updatedAt).toLocaleString()}`);
      console.log('─────────────────────────────────────────────────────');
    } catch (error) {
      console.error('✗ Error getting task:', error.message);
      process.exit(1);
    }
  });

// Update task command
program
  .command('update <id>')
  .description('Update a task')
  .option('-t, --title <title>', 'New task title')
  .option('-d, --description <description>', 'New task description')
  .action(async (id, options) => {
    try {
      const useServer = program.opts().server;
      if (program.opts().serverUrl) {
        process.env.TASKARU_SERVER_URL = program.opts().serverUrl;
      }
      
      if (!options.title && !options.description) {
        console.error('✗ Please provide at least one field to update (--title or --description)');
        process.exit(1);
      }

      const manager = new TaskManager(useServer);
      const updates = {};
      if (options.title) updates.title = options.title;
      if (options.description) updates.description = options.description;
      
      const task = await manager.updateTask(id, updates);
      console.log('✓ Task updated successfully:');
      console.log(`  ID: ${task.id}`);
      console.log(`  Title: ${task.title}`);
      if (task.description) console.log(`  Description: ${task.description}`);
    } catch (error) {
      console.error('✗ Error updating task:', error.message);
      process.exit(1);
    }
  });

// Complete task command
program
  .command('complete <id>')
  .description('Mark a task as completed')
  .action(async (id) => {
    try {
      const useServer = program.opts().server;
      if (program.opts().serverUrl) {
        process.env.TASKARU_SERVER_URL = program.opts().serverUrl;
      }
      const manager = new TaskManager(useServer);
      const task = await manager.completeTask(id);
      console.log(`✓ Task ${task.id} marked as completed`);
    } catch (error) {
      console.error('✗ Error completing task:', error.message);
      process.exit(1);
    }
  });

// Delete task command
program
  .command('delete <id>')
  .description('Delete a task')
  .action(async (id) => {
    try {
      const useServer = program.opts().server;
      if (program.opts().serverUrl) {
        process.env.TASKARU_SERVER_URL = program.opts().serverUrl;
      }
      const manager = new TaskManager(useServer);
      await manager.deleteTask(id);
      console.log(`✓ Task ${id} deleted successfully`);
    } catch (error) {
      console.error('✗ Error deleting task:', error.message);
      process.exit(1);
    }
  });

module.exports = program;
