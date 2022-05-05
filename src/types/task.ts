export interface ITask {
  title: string
  description: string
  status: TaskStatus
  id: number
}
export type TaskStatus = 1 | 2 | 0