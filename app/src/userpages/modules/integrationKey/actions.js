// @flow

import { error as errorNotification, success as successNotification } from 'react-notification-system-redux'

import * as api from '$shared/utils/api'
import type { IntegrationKey } from '../../flowtype/integration-key-types'
import type { ErrorInUi } from '$shared/flowtype/common-types'
import getWeb3 from '../../utils/web3Provider'

export const GET_AND_REPLACE_INTEGRATION_KEYS_REQUEST = 'GET_AND_REPLACE_INTEGRATION_KEYS_REQUEST'
export const GET_AND_REPLACE_INTEGRATION_KEYS_SUCCESS = 'GET_AND_REPLACE_INTEGRATION_KEYS_SUCCESS'
export const GET_AND_REPLACE_INTEGRATION_KEYS_FAILURE = 'GET_AND_REPLACE_INTEGRATION_KEYS_FAILURE'

export const GET_INTEGRATION_KEYS_BY_SERVICE_REQUEST = 'GET_INTEGRATION_KEYS_BY_SERVICE_REQUEST'
export const GET_INTEGRATION_KEYS_BY_SERVICE_SUCCESS = 'GET_INTEGRATION_KEYS_BY_SERVICE_SUCCESS'
export const GET_INTEGRATION_KEYS_BY_SERVICE_FAILURE = 'GET_INTEGRATION_KEYS_BY_SERVICE_FAILURE'

export const CREATE_INTEGRATION_KEY_REQUEST = 'CREATE_INTEGRATION_KEY_REQUEST'
export const CREATE_INTEGRATION_KEY_SUCCESS = 'CREATE_INTEGRATION_KEY_SUCCESS'
export const CREATE_INTEGRATION_KEY_FAILURE = 'CREATE_INTEGRATION_KEY_FAILURE'

export const DELETE_INTEGRATION_KEY_REQUEST = 'DELETE_INTEGRATION_KEY_REQUEST'
export const DELETE_INTEGRATION_KEY_SUCCESS = 'DELETE_INTEGRATION_KEY_SUCCESS'
export const DELETE_INTEGRATION_KEY_FAILURE = 'DELETE_INTEGRATION_KEY_FAILURE'

export const CREATE_IDENTITY_REQUEST = 'CREATE_IDENTITY_REQUEST'
export const CREATE_IDENTITY_SUCCESS = 'CREATE_IDENTITY_SUCCESS'
export const CREATE_IDENTITY_FAILURE = 'CREATE_IDENTITY_FAILURE'

const apiUrl = `${process.env.STREAMR_API_URL}/integration_keys`

const getAndReplaceIntegrationKeysRequest = () => ({
    type: GET_AND_REPLACE_INTEGRATION_KEYS_REQUEST,
})

const getIntegrationKeysByServiceRequest = (service: $ElementType<IntegrationKey, 'service'>) => ({
    type: GET_INTEGRATION_KEYS_BY_SERVICE_REQUEST,
    service,
})

const createIntegrationKeyRequest = () => ({
    type: CREATE_INTEGRATION_KEY_REQUEST,
})

const deleteIntegrationKeyRequest = (id: $ElementType<IntegrationKey, 'id'>) => ({
    type: DELETE_INTEGRATION_KEY_REQUEST,
    id,
})

const getAndReplaceIntegrationKeysSuccess = (integrationKeys: Array<IntegrationKey>) => ({
    type: GET_AND_REPLACE_INTEGRATION_KEYS_SUCCESS,
    integrationKeys,
})

const getIntegrationKeysByServiceSuccess = (service: $ElementType<IntegrationKey, 'service'>, integrationKeys: Array<IntegrationKey>) => ({
    type: GET_INTEGRATION_KEYS_BY_SERVICE_SUCCESS,
    integrationKeys,
    service,
})

const createIntegrationKeySuccess = (integrationKey: IntegrationKey) => ({
    type: CREATE_INTEGRATION_KEY_SUCCESS,
    integrationKey,
})

const deleteIntegrationKeySuccess = (id: $ElementType<IntegrationKey, 'id'>) => ({
    type: DELETE_INTEGRATION_KEY_SUCCESS,
    id,
})

const getAndReplaceIntegrationKeysFailure = (error: ErrorInUi) => ({
    type: GET_AND_REPLACE_INTEGRATION_KEYS_FAILURE,
    error,
})

const getIntegrationKeysByServiceFailure = (service: string, error: ErrorInUi) => ({
    type: GET_INTEGRATION_KEYS_BY_SERVICE_FAILURE,
    error,
    service,
})

const createIntegrationKeyFailure = (error: ErrorInUi) => ({
    type: CREATE_INTEGRATION_KEY_FAILURE,
    error,
})

const deleteIntegrationKeyFailure = (error: ErrorInUi) => ({
    type: DELETE_INTEGRATION_KEY_FAILURE,
    error,
})

const createIdentityRequest = (integrationKey: IntegrationKey) => ({
    type: CREATE_IDENTITY_REQUEST,
    integrationKey,
})

const createIdentitySuccess = (integrationKey: IntegrationKey) => ({
    type: CREATE_IDENTITY_SUCCESS,
    integrationKey,
})

const createIdentityFailure = (error: ErrorInUi) => ({
    type: CREATE_IDENTITY_FAILURE,
    error,
})

export const getAndReplaceIntegrationKeys = () => (dispatch: Function) => {
    dispatch(getAndReplaceIntegrationKeysRequest())
    return api.get(apiUrl)
        .then((data) => {
            dispatch(getAndReplaceIntegrationKeysSuccess(data))
            dispatch(successNotification({
                message: 'IntegrationKey created successfully!',
            }))
        })
        .catch((e) => {
            dispatch(getAndReplaceIntegrationKeysFailure(e))
            dispatch(errorNotification({
                title: e.message,
            }))
            throw e
        })
}

export const getIntegrationKeysByService = (service: $ElementType<IntegrationKey, 'service'>) => (dispatch: Function) => {
    dispatch(getIntegrationKeysByServiceRequest(service))
    return api.get(apiUrl, {
        params: {
            service,
        },
    })
        .then((data) => dispatch(getIntegrationKeysByServiceSuccess(service, data)))
        .catch((e) => {
            dispatch(getIntegrationKeysByServiceFailure(service, e))
            dispatch(errorNotification({
                title: e.message,
            }))
            throw e
        })
}

export const createIntegrationKey = (integrationKey: IntegrationKey) => (dispatch: Function) => {
    dispatch(createIntegrationKeyRequest())
    return api.post(apiUrl, integrationKey)
        .then((data) => dispatch(createIntegrationKeySuccess(data)))
        .catch((e) => {
            dispatch(createIntegrationKeyFailure(e))
            dispatch(errorNotification({
                title: e.message,
            }))
            throw e
        })
}

export const deleteIntegrationKey = (id: $ElementType<IntegrationKey, 'id'>) => (dispatch: Function) => {
    if (!id) {
        throw new Error('No id!')
    }
    dispatch(deleteIntegrationKeyRequest(id))
    return api.del(`${apiUrl}/${id}`)
        .then(() => dispatch(deleteIntegrationKeySuccess(id)))
        .catch((e) => {
            dispatch(deleteIntegrationKeyFailure(e))
            dispatch(errorNotification({
                title: e.message,
            }))
            throw e
        })
}

export const createIdentity = (integrationKey: IntegrationKey) => (dispatch: Function) => {
    const ownWeb3 = getWeb3()
    dispatch(createIdentityRequest(integrationKey))

    if (!ownWeb3.isEnabled()) {
        dispatch(createIdentityFailure({
            message: 'MetaMask browser extension is not installed',
        }))
        dispatch(errorNotification({
            title: 'Create identity failed',
            message: 'MetaMask browser extension is not installed',
        }))
        return Promise.resolve()
    }

    return ownWeb3.getDefaultAccount()
        .then((account) => (
            api.post(`${process.env.STREAMR_API_URL}/login/challenge/${account}`)
                .then((response) => {
                    const challenge = response && response.challenge
                    return ownWeb3.eth.personal.sign(challenge, account)
                        .then((signature) => (
                            api.post(apiUrl, {
                                ...integrationKey,
                                challenge: response,
                                signature,
                                address: account,
                            })
                                .then((data) => {
                                    const { id, name, service, json } = data
                                    dispatch(createIdentitySuccess({
                                        id,
                                        name,
                                        service,
                                        json,
                                    }))
                                    dispatch(successNotification({
                                        title: 'Success!',
                                        message: 'New identity created',
                                    }))
                                })
                        ))
                })
        ))
        .catch((err) => {
            dispatch(createIdentityFailure(err))
            dispatch(errorNotification({
                title: 'Create identity failed',
                message: err.message,
            }))
            throw err
        })
}
