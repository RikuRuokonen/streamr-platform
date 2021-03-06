// @flow

import React from 'react'
import Select, { components } from 'react-select'

import FormControl, { type FormControlProps } from '../FormControl'
import SvgIcon from '../SvgIcon'
import styles from './selectInput.pcss'

type Props = FormControlProps & {
    placeholder?: string,
    options: Array<any>,
    value: any,
    name: string,
    onChange: Function,
    required: boolean,
    clearable: boolean,
}

const customStyles = {
    control: (provided) => ({
        ...provided,
        fontSize: '14px',
        padding: '0',
        '&:hover': {
            border: '0',
            path: {
                stroke: '#A3A3A3',
            },
        },
        border: '0',
        boxShadow: 'none',
        cursor: 'pointer',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#323232',
    }),
    indicatorSeparator: () => ({}),
    menu: (provided) => ({
        ...provided,
        marginTop: '0.5rem',
        padding: '0',
    }),
    menuList: (provided) => ({
        ...provided,
        margin: '0.2rem 0',
        padding: '0',
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '14px',
        padding: '0.5rem 1rem',
        paddingLeft: '2rem',
        lineHeight: 'normal',
        color: '#323232',
        position: 'relative',
        backgroundColor: state.isSelected || state.isFocused ? '#f8f8f8' : null,
        '&:active': {
            backgroundColor: '#f8f8f8',
        },
    }),
    placeholder: () => ({
        lineHeight: 'normal',
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0.1rem 1rem',
        lineHeight: 'normal',
        color: '#323232',
    }),
}

const IconOption = (props) => (
    <components.Option {...props}>
        {props.isSelected && (
            <SvgIcon name="tick" className={styles.tick} />
        )}
        {props.data.label}
    </components.Option>
)

const DropdownIndicator = (props) => (
    components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
            <SvgIcon name="caretDown" className={styles.caret} />
        </components.DropdownIndicator>
    )
)

const SelectInput = ({ label, className, ...props }: Props) => (
    <FormControl
        noUnderline
        preserveLabelSpace
        preserveLabelPosition
        {...props}
        label={label}
    >
        {({ value, onFocusChange, setAutoCompleted, ...rest }) => (
            <Select
                {...rest}
                className={styles.select}
                styles={customStyles}
                value={value}
                onBlur={onFocusChange}
                onFocus={onFocusChange}
                components={{
                    IndicatorSeparator: null,
                    Option: IconOption,
                    DropdownIndicator,
                }}
            />
        )}
    </FormControl>
)

SelectInput.defaultProps = {
    required: false,
    clearable: true,
}

export default SelectInput
