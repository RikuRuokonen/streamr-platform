// @flow

import Web3 from 'web3'

import getConfig from '$shared/web3/config'
import type { Address } from '$shared/flowtype/web3-types'

declare var ethereum: Web3
declare var web3: Web3

export class StreamrWeb3 extends Web3 {
    getDefaultAccount = (): Promise<Address> => this.eth.getAccounts()
        .then((accounts) => {
            if (!Array.isArray(accounts) || accounts.length === 0) {
                throw new Error('MetaMask browser extension is locked')
            }
            return accounts[0]
        })

    getEthereumNetwork = (): Promise<number> => this.eth.net.getId()

    isEnabled = (): boolean => !!this.currentProvider
}

const publicWeb3Options = {
    timeout: 20000, // milliseconds,
    headers: [
        {
            name: 'Access-Control-Allow-Origin', value: '*',
        },
    ],
}

export const getPublicWeb3 = (): StreamrWeb3 =>
    new StreamrWeb3(new Web3.providers.HttpProvider(getConfig().publicNodeAddress), publicWeb3Options)

export const getWebSocketWeb3 = (): StreamrWeb3 =>
    new StreamrWeb3(new Web3.providers.WebsocketProvider(getConfig().websocketAddress))

export const getWeb3 = (): StreamrWeb3 => {
    if (typeof ethereum !== 'undefined') {
        return new StreamrWeb3(ethereum)
    } else if (typeof web3 !== 'undefined') {
        return new StreamrWeb3(web3.currentProvider)
    }
    return new StreamrWeb3(false)
}

export default getWeb3
