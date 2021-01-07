import { Priority } from '../entities/Priority';
import { Status } from '../entities/Status';

export interface TaskRepository {
  createNewTask({ title, tags, priority, status }: { title: string; tags?: string[]; priority: Priority; status: Status });
}
