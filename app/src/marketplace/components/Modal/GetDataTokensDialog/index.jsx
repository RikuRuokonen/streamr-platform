// @flow

import React from 'react'
import { Translate, I18n } from 'react-redux-i18n'

import NoDataPng from '../../../assets/wallet_no_data.png'
import NoDataPng2x from '../../../assets/wallet_no_data@2x.png'
import Dialog from '$shared/components/Dialog'
import ExternalLinkButton from '$shared/components/Buttons/ExternalLinkButton'

import styles from './getDataTokensDialog.pcss'

export type Props = {
    onCancel: () => void,
}

const GetDataTokensDialog = ({ onCancel }: Props) => (
    <Dialog
        title={I18n.t('modal.getDataTokensDialog.title')}
        onClose={onCancel}
    >
        <img className={styles.icon} src={NoDataPng} srcSet={`${NoDataPng2x} 2x`} alt={I18n.t('error.wallet')} />
        <Translate value="modal.getDataTokensDialog.message" className={styles.message} />

        <div className={styles.buttonContainer}>
            <ExternalLinkButton
                textI18nKey="modal.getDataTokensDialog.link.bancor"
                href="https://www.bancor.network/"
                className={styles.button}
            />
        </div>
    </Dialog>
)

export default GetDataTokensDialog
