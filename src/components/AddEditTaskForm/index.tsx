import classNames from "classnames"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import { task as taskType } from "../../App"

type EditTaskFormProps = {
  type: "Edit"
}

type AddTaskFormProps = {
  type: "Add"
}

type AddEditTaskFormProps = (EditTaskFormProps | AddTaskFormProps) & {
  setShowAddEditorModel: (value: boolean) => void
  setmodifiedTaskList: (callback: (prevTasks: taskType[]) => taskType[]) => void
  editedTask: taskType
  setEditedTask: (callback: (prevTasks: taskType) => taskType) => void
}

const AddEditTaskForm = (prop: AddEditTaskFormProps) => {
  const { setShowAddEditorModel, setmodifiedTaskList, type, editedTask, setEditedTask } = prop

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }))
  }

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">{type === "Add" ? "Add Task" : "Edit Task"}</span>
            <Close className="cp" onClick={() => setShowAddEditorModel(false)} />
          </div>
          <Input
            label="Task"
            placeholder="Type your task here..."
            onChange={handleChange}
            name="title"
            value={editedTask.title}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority) => (
                <li
                  key={priority}
                  className={classNames(priority, {
                    [`${priority}-selected`]: editedTask.priority === priority,
                  })}
                  onClick={() =>
                    setEditedTask((prevTask) => ({
                      ...prevTask,
                      priority: priority,
                    }))
                  }
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button
              disabled={editedTask.title === ""}
              title={type === "Add" ? "Add" : "Edit"}
              onClick={(e) => {
                e.preventDefault()
                if (type === "Add") {
                  setmodifiedTaskList((prevTasks) => [{ ...editedTask, id: `${Math.random()}` }, ...prevTasks])
                  setShowAddEditorModel(false)
                } else {
                  // Implement the logic for editing a task here
                  // Assuming setmodifiedTaskList updates the task list correctly
                  setmodifiedTaskList((prevTasks) =>
                    prevTasks.map((prevTask) => (prevTask.id === editedTask.id ? editedTask : prevTask))
                  )
                  setShowAddEditorModel(false)
                }
              }}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm
