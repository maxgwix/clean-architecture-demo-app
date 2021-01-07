import { Priority } from '../../entities/Priority';

export interface CreateTaskUseCase {
  createTask({title, tags, priority}: { title: string; tags?: string[]; priority?: Priority; }): void;
}
