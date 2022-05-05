import { ITask } from '@/types/task'
import create, { SetState } from 'zustand'

interface ITaskStore {
  tasks: ITask[] | null
  updateTasks: (tasks: ITask[] | null) => void

  // LOADING
  isFetchingTodos: boolean
  updateIsFetchingTodos: (isFetching: boolean) => void
}

export const useTaskStore = create<ITaskStore>(
  (set: SetState<ITaskStore>): ITaskStore => ({
    // NFTS
    tasks: null,
    updateTasks: async (tasks: ITask[] | null) => {
      set((state) => ({
        ...state,
        tasks,
      }))
    },
    // Loading
    isFetchingTodos: false,
    updateIsFetchingTodos: (isFetching: boolean) =>
      set((state) => ({ ...state, isFetchingTodos: isFetching })),
  }),
)
