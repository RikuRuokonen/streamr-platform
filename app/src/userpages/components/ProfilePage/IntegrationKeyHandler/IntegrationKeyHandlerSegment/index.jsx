// @flow

import React, { Fragment, Component } from 'react'
import { I18n } from 'react-redux-i18n'

import type { IntegrationKey } from '../../../../flowtype/integration-key-types'
import IntegrationKeyList from './IntegrationKeyList'
import AddKeyField from '$userpages/components/KeyField/AddKeyField'

import styles from './integrationKeyHandlerSegment.pcss'

import type { Props as ListProps } from './IntegrationKeyList'

type GivenProps = {
    className?: string,
    name?: $ElementType<IntegrationKey, 'name'>,
    showInput: boolean,
    onNew: (integrationKey: string) => void,
}

type Props = ListProps & GivenProps

export default class IntegrationKeyHandlerSegment extends Component<Props> {
    static defaultProps = {
        showInput: true,
    }

    render() {
        return (
            <Fragment>
                <IntegrationKeyList
                    integrationKeys={this.props.integrationKeys}
                    onDelete={this.props.onDelete}
                />
                {this.props.showInput && (
                    <div className={styles.addKey}>
                        <AddKeyField
                            label={I18n.t('userpages.profilePage.ethereumAddress.addNewAddress')}
                            onSave={this.props.onNew}
                        />
                    </div>
                )}
            </Fragment>
        )
    }
}
