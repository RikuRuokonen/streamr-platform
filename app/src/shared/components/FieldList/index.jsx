// @flow

import * as React from 'react'
import cx from 'classnames'

import SortableList from '../SortableList'
import FieldItem from './FieldItem'

type Props = {
    className?: string,
    children: React.Node,
    onSortStart?: (Object) => void,
    onSortEnd?: (Object) => void,
}

type State = {
    locked: boolean,
}

class FieldList extends React.Component<Props, State> {
    state = {
        locked: false,
    }

    onSortStart = (...args: any) => {
        const { onSortStart } = this.props

        this.setState({
            locked: true,
        })

        if (onSortStart) {
            onSortStart(...args)
        }
    }

    onSortEnd = (...args: any) => {
        const { onSortEnd } = this.props

        this.setState({
            locked: false,
        })

        if (onSortEnd) {
            onSortEnd(...args)
        }
    }

    render() {
        const { children, className, ...props } = this.props
        const { locked } = this.state

        return (
            <SortableList
                className={cx({
                    [FieldItem.styles.locked]: locked,
                })}
                helperClass={FieldItem.styles.helper}
                lockAxis="y"
                {...props}
                onSortStart={this.onSortStart}
                onSortEnd={this.onSortEnd}
                useDragHandle
            >
                {children}
            </SortableList>
        )
    }
}

export default FieldList
