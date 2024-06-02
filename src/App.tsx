import { useState } from "react"
import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { taskList } from "./siteData/taskList"
export type task = {
  id: string
  title: string
  priority: string
  status: string
  progress: number
}
const App = () => {
  const [showAddModal, setShowAddModel] = useState<boolean>(false)
  const [showEditedModal, setShowEditedModel] = useState<boolean>(false)
  const [showDeleteModal, setshowDeleteModal] = useState<{ id: string; isModelOpen: boolean }>({
    id: "",
    isModelOpen: false,
  })
  const [modifiedTaskList, setmodifiedTaskList] = useState<task[]>(taskList)
  const [Task, setTask] = useState<task>({
    id: "",
    title: "",
    priority: "",
    status: "To Do",
    progress: 0,
  })

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button
            title="Add Task"
            icon={<Add />}
            onClick={() => {
              setShowAddModel(true)
            }}
          />
        </div>
        <div className="task-container">
          {modifiedTaskList.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              setEditedTask={setTask}
              setshowDeleteModal={setshowDeleteModal}
              setShowEditedModel={setShowEditedModel}
              setmodifiedTaskList={setmodifiedTaskList}
            />
          ))}
        </div>
      </div>
      {showAddModal && (
        <AddEditTaskForm
          editedTask={Task}
          setEditedTask={setTask}
          type="Add"
          setShowAddEditorModel={setShowAddModel}
          setmodifiedTaskList={setmodifiedTaskList}
        />
      )}
      {showEditedModal && (
        <AddEditTaskForm
          editedTask={Task}
          setEditedTask={setTask}
          type="Edit"
          setShowAddEditorModel={setShowEditedModel}
          setmodifiedTaskList={setmodifiedTaskList}
        />
      )}
      {showDeleteModal.isModelOpen && (
        <DeleteModal
          setmodifiedTaskList={setmodifiedTaskList}
          showDeleteModal={showDeleteModal}
          setshowDeleteModal={setshowDeleteModal}
        />
      )}
    </div>
  )
}

export default App
