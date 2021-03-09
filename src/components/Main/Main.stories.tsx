import React from 'react'
import { storiesOf } from '@storybook/react'
import Main from './Main'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackground } from '@sb/decorators'
import BN from 'bn.js'
import Header from '@components/Header/Header'
import { SolanaNetworks } from '@static/index'
import AssetsList from '@components/AssetsList/AssetsList'
import { Account } from '@solana/web3.js'

storiesOf('Pages/Main', module)
  .addDecorator(withKnobs)
  .addDecorator(withBackground)
  .add('default', () => {
    const [network, setNetwork] = React.useState<SolanaNetworks>(SolanaNetworks.MAIN)
    const tokenA = {
      programId: new Account().publicKey,
      balance: new BN(123),
      address: new Account().publicKey,
      decimals: 8,
      ticker: 'ABC'
    }
    const tokens = Array.from({ length: 10 }, (_, i) => tokenA)
    return (
      <>
        <Header
          onNetworkChange={net => {
            setNetwork(net)
          }}
          network={network}></Header>
        <Main
          onSend={() => console.log('send')}
          balance={new BN(100223).toString()}
          balanceUsd={new BN(100232).toString()}
          address='BVY7sD418vuos1vEQjeHkFgnYVJYmwhqr5jDcaxRHxwx'
        />
        <AssetsList onTokenClick={() => {}} tokens={tokens} onAddAccount={() => {}}></AssetsList>
      </>
    )
  })
