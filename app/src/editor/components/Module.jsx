/* eslint-disable react/no-unused-state */

import React from 'react'
import cx from 'classnames'

import withErrorBoundary from '$shared/utils/withErrorBoundary'
import { Translate } from 'react-redux-i18n'

import { DragSource } from '../utils/dnd'
import { DragTypes, RunStates } from '../state'

import { Resizer, isModuleResizable } from './Resizer'
import RenameInput from './RenameInput'
import Ports from './Ports'

import styles from './Module.pcss'

class CanvasModule extends React.Component {
    state = {
        isDraggable: true,
        isResizing: false,
    }

    // for disabling dragging when cursor is over interactive controls e.g. inputs
    setIsDraggable = (isDraggable) => {
        this.setState({
            isDraggable,
        })
    }

    /**
     * Resizer handling
     */

    ref = React.createRef()
    onRef = (el) => {
        // manually set ref as react-dnd chokes on React.createRef()
        // https://github.com/react-dnd/react-dnd/issues/998
        this.ref.current = el
    }

    onAdjustLayout = (layout) => {
        // update a temporary layout when resizing so only need to trigger
        // single undo action
        this.setState((state) => ({
            layout: {
                ...state.layout,
                ...layout,
            },
        }))
    }

    onResizing = (isResizing) => {
        this.setState({
            isResizing,
        })
    }

    static getDerivedStateFromProps(props, state) {
        if (state.isResizing || !props.module) {
            return null // don't update while user is editing
        }

        return {
            layout: props.module.layout,
        }
    }

    onTriggerOptions = (event) => {
        event.stopPropagation()
        const { api, module, moduleSidebarIsOpen, selectedModuleHash } = this.props
        const isSelected = module.hash === selectedModuleHash

        // need to selectModule here rather than in parent focus handler
        // otherwise selection changes before we can toggle open/close behaviour
        api.selectModule({ hash: module.hash })
        if (isSelected) {
            // toggle sidebar if same module
            api.moduleSidebarOpen(!moduleSidebarIsOpen)
        } else {
            // only open if different
            api.moduleSidebarOpen(true)
        }
    }

    onFocusOptionsButton = (event) => {
        event.stopPropagation() /* skip parent focus behaviour */
    }

    onChangeModuleName = (value) => (
        this.props.api.renameModule(this.props.module.hash, value)
    )

    render() {
        const {
            api,
            module,
            canvas,
            connectDragSource,
            isDragging,
        } = this.props
        const { isDraggable, layout } = this.state

        const isSelected = module.hash === this.props.selectedModuleHash

        const maybeConnectDragging = (el) => (
            isDraggable ? connectDragSource(el) : el
        )

        const isRunning = canvas.state === RunStates.Running
        const isResizable = isModuleResizable(module)

        return maybeConnectDragging((
            /* eslint-disable-next-line max-len */
            /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-tabindex */
            <div
                role="rowgroup"
                tabIndex="0"
                onFocus={() => api.selectModule({ hash: module.hash })}
                className={cx(styles.Module, {
                    [styles.isSelected]: isSelected,
                })}
                hidden={isDragging}
                style={{
                    top: layout.position.top,
                    left: layout.position.left,
                    minHeight: layout.height,
                    minWidth: layout.width,
                }}
                data-modulehash={module.hash}
                ref={this.onRef}
            >
                <div className={styles.moduleHeader}>
                    <RenameInput
                        className={styles.name}
                        value={module.displayName || module.name}
                        onChange={this.onChangeModuleName}
                        disabled={!!isRunning}
                        required
                    />
                    <button
                        type="button"
                        className={styles.optionsButton}
                        onFocus={this.onFocusOptionsButton}
                        onClick={this.onTriggerOptions}
                    >
                        <HamburgerIcon />
                    </button>
                </div>
                <Ports
                    {...this.props}
                    setIsDraggable={this.setIsDraggable}
                />
                {!!isResizable && !isRunning && (
                    /* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */
                    <Resizer
                        module={module}
                        api={api}
                        target={this.ref}
                        onMouseOver={() => this.setIsDraggable(false)}
                        onMouseOut={() => this.setIsDraggable(true)}
                        onResizing={this.onResizing}
                        onAdjustLayout={this.onAdjustLayout}
                    />
                )}
            </div>
        ))
        /* eslint-enable */
    }
}

function HamburgerIcon(props = {}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <g fill="none" fillRule="evenodd" stroke="#CDCDCD" strokeLinecap="round" strokeWidth="1.5">
                <path d="M7 16h10M7 12h10M7 8h10" />
            </g>
        </svg>
    )
}

// try render module error in-place
function ModuleError(props) {
    const { module } = props
    const { layout } = module
    return (
        <div
            className={cx(styles.Module)}
            style={{
                top: layout.position.top,
                left: layout.position.left,
                minHeight: layout.height,
                minWidth: layout.width,
            }}
        >
            <div className={styles.moduleHeader}>
                {module.displayName || module.name}
            </div>
            <div className={styles.ports}>
                <Translate value="error.general" />
            </div>
        </div>
    )
}

export default DragSource(DragTypes.Module)(withErrorBoundary(ModuleError)(CanvasModule))
