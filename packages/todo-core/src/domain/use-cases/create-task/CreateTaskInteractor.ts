import { TaskRepository } from '../../repositories/TaskRepository';
import { CreateTaskUseCase } from './CreateTaskUseCase';
import { Priority } from '../../entities/Priority';
import { Status } from '../../entities/Status';

export class CreateTaskInteractor implements CreateTaskUseCase {
  constructor(readonly taskRepository: TaskRepository) {
  }

  createTask = ({ title, tags = [], priority = Priority.LOW }: { title: string; tags?: string[]; priority: Priority; }) => {
    if (title.length === 0) {
      throw new Error('Invalid argument: title must not be empty.');
    }

    this.taskRepository.createNewTask({
      title,
      tags,
      priority,
      status: Status.TODO
    });
  };
}
