import { Chance } from 'chance';
import { CreateTaskUseCase } from './CreateTaskUseCase';
import { TaskRepository } from '../../repositories/TaskRepository';
import { CreateTaskInteractor } from './CreateTaskInteractor';
import { Priority } from '../../entities/Priority';
import { Status } from '../../entities/Status';

const random = Chance();

describe('Use Case: Create Task', () => {
  let taskRepositoryMock: TaskRepository;
  let createTaskUseCase: CreateTaskUseCase;

  let taskTitle: string;

  beforeEach(() => {
    taskRepositoryMock = {
      createNewTask: jest.fn(),
    };

    createTaskUseCase = new CreateTaskInteractor(taskRepositoryMock);

    taskTitle = random.string();
  });

  it('should create new task with given title and default properties when only title is provided', () => {
    createTaskUseCase.createTask({
      title: taskTitle,
    });

    expect(taskRepositoryMock.createNewTask).toBeCalledWith({
      title: taskTitle,
      tags: [],
      priority: Priority.LOW,
      status: Status.TODO
    });
  });

  it('should create new task with tags when provided', () => {
    const tags = new Array(random.integer({ min: 1, max: 5 })).fill(null).map(() => random.string());

    createTaskUseCase.createTask({
      title: taskTitle,
      tags
    });

    expect(taskRepositoryMock.createNewTask).toBeCalledWith({
      title: taskTitle,
      tags,
      priority: Priority.LOW,
      status: Status.TODO
    })
  });

  it('should create new task with priority when provided', () => {
    const priority = random.pickone([
      Priority.LOW,
      Priority.MEDIUM,
      Priority.HIGH
    ]);

    createTaskUseCase.createTask({
      title: taskTitle,
      priority
    });

    expect(taskRepositoryMock.createNewTask).toBeCalledWith({
      title: taskTitle,
      tags: [],
      priority,
      status: Status.TODO
    })
  });

  it('should fail task validation when title is empty', () => {
    const createTaskAction = () => createTaskUseCase.createTask({ title: '' });

    expect(createTaskAction).toThrow('Invalid argument: title must not be empty');
  });
});

