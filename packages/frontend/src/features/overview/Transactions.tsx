import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Description, Text } from '@geist-ui/react'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import { getShortAccount } from '../../utils/account-utils'
import { useRootStore } from '../../context/RootStoreProvider'

const TxWrapper = styled.div`
  border-bottom: 1px solid gray;
  cursor: pointer;
  padding: 10px 0;
`

const TxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`

const TxDescription = styled.div<{ incoming: boolean }>`
  color: ${({ incoming }) => (incoming ? 'green' : '#E5D4FF')};
`

const Transactions = (): React.FC => {
  const bucket = useSelectedBucket()
  const { web3Store } = useRootStore()
  const [transactions, setTransactions] = useState<
    {
      from: string
      to: string
      value: string
      hash: string
      timestamp: number
    }[]
  >([])

  useEffect(() => {
    async function fetchTransactions() {
      const txs = await bucket?.fetchTransactions()

      const mappedTxs = await Promise.all(
        txs?.map(async (tx) => {
          const { from, to, value } = tx.decode(tx.data, tx.topics)
          const block = await tx.getBlock()
          return {
            from,
            to,
            value: value.toString(),
            hash: tx.transactionHash,
            timestamp: block.timestamp,
          }
        })
      )
      setTransactions(mappedTxs!)
    }

    fetchTransactions()
  }, [bucket.id])

  let symbol = ''
  if (bucket?.token) {
    symbol = bucket?.token?.symbol()
  }
  const decimals = bucket?.token.decimals()

  function getName(address: string) {
    if (address.toLowerCase() === bucket?.id.toLowerCase()) {
      return bucket.name
    }

    return getShortAccount(address)
  }

  function formatAmount(amount = '10000') {
    return ethers.utils.formatUnits(amount, decimals).toString()
  }

  return (
    <div>
      {transactions.map((tx) => {
        return (
          <TxWrapper
            key={tx.hash}
            onClick={() => {
              window.open(`${web3Store.network.blockExplorer}/tx/${tx.hash}`, '_blank')
            }}
          >
            <TxTitle>
              <div>
                {formatAmount(tx.value.toString(), decimals)} {symbol}
              </div>
              <Description title={new Date(tx.timestamp * 1000).toDateString()} />
            </TxTitle>
            <TxDescription incoming={tx.to.toLowerCase() === bucket?.id.toLowerCase()}>
              {getName(tx.from)} to {getName(tx.to)}
            </TxDescription>
          </TxWrapper>
        )
      })}
    </div>
  )
}

export default Transactions
