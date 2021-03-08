import React from 'react'

import MainComponent from '@components/Main/Main'
import { useDispatch, useSelector } from 'react-redux'
import { address, balance } from '@selectors/solanaWallet'
import { printBN } from '@static/utils'

export const MainWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const userAddress = useSelector(address)
  const userBalance = useSelector(balance)
  return <MainComponent address={userAddress} balance={printBN(userBalance, 9)} onSend={() => {}} />
}

export default MainWrapper
