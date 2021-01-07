interface ValidateNewTaskUseCase {
  validate({ title }: { title: string }): boolean
}
