import React, { useEffect, useState } from 'react'
import useStyles from './style'

import SelectCreateAccount from '@components/SelectCreateAccount/SelectCreateAccount'
import {
  decrypt,
  encrypt,
  getNonce,
  getStoredWallets,
  setDataExtensionStorage,
  storeCurrentWallet,
  storeHotPassword,
  storeSeed
} from '@static/utils'
import { actions, Status } from '@reducers/solanaWallet'
import { useDispatch } from 'react-redux'
import CreateAccount from '@components/CreateAccount/CreateAccount'
import ImportSeed from '@components/ImportSeed/ImportSeed'
import CreatePassword from '@components/CreatePassword/CreatePassword'
import { mnemonicToSeed, getAccountFromSeed } from '@static/seedOperations'
import { STORAGE_KEYS } from '@static/index'

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
            onClick={async (seed: string) => {
              const acc = getAccountFromSeed(seed)
              // We store encypted seed in case of generating additional accounts
              await storeSeed(seed, password)
              // const seed2 = await retrieveSeed(password)
              // const acc2 = getAccountFromSeed(seed2)
              // console.log(acc2.secretKey.toString())
              // console.log(acc.secretKey.toString())
              await storeHotPassword(password)
              const storedAddresses = await getStoredWallets()
              storedAddresses[acc.publicKey.toString()] = {
                type: 'aurona',
                publicKey: acc.publicKey.toString(),
                key: 0,
                // Create it just to later test on open
                privkey: encrypt(acc.secretKey.toString(), password)
              }
              await setDataExtensionStorage(
                STORAGE_KEYS.ALL_WALLETS,
                JSON.stringify(storedAddresses)
              )
              await storeCurrentWallet({
                type: 'aurona',
                publicKey: acc.publicKey.toString(),
                key: 0,
                privkey: encrypt(acc.secretKey.toString(), password)
              })
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
              await storeSeed(seed, password)
              await storeHotPassword(password)
              const storedAddresses = await getStoredWallets()
              storedAddresses[acc.publicKey.toString()] = {
                type: 'aurona',
                publicKey: acc.publicKey.toString(),
                key: 0,
                // Create it just to later test on open
                privkey: encrypt(acc.secretKey.toString(), password)
              }
              await setDataExtensionStorage(
                STORAGE_KEYS.ALL_WALLETS,
                JSON.stringify(storedAddresses)
              )
              await storeCurrentWallet({
                type: 'aurona',
                publicKey: acc.publicKey.toString(),
                key: 0,
                privkey: encrypt(acc.secretKey.toString(), password)
              })
              dispatch(actions.setStatus(Status.Initalized))
            }}
          />
        )

      default:
        return (
          <CreatePassword
            password={password}
            setPassword={setPassword}
            onClick={() => {
              setStep(CreateSteps.Select)
            }}
          />
        )
    }
  }
  return <> {stepToComponent(step)}</>
}

export default Create
