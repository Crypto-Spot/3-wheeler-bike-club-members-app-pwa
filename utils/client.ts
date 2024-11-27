import { Chain, createPublicClient, createWalletClient, http } from 'viem'
import { celo } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'


const account = privateKeyToAccount(process.env.PRIVATE_KEY) 

export const publicClient = createPublicClient({
  chain: celo as Chain,
  transport: http()
})

export const walletClient = createWalletClient({
  account,
  chain: celo as Chain,
  transport: http()
})
