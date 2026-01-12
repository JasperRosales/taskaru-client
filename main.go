package main

import (
	"fmt"
	"os"

	tea "github.com/charmbracelet/bubbletea"
)

type model struct {
	title  string
	cursor int
}

func (m model) Init() tea.Cmd {
	return nil
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg.(type) {
	case tea.KeyMsg:
		return m, tea.Quit
	}
	return m, nil
}

func (m model) View() string {
	s := fmt.Sprintf(`==================================
  Taskaru - Task Manager
==================================

Welcome to Taskaru Task Manager!

This is your task management terminal interface.

Available commands:
  > help  - Show available commands
  > list  - List tasks
  > add   - Add a new task
  > quit  - Exit the application

==================================

Press any key to exit...

`)
	return s
}

func main() {
	p := tea.NewProgram(
		model{title: "Taskaru"},
		tea.WithAltScreen(),
	)

	if _, err := p.Run(); err != nil {
		fmt.Printf("Error running application: %v\n", err)
		os.Exit(1)
	}
}
