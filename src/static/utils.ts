import crypto from 'crypto'
import { Account } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { u64 } from '@solana/spl-token'

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

interface IEncryptedKey {
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
export const retrieveAccount = async (key: string, password: string): Promise<Account> => {
  const data = (await getDataExtensionStorage(key)) as IEncryptedKey
  const sk = decrypt(data, password)
  return new Account(sk.split(',').map(item => parseInt(item)))
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
  if (balanceString.length <= decimals) {
    return '0.' + '0'.repeat(decimals - balanceString.length) + balanceString
  } else {
    return trimZeros(
      balanceString.substring(0, balanceString.length - decimals) +
        '.' +
        balanceString.substring(balanceString.length - decimals)
    )
  }
}
// Bad solution but i hate regex
export const trimZeros = (amount: string) => {
  try {
    return parseFloat(amount).toString()
  } catch (error) {
    return amount
  }
}
export const printBNtoBN = (amount: string, decimals: number): BN => {
  const balanceString = amount.split('.')
  if (balanceString.length !== 2) {
    return new BN(balanceString[0] + '0'.repeat(decimals))
  }
  // console.log(balanceString[1].length)
  if (balanceString[1].length <= decimals) {
    return new BN(
      balanceString[0] + balanceString[1] + '0'.repeat(decimals - balanceString[1].length)
    )
  }
  return new BN(0)
}
