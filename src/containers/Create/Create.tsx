import React, { useEffect, useState } from 'react'
import useStyles from './style'

import SelectCreateAccount from '@components/SelectCreateAccount/SelectCreateAccount'
import { Account } from '@solana/web3.js'
import { getDataExtensionStorage, storeAccount } from '@static/utils'
import { actions, Status } from '@reducers/solanaWallet'
import { useDispatch } from 'react-redux'
import CreateAccount from '@components/CreateAccount/CreateAccount'
import ImportSeed from '@components/ImportSeed/ImportSeed'
import CreatePassword from '@components/CreatePassword/CreatePassword'
import { mnemonicToSeed, getAccountFromSeed } from '@static/seedOperations'

enum CreateSteps {
  CreatePassword,
  Select,
  ImportSeed,
  CreateNew
}
export const Create: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [step, setStep] = useState<CreateSteps>(CreateSteps.CreatePassword)

  const stepToComponent = (step: CreateSteps) => {
    switch (step) {
      case CreateSteps.CreatePassword:
        return (
          <CreatePassword
            password={password}
            setPassword={setPassword}
            onClick={() => {
              setStep(CreateSteps.Select)
            }}
          />
        )
      case CreateSteps.Select:
        return (
          <SelectCreateAccount
            onFromSeed={() => {
              setStep(CreateSteps.ImportSeed)
            }}
            onNew={() => {
              setStep(CreateSteps.CreateNew)
            }}
          />
        )
      case CreateSteps.CreateNew:
        return (
          <CreateAccount
            onClick={async (acc: Account) => {
              const nonce = (await getDataExtensionStorage('nonce')) as string
              await storeAccount('coldAccount', acc, password)
              await storeAccount('hotAccount', acc, nonce)
              dispatch(actions.setStatus(Status.Initalized))
            }}
          />
        )
      case CreateSteps.ImportSeed:
        return (
          <ImportSeed
            onClick={async (mnemonic: string) => {
              const seed = await mnemonicToSeed(mnemonic)
              const acc = getAccountFromSeed(seed)
              const nonce = (await getDataExtensionStorage('nonce')) as string
              await storeAccount('coldAccount', acc, password)
              await storeAccount('hotAccount', acc, nonce)
              dispatch(actions.setStatus(Status.Initalized))
            }}
          />
        )

      default:
        return (
          <SelectCreateAccount
            onFromSeed={() => {
              setStep(CreateSteps.ImportSeed)
            }}
            onNew={() => {
              setStep(CreateSteps.CreateNew)
            }}
          />
        )
    }
  }
  return <> {stepToComponent(step)}</>
}

export default Create
