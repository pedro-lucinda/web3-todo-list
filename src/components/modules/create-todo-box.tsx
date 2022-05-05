import { useTodoListContract } from '@/blockchain/contracts/todo-list-contract/use-todo-list-contract'
import { useTaskStore } from '@/store/task-store'
import React from 'react'
import { Button } from '../elements/button'
import { Input } from '../elements/input'

export const CreateTodoBox = () => {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const { createTodo, getTodos } = useTodoListContract()
  const { isFetchingTodos } = useTaskStore()

  async function handleCreateTask() {
    await createTodo(title, description)
    setDescription('')
    setTitle('')
  }

  return (
    <section className="flex flex-col gap-4 items-center my-10 max-w-sm w-full  ">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        disabled={isFetchingTodos}
      />
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        disabled={isFetchingTodos}
      />
      <Button
        title="Create"
        onClick={handleCreateTask}
        isDisabled={isFetchingTodos}
      
        isLoading={isFetchingTodos}
      />
    </section>
  )
}
