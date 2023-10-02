interface Task {
  id: number;
  title: string;
}

const tasks: Task[] = [
  { id: 1, title: 'Workout at night' },
  { id: 2, title: 'Shop at mall' },
  { id: 3, title: 'Study in library' },
];

export default class TasksService {
  async getAllTasks() {
    return tasks;
  }

  async createTask(data: { title: string }) {
    const newTask = { id: tasks.length + 1, title: data.title };
    tasks.push(newTask);
    return newTask;
  }

  async getTask(id: number) {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error('task not found');
    }
    return task;
  }

  async updateTask(data: { id: number; title: string }) {
    const task = tasks.find((task) => task.id === data.id);
    if (!task) {
      throw new Error('task not found');
    }
    task.title = data.title;
    return task;
  }

  async deleteTask(id: number) {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error('task not found');
    }
    tasks.splice(tasks.indexOf(task), 1);
    return;
  }
}
