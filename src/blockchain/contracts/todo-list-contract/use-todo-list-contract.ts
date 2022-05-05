import { useTaskStore } from '@/store/task-store'
import { ITask, TaskStatus } from '@/types/task'

import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis'

import { TODO_LIST_CONTRACT_ABI, TODO_LIST_CONTRACT_ADDRESS } from '.'
const CONTRACT_OPTIONS = {
  contractAddress: TODO_LIST_CONTRACT_ADDRESS,
  abi: TODO_LIST_CONTRACT_ABI,
}

export function useTodoListContract() {
  const contractProcessor = useWeb3ExecuteFunction()

  async function getTodos(): Promise<void> {
    const updateIsFetching = useTaskStore.getState().updateIsFetchingTodos
    const updateTasks = useTaskStore.getState().updateTasks

    await contractProcessor.fetch({
      params: {
        functionName: 'getUserTodos',
        ...CONTRACT_OPTIONS,
      },
      onSuccess: (res: any) => {
        if (!res || res?.length < 1) {
          updateTasks(null)
          return
        }
        const formatted = res?.map((t: ITask, i: number) => {
          return {
            id: t.id,
            title: t.title,
            status: t.status,
            description: t.description,
          }
        })
        updateTasks(formatted)
        updateIsFetching(false)
      },
      onError: (err) => {
        console.log(err)
        updateIsFetching(false)
      },
    })
  }

  async function createTodo(title: string, description: string) {
    const updateIsFetching = useTaskStore.getState().updateIsFetchingTodos

    updateIsFetching(true)
    await contractProcessor.fetch({
      params: {
        functionName: 'createTodo',
        params: {
          _title: title,
          _description: description,
        },
        ...CONTRACT_OPTIONS,
      },
      onSuccess: async (res: any) => {
        await res.wait()
        await getTodos()
        updateIsFetching(false)
      },
      onError: (err) => {
        console.log('error', err)
        updateIsFetching(false)
      },
    })
  }

  async function deleteTodo(id: number) {
    const updateIsFetching = useTaskStore.getState().updateIsFetchingTodos

    updateIsFetching(true)
    await contractProcessor.fetch({
      params: {
        functionName: 'deleteTodo',
        params: {
          _id: id,
        },
        ...CONTRACT_OPTIONS,
      },
      onSuccess: async (res: any) => {
        await res.wait()
        await getTodos()
        updateIsFetching(false)
      },
      onError: (err) => {
        console.log('error', err)
        updateIsFetching(false)
      },
    })
  }

  async function ediTodo(id: number, status: TaskStatus) {
    const updateIsFetching = useTaskStore.getState().updateIsFetchingTodos

    updateIsFetching(true)
    await contractProcessor.fetch({
      params: {
        functionName: 'updateTodoStatus',
        params: {
          _id: id,
          _status: status,
        },
        ...CONTRACT_OPTIONS,
      },
      onSuccess: async (res: any) => {
        await res.wait()
        await getTodos()
        updateIsFetching(false)
      },
      onError: (err) => {
        console.log('error', err)
        updateIsFetching(false)
      },
    })
  }

  return {
    getTodos,
    createTodo,
    deleteTodo,
    ediTodo,
  }
}
