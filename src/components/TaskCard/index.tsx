import classNames from "classnames"
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg"
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg"
import CircularProgressBar from "../CircularProgressBar"
import "./style.scss"
import { task } from "../../App"
import { useState } from "react"
export type setshowDeleteModalProps = {
  setshowDeleteModal: (
    callback: (prevTasks: { id: string; isModelOpen: boolean }) => { id: string; isModelOpen: boolean }
  ) => void
}
type setModel = {
  setShowEditedModel: (value: boolean) => void
  setEditedTask: (callback: (prevTasks: task) => task) => void
  setmodifiedTaskList: (callback: (prevTasks: task[]) => task[]) => void
}

type TaskCardProps = task & setshowDeleteModalProps & setModel
const TaskCard = ({
  id,
  title,
  priority,
  status,
  progress,
  setshowDeleteModal,
  setShowEditedModel,
  setEditedTask,
  setmodifiedTaskList,
}: TaskCardProps) => {
  const [currentStatus, setCurrentStatus] = useState(status)
  console.log(status)
  console.log("//////////////////////")

  const toggleStatus = () => {
    let newStatus: string
    let newProgress = progress

    if (currentStatus === "To Do") {
      newStatus = "In Progress"
      newProgress = 50
    } else if (currentStatus === "In Progress") {
      newStatus = "Done"
      newProgress = 100
    } else {
      newStatus = "To Do"
      newProgress = 0
    }

    setCurrentStatus(newStatus)
    setmodifiedTaskList((preItems) => {
      const itemIndexgit = preItems.findIndex((item) => item.id === id)
      if (itemIndexgit !== -1) {
        const updatedItem = {
          ...preItems[itemIndexgit],
          status: newStatus,
          progress: newProgress,
        }
        const updatedTaskList = [...preItems]
        updatedTaskList[itemIndexgit] = updatedItem
        return updatedTaskList
      } else {
        return preItems
      }
    })
  }

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status" onClick={toggleStatus}>
          {status}
        </button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progress} />
      </div>
      <div className="actions">
        <EditIcon
          className="mr-20 cp"
          onClick={() => {
            setShowEditedModel(true)
            setEditedTask((prevTask) => ({
              ...prevTask,
              id,
              title,
              priority,
              status,
              progress,
            }))
          }}
        />
        <DeleteIcon className="cp" onClick={() => setshowDeleteModal((pre) => ({ id: id, isModelOpen: true }))} />
      </div>
    </div>
  )
}

export default TaskCard
