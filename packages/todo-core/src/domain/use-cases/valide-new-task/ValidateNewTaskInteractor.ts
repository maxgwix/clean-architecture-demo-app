export class ValidateNewTaskInteractor implements ValidateNewTaskUseCase {
  constructor(private readonly maxTitleLength: number) {
  }

  validate = ({ title }: { title: string }): boolean => {
    const isNotBlank = !!title.trim().length;
    const isWithinMaximumLength = title.length <= this.maxTitleLength;
    return isNotBlank && isWithinMaximumLength;
  };

}
