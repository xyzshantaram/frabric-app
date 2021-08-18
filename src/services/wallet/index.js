import EthereumClient from '../../data/network/web3/ethereum/ethereumClient'
import WalletState from '../../models/walletState'

/**
 * Wallet service
 * @property {EthereumClient} client Ethereum client
 */
 class Wallet {
  constructor(
    ethereumClient
  ) {
    this.client = ethereumClient
  }
  
  async getAddress() {
    return this.client.getWalletAddress()
  }

  async getState() {
    let values = await Promise.all([
      this.client.getWalletAddress(),
      this.client.getWalletEthBalance()
    ])

    const state = new WalletState(
      values[0],
      values[1] / Math.pow(10, 18)
    )

    return state
  }
}

export default Wallet