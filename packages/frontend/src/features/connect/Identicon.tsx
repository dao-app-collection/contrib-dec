import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

type Props = {
  account: string | undefined
  diameter?: number
}

const Identicon: React.FC<Props> = ({ account, diameter = 15 }) => {
  return account ? <Jazzicon diameter={diameter} seed={jsNumberForAddress(account)} /> : null
}

export default Identicon
