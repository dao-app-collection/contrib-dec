import Navigation from '../components/Navigation'
import AccountModal from '../features/connect/AccountModal'
import BlackHole from '../features/black-hole/BlackHole'

const Index: React.FC = () => {
  return (
    <div>
      <Navigation />
      <BlackHole />
      <AccountModal />
    </div>
  )
}

export default Index
