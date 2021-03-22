import crypto from 'crypto'
import { Account, PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { u64 } from '@solana/spl-token'
import { STORAGE_KEYS } from '.'

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export const getDataExtensionStorage = (key: string) => {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get(key, function (items) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message)
      } else {
        resolve(items[key])
      }
    })
  })
}
export const setDataExtensionStorage = (key: string, data: any): Promise<void> => {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.set({ [key]: data }, function () {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message)
      } else {
        resolve()
      }
    })
  })
}

const algorithm = 'aes-256-ctr'
const iv = crypto.randomBytes(16)

export interface IEncryptedKey {
  iv: string
  data: string
}
function sha256(data: string) {
  return crypto.createHash('sha256').update(data, 'binary').digest('base64').substr(0, 32)
}
export const encrypt = (text: string, password: string): IEncryptedKey => {
  const passwordHash = sha256(password)
  const cipher = crypto.createCipheriv(algorithm, passwordHash, iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return {
    iv: iv.toString('hex'),
    data: encrypted.toString('hex')
  }
}

export const decrypt = (encryptedKey: IEncryptedKey, password: string) => {
  const passwordHash = sha256(password)
  const decipher = crypto.createDecipheriv(
    algorithm,
    passwordHash,
    Buffer.from(encryptedKey.iv, 'hex')
  )
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(encryptedKey.data, 'hex')),
    decipher.final()
  ])
  return decrpyted.toString()
}
export const storeAccount = async (key: string, acc: Account, password: string) => {
  const sk = acc.secretKey.toString()
  const encryptedData = encrypt(sk, password)
  await setDataExtensionStorage(key, encryptedData)
}
export const storeSeed = async (seed: string, password: string) => {
  const encryptedData = encrypt(seed, password)
  await setDataExtensionStorage('coldSeed', encryptedData)
}
export const retrieveSeed = async (password: string) => {
  const data = (await getDataExtensionStorage('coldSeed')) as IEncryptedKey
  return decrypt(data, password)
}
export const storeHotPassword = async (password: string) => {
  const nonce = await getNonce()
  const encryptedData = encrypt(password, nonce)
  await setDataExtensionStorage('password', encryptedData)
}
export const retrieveHotPassword = async () => {
  const nonce = await getNonce()
  const data = (await getDataExtensionStorage('password')) as IEncryptedKey
  return decrypt(data, nonce)
}
export interface UnlockedAccount {
  type: 'aurona'
  publicKey: PublicKey
  key: number
  account: Account
}
export interface UnlockedLedger {
  type: 'ledger'
  publicKey: PublicKey
  key: number
}
export const retrieveCurrentAccount = async (): Promise<UnlockedAccount | UnlockedLedger> => {
  const data = await getCurrentWallet()
  if (data === undefined) {
    throw Error('No wallet initialized')
  }
  const password = await retrieveHotPassword()
  const sk = decrypt(data.privkey, password)
  if (data.type === 'aurona') {
    return {
      type: data.type,
      key: data.key,
      publicKey: new PublicKey(data.publicKey),
      account: new Account(sk.split(',').map(item => parseInt(item)))
    }
  } else {
    const check = new PublicKey(sk)
    return {
      type: data.type,
      key: data.key,
      publicKey: new PublicKey(data.publicKey)
    }
  }
}
export const retrieveColdCurrentAccount = async (
  password: string
): Promise<UnlockedAccount | UnlockedLedger> => {
  const data = await getCurrentWallet()
  const wallets = await getStoredWallets()
  if (data === undefined) {
    throw Error('No wallet initialized')
  }
  const wallet = wallets[data.publicKey]
  const sk = decrypt(wallet.privkey, password)
  if (data.type === 'aurona') {
    return {
      type: data.type,
      key: data.key,
      publicKey: new PublicKey(data.publicKey),
      account: new Account(sk.split(',').map(item => parseInt(item)))
    }
  } else {
    return {
      type: data.type,
      key: data.key,
      publicKey: new PublicKey(data.publicKey)
    }
  }
}

export const tou64 = (amount: BN | String) => {
  // eslint-disable-next-line new-cap
  return new u64(amount.toString())
}
export const transformBN = (amount: BN): string => {
  // eslint-disable-next-line new-cap
  return (amount.div(new BN(1e4)).toNumber() / 1e4).toString()
}
export const printBN = (amount: BN, decimals: number): string => {
  const balanceString = amount.toString()
  if (balanceString === '0') {
    return '0.0'
  }
  if (balanceString.length <= decimals) {
    return (
      '0.' + '0'.repeat(decimals - balanceString.length) + balanceString.replace(/(\.0+|0+)$/, '')
    )
  } else {
    const decimalPart = balanceString
      .substring(balanceString.length - decimals)
      .replace(/(\.0+|0+)$/, '')
    if (decimalPart) {
      return (
        balanceString.substring(0, balanceString.length - decimals) +
        '.' +
        balanceString.substring(balanceString.length - decimals).replace(/(\.0+|0+)$/, '')
      )
    } else {
      return balanceString.substring(0, balanceString.length - decimals)
    }
  }
}
export const printBNtoBN = (amount: string, decimals: number): BN => {
  const balanceString = amount.split('.')
  if (balanceString.length !== 2) {
    return new BN(balanceString[0] + '0'.repeat(decimals))
  }
  if (balanceString[1].length <= decimals) {
    return new BN(
      balanceString[0] + balanceString[1] + '0'.repeat(decimals - balanceString[1].length)
    )
  }
  return new BN(0)
}

export const uppercaseFirstLetter = (str: string) => {
  if (str.length === 0) {
    return str
  }
  return str[0].toUpperCase() + str.slice(1)
}

export interface IWallet {
  type: 'ledger' | 'aurona'
  publicKey: string
  key: number
  privkey: IEncryptedKey
}
type IStoredWallets = {
  [key in string]: IWallet
}
export const getStoredWallets = async () => {
  const storedData = await getDataExtensionStorage(STORAGE_KEYS.ALL_WALLETS)
  let storedAddresses: IStoredWallets = {}
  if (!storedData) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    storedAddresses = {} as IStoredWallets
  } else {
    storedAddresses = JSON.parse(storedData as string) as IStoredWallets
  }
  return storedAddresses
}
export const getCurrentWallet = async (): Promise<IWallet | undefined> => {
  const storedData = await getDataExtensionStorage(STORAGE_KEYS.SELECTED_WALLET)
  if (!storedData) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return undefined
  } else {
    return JSON.parse(storedData as string) as IWallet
  }
}

export const storeCurrentWallet = async (wallet: IWallet) => {
  return await setDataExtensionStorage(STORAGE_KEYS.SELECTED_WALLET, JSON.stringify(wallet))
}
export const getNonce = async () => {
  return (await getDataExtensionStorage('nonce')) as string
}
