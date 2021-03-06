// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Label } from 'reactstrap'
import { parseDashboard } from '$userpages/helpers/parseState'

import { updateDashboard } from '$userpages/modules/dashboard/actions'

import type { StoreState } from '$userpages/flowtype/states/store-state'
import type { Dashboard } from '$userpages/flowtype/dashboard-types'

import styles from './nameEditor.pcss'

type StateProps = {
    dashboard: ?Dashboard,
    canWrite: boolean
}

type DispatchProps = {
    update: (db: Dashboard) => void
}

type Props = StateProps & DispatchProps

export class NameEditor extends Component<Props> {
    onChange = ({ target }: SyntheticInputEvent<HTMLInputElement>) => {
        this.props.update({
            ...this.props.dashboard,
            name: target.value,
        })
    }

    render() {
        const value = (this.props.dashboard && this.props.dashboard.name) || ''
        return (
            <div className={`menu-content ${styles.nameEditor}`}>
                <Label>
                    Dashboard Name
                </Label>
                <Input
                    type="text"
                    className="dashboard-name title-input"
                    value={value}
                    onChange={this.onChange}
                    disabled={!this.props.canWrite}
                />
            </div>
        )
    }
}

export const mapStateToProps = (state: StoreState): StateProps => parseDashboard(state)

export const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    update(dashboard: Dashboard) {
        return dispatch(updateDashboard(dashboard))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(NameEditor)
