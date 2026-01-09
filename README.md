# Taskaru Client

A powerful CLI tool for task management with HTTP request capabilities. Taskaru can work both in offline mode (using local storage) and online mode (connecting to a server).

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as completed
- ✅ List all tasks with filtering options
- ✅ Offline mode with local storage
- ✅ HTTP mode for server integration
- ✅ Simple and intuitive command-line interface

## Installation

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/JasperRosales/taskaru-client.git
cd taskaru-client
```

2. Install dependencies:
```bash
npm install
```

3. Link the CLI globally (optional):
```bash
npm link
```

### Global Installation (when published)

```bash
npm install -g taskaru-client
```

## Usage

### Basic Commands

#### Add a new task
```bash
taskaru add --title "Buy groceries"
taskaru add --title "Complete project" --description "Finish the CLI implementation"
```

#### List all tasks
```bash
taskaru list
```

#### List completed tasks only
```bash
taskaru list --completed
```

#### List pending tasks only
```bash
taskaru list --pending
```

#### Get task details
```bash
taskaru get 1
```

#### Update a task
```bash
taskaru update 1 --title "Updated title"
taskaru update 1 --description "Updated description"
taskaru update 1 --title "New title" --description "New description"
```

#### Mark task as completed
```bash
taskaru complete 1
```

#### Delete a task
```bash
taskaru delete 1
```

### Server Mode

By default, Taskaru operates in offline mode using local storage. To use server mode:

```bash
# Use default server URL (http://localhost:3000)
taskaru add --title "Task" --server

# Use custom server URL
taskaru list --server --server-url "https://api.example.com"

# Set environment variable for server URL
export TASKARU_SERVER_URL="https://api.example.com"
taskaru list --server
```

### Help

For more information about any command:
```bash
taskaru --help
taskaru add --help
taskaru list --help
```

## API Endpoints (for server implementation)

The CLI expects the following REST API endpoints:

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `PATCH /tasks/:id/complete` - Mark task as completed
- `DELETE /tasks/:id` - Delete a task

### Task Object Structure

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "createdAt": "2026-01-09T12:00:00.000Z",
  "updatedAt": "2026-01-09T12:00:00.000Z"
}
```

## Local Storage

When using offline mode, tasks are stored in:
- Unix/Linux/macOS: `~/.taskaru/tasks.json`
- Windows: `C:\Users\<username>\.taskaru\tasks.json`

## Project Structure

```
taskaru-client/
├── bin/
│   └── taskaru.js          # CLI executable
├── src/
│   ├── index.js            # Main CLI logic
│   ├── taskManager.js      # Task manager orchestrator
│   ├── httpClient.js       # HTTP client for server requests
│   └── localStorage.js     # Local storage implementation
├── package.json
└── README.md
```

## Development

### Running locally

```bash
node bin/taskaru.js add --title "Test task"
```

or after linking:

```bash
taskaru add --title "Test task"
```

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.