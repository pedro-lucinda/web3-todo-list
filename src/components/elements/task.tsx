import { useTaskStore } from '@/store/task-store'
import { ITask, TaskStatus } from '@/types/task'
import { TaskEnum } from '@/types/task-enum'
import React from 'react'
import { Button } from './button'
import { Select } from './select'

interface TaskProps {
  task: ITask
  onEdit: (id: number, status: TaskStatus) => void
  onDelete: (id: number) => void
}

enum StatusColor {
  'bg-gray-400' = 1,
  'bg-orange-400' = 2,
  'bg-green-400' = 0,
}

const stateOptions = [
  {
    name: 'Backlog',
    value: 1,
  },
  { name: 'In Progress', value: 2 },
  { name: 'Completed', value: 0 },
]

export const Task = ({ task, onEdit, onDelete }: TaskProps) => {
  const { isFetchingTodos } = useTaskStore()
  const [showSelect, setShowSelect] = React.useState(false)

  function handleEdit(status: TaskStatus) {
    onEdit(task.id, status)
    setShowSelect(false)
  }

  return (
    <section className="flex flex-col  max-w-sm w-full  border-2 border-violet-500 rounded-md p-2  h-40">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold">{task?.title}</h1>
        {showSelect ? (
          <div className="w-34  ml-auto">
            <Select
              options={stateOptions}
              onChange={(e) => handleEdit(Number(e.target.value) as TaskStatus)}
            />
          </div>
        ) : (
          <div
            className={`
        ${StatusColor[task.status]} 
        ${task.status === 0 ? 'text-black' : 'text-white'}
        ml-auto w-24 rounded-md flex align-middle justify-center my-2
        `}
          >
            <p>{TaskEnum[task.status]}</p>
          </div>
        )}
      </div>
      <p className="text-lg">{task?.description}</p>
      <div className="flex flex-row mt-auto ml-auto">
        <Button
          title="Delete"
          onClick={() => onDelete(task.id)}
          style="w-16 border-2 border-red-500 bg-transparent "
          isDisabled={isFetchingTodos}
        />
        <Button
          title="Edit"
          onClick={() => setShowSelect(!showSelect)}
          style=" ml-2  w-16"
          isDisabled={isFetchingTodos}
        />
      </div>
    </section>
  )
}
