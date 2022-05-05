import { useTodoListContract } from '@/blockchain/contracts/todo-list-contract/use-todo-list-contract'
import { useTaskStore } from '@/store/task-store'
import { ITask, TaskStatus } from '@/types/task'
import React from 'react'
import { useMoralis } from 'react-moralis'
import { Task } from '../elements/task'

export const taskExample = {
  title: 'Title',
  description: 'Description',
  status: 2 as any,
  id: 1,
}

export const TasksList = () => {
  const { isAuthenticated } = useMoralis()
  const { getTodos, deleteTodo, ediTodo } = useTodoListContract()
  const { tasks } = useTaskStore()
  async function onDelete(id: number) {
    await deleteTodo(id)
  }
  async function onEdit(id: number, status: TaskStatus) {
    await ediTodo(id, status)
  }

  const handleFetchTodo = React.useCallback(async () => {
    await getTodos()
  }, [getTodos])

  React.useEffect(() => {
    if (isAuthenticated && !tasks) handleFetchTodo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <div className="max-w-sm w-full ">
      {tasks && tasks?.length > 0 ? (
        tasks?.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
        ))
      ) : (
        <h1 className="text-center">{"You don't have tasks yet"}</h1>
      )}
    </div>
  )
}
