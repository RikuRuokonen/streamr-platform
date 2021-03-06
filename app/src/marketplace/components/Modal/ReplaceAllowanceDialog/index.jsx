// @flow

import React from 'react'
import { Translate, I18n } from 'react-redux-i18n'

import Dialog from '$shared/components/Dialog'
import links from '../../../../links'

import style from '../SetAllowanceDialog/setAllowanceDialog.pcss'

export type Props = {
    gettingAllowance: boolean,
    settingAllowance: boolean,
    onCancel: () => void,
    onSet: () => void,
}

const HelpText = () => (
    <p className={style.helpText}>
        <Translate value="modal.replaceAllowance.helpText" resetAllowanceLink={links.resetAllowanceInfo} dangerousHTML />
    </p>
)

const ReplaceAllowanceDialog = ({ gettingAllowance, settingAllowance, onCancel, onSet }: Props) => {
    if (settingAllowance) {
        return (
            <Dialog
                onClose={onCancel}
                title={I18n.t('modal.setAllowance.started.title')}
                actions={{
                    cancel: {
                        title: I18n.t('modal.common.cancel'),
                        onClick: onCancel,
                        color: 'link',
                    },
                    publish: {
                        title: I18n.t('modal.common.waiting'),
                        color: 'primary',
                        disabled: true,
                        spinner: true,
                    },
                }}
            >
                <div>
                    <p><Translate value="modal.replaceAllowance.started.message" dangerousHTML /></p>
                </div>
            </Dialog>
        )
    }

    return (
        <Dialog
            onClose={onCancel}
            title={I18n.t('modal.setAllowance.title')}
            waiting={gettingAllowance}
            helpText={<HelpText />}
            actions={{
                cancel: {
                    title: I18n.t('modal.common.cancel'),
                    color: 'link',
                    onClick: onCancel,
                },
                next: {
                    title: I18n.t('modal.common.next'),
                    color: 'primary',
                    outline: true,
                    onClick: () => onSet(),
                },
            }}
        >
            <p><Translate value="modal.replaceAllowance.message" dangerousHTML /></p>
        </Dialog>
    )
}

ReplaceAllowanceDialog.defaultProps = {
    gettingAllowance: false,
    settingAllowance: false,
}

export default ReplaceAllowanceDialog
