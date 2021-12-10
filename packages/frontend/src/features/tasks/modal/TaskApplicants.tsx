import TaskApplicant from '../TaskApplicant'

const APPLICANTS_MOCK = [
  '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
]

const TaskApplicants: React.FC = () => {
  return (
    <div>
      {APPLICANTS_MOCK.map((applicant) => (
        <TaskApplicant key={applicant} account={applicant} />
      ))}
    </div>
  )
}

export default TaskApplicants
