// @flow

import React, { Component } from 'react'
import classnames from 'classnames'

import type { Canvas } from '../../../../../flowtype/canvas-types'
import ModuleList from './ModuleList/index'

import styles from './canvasInList.pcss'

type Props = {
    canvas: Canvas
}

type State = {
    open: boolean
}

export default class CanvasInList extends Component<Props, State> {
    state = {
        open: false,
    }

    onClick = () => {
        this.setState(({ open }) => ({
            open: !open,
        }))
    }

    render() {
        const { canvas } = this.props
        return (
            <li className={`mm-dropdown mm-dropdown-root ${this.state.open ? 'open' : ''} ${styles.canvasInList}`}>
                <a href="#" className={styles.canvasInListLink} title={canvas.state} onClick={this.onClick}>
                    <span
                        className={classnames('mm-text mmc-dropdown-delay animated fadeIn', styles.canvasTitle, {
                            [styles.stopped]: canvas.state === 'STOPPED',
                        })}
                    >
                        {canvas.name}
                    </span>
                    <span className="howmanychecked badge badge-primary">
                        {(canvas.modules.filter((module) => module.checked)).length || ''}
                    </span>
                </a>
                <ModuleList modules={canvas.modules} canvasId={canvas.id} />
            </li>
        )
    }
}
