// @flow

import type Transaction from '$shared/utils/Transaction'
import { StreamrWeb3 } from '$shared/web3/web3Provider'
import type TransactionError from '$shared/errors/TransactionError'

import type { TransactionState, TransactionType } from '$shared/flowtype/common-types'

export type Hash = string
export type Address = string
export type Receipt = {
    transactionHash: Hash,
}
export type Abi = Array<{}>
export type Web3Provider = StreamrWeb3.providers.HTTPProvider | StreamrWeb3.providers.WebsocketProvider | StreamrWeb3.providers.IpcProvider | {
    isMetaMask: true
}

export type EthereumNetwork = {
    id: ?string,
    name: ?string
}

export type SmartContractConfig = {
    abi: Abi,
    address: Address
}

export type SmartContractCall<T> = Promise<T>

export type SmartContractTransaction = Transaction

export type HashList = Array<Hash>

export type TransactionEntity = {
    id: Hash,
    type: TransactionType,
    state: TransactionState,
    receipt: ?Receipt,
    error: ?TransactionError,
}

export type TransactionEntityList = Array<TransactionEntity>

export type TransactionEntities = {
    [Hash]: TransactionEntity,
}