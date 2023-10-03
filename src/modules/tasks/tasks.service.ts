interface Task {
  id: number;
  title: string;
}

const tasks: Task[] = [
  { id: 1, title: 'Workout at night' },
  { id: 2, title: 'Shop after work' },
  { id: 3, title: 'Get dinner' },
  { id: 4, title: 'Pay bills' },
  { id: 5, title: 'Feed the cat' },
  { id: 6, title: 'Walk the dog' },
  { id: 7, title: 'Study in the library' },
];

export default class TasksService {
  async getAllTasks(limit?: number) {
    if (limit) {
      return tasks.slice(0, limit);
    }
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
