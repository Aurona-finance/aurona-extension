/* eslint-disable no-case-declarations */
import * as bip39 from 'bip39'
import nacl from 'tweetnacl'
import { derivePath } from 'ed25519-hd-key'
import { Account } from '@solana/web3.js'

export async function generateMnemonicAndSeed() {
  const mnemonic = bip39.generateMnemonic(256)
  const seed = await bip39.mnemonicToSeed(mnemonic)
  return { mnemonic, seed: Buffer.from(seed).toString('hex') }
}
export async function mnemonicToSeed(mnemonic: string) {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid seed words')
  }
  const seed = await bip39.mnemonicToSeed(mnemonic)
  return Buffer.from(seed).toString('hex')
}

export enum DERIVATION_PATH {
  bip44 = 'bip44',
  bip44Change = 'bip44Change'
}
export function getAccountFromSeed(
  seed: string,
  walletIndex: number = 0,
  dPath: DERIVATION_PATH = DERIVATION_PATH.bip44
) {
  const derivedSeed = deriveSeed(seed, walletIndex, dPath)
  if (derivedSeed) {
    return new Account(nacl.sign.keyPair.fromSeed(Buffer.from(derivedSeed)).secretKey)
  } else {
    throw new Error(`invalid derivation path: ${dPath}`)
  }
}
function deriveSeed(seed: string, walletIndex: number, derivationPath: DERIVATION_PATH) {
  switch (derivationPath) {
    case DERIVATION_PATH.bip44:
      const path44 = `m/44'/501'/${walletIndex}'`
      return derivePath(path44, seed).key
    case DERIVATION_PATH.bip44Change:
      const path44Change = `m/44'/501'/${walletIndex}'/0'`
      return derivePath(path44Change, seed).key
  }
}
