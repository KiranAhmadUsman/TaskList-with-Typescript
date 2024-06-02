import { task } from "../../App"
import Button from "../Button"
import Modal from "../Modal"
import { setshowDeleteModalProps } from "../TaskCard"
import "./style.scss"
type DeleteModelProps = {
  setmodifiedTaskList: (callback: (prevTasks: task[]) => task[]) => void
  showDeleteModal: { id: string; isModelOpen: boolean }
} & setshowDeleteModalProps
const DeleteModal = ({ showDeleteModal, setshowDeleteModal, setmodifiedTaskList }: DeleteModelProps) => {
  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button
            title="Delete"
            onClick={() => {
              setmodifiedTaskList((pre) => {
                const updatedTaskArray = pre.filter((item) => item.id !== showDeleteModal.id)
                setshowDeleteModal((pre) => ({ ...pre, isModelOpen: false }))

                return updatedTaskArray
              })
            }}
          />
          <Button
            title="Cancel"
            outline={true}
            onClick={() => {
              setshowDeleteModal((pre) => ({ ...pre, isModelOpen: false }))
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
