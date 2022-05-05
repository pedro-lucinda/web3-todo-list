
import { CreateTodoBox } from '@/components/modules/create-todo-box'
import { TasksList } from '@/components/modules/tasks-list'
import React from 'react'

export const HomeView = () => {
  return (
    <div className="flex flex-col  items-center h-full">
      <h1 className="text-3xl font-bold">Your todo list</h1>
      <CreateTodoBox />
      <TasksList />
    </div>
  )
}
