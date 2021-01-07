import { Chance } from 'chance';
import { ValidateNewTaskInteractor } from './ValidateNewTaskInteractor';

const random = Chance();

describe('Use Case: Validate New Task', () => {
  let validateNewTaskUseCase: ValidateNewTaskUseCase;
  const maximumTitleLength = 255;

  beforeEach(() => {
    validateNewTaskUseCase = new ValidateNewTaskInteractor(maximumTitleLength);
  });

  it('should consider task to be valid when title is not empty', () => {
    const nonEmptyTitle = 'nonEmptyTaskTitle';

    const result = validateNewTaskUseCase.validate({title: nonEmptyTitle});

    expect(result).toBe(true);
  });

  it('should consider task to be invalid when title length exceeds maximum length', () => {
    const extremelyLongTitle = random.string({length: random.integer({min: maximumTitleLength + 1, max: maximumTitleLength * 2})});

    const result = validateNewTaskUseCase.validate({title: extremelyLongTitle});

    expect(result).toBe(false);
  });

  it('should consider task to be invalid when title is empty', () => {
    const emptyTitle = '';

    const result = validateNewTaskUseCase.validate({title: emptyTitle});

    expect(result).toBe(false);
  });

  it('should consider task to be invalid when title is blank', () => {
    const blankTitle = '    ';

    const result = validateNewTaskUseCase.validate({title: blankTitle});

    expect(result).toBe(false);
  });
});
