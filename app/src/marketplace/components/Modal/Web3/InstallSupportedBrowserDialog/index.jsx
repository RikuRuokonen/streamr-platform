// @flow

import React from 'react'
import { Translate, I18n } from 'react-redux-i18n'

import BrowserNotSupportedPng from '../../../../assets/browser_not_supported.png'
import BrowserNotSupportedPng2x from '../../../../assets/browser_not_supported@2x.png'
import Dialog from '$shared/components/Dialog'
import ExternalLinkButton from '$shared/components/Buttons/ExternalLinkButton'

import styles from './installSupportedBrowserDialog.pcss'

export type Props = {
    onClose: () => void,
}

const InstallSupportedBrowserDialog = ({ onClose, ...props }: Props) => (
    <Dialog
        onClose={onClose}
        title={I18n.t('modal.web3.installsupportedbrowser.title')}
        {...props}
    >
        <img
            className={styles.icon}
            src={BrowserNotSupportedPng}
            srcSet={`${BrowserNotSupportedPng2x} 2x`}
            alt={I18n.t('modal.web3.installsupportedbrowser.imageCaption')}
        />
        <p><Translate value="modal.web3.installsupportedbrowser.message" dangerousHTML /></p>

        <div className={styles.buttonContainer}>
            <ExternalLinkButton
                textI18nKey="modal.web3.installsupportedbrowser.brave"
                href="https://brave.com/"
                className={styles.button}
            />
            <ExternalLinkButton
                textI18nKey="modal.web3.installsupportedbrowser.chrome"
                href="https://www.google.com/chrome/"
                className={styles.button}
            />
            <ExternalLinkButton
                textI18nKey="modal.web3.installsupportedbrowser.firefox"
                href="https://www.mozilla.org/en-US/firefox/new/"
                className={styles.button}
            />
        </div>
    </Dialog>
)

export default InstallSupportedBrowserDialog
