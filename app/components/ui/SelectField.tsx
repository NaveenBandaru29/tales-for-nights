import React from 'react';
import CreatableSelect from "react-select/creatable";
import { CSSObjectWithLabel } from 'react-select';

export interface OptionsType {
    label: string;
    value: string;
}

interface CreatableSelectProps {
    isMulti: boolean;
    isClearable: boolean;
    options: OptionsType[];
    value: any;
    onChange: any;
    getOptionLabel?: any; // Ensure label is shown correctly
    getOptionValue?: any;
    placeholder?: string;
    className?: string;
}

const customStyles = {
    control: (styles: CSSObjectWithLabel) => ({
        ...styles,
        backgroundColor: '#ffffff', // White background for the control
        borderColor: '#ccc', // Light gray border
        // padding: '8px 12px',
        borderRadius: '6px',
        boxShadow: 'none',
        fontSize: '14px',
        '&:hover': {
            borderColor: '#007BFF', // Blue border on hover
        },
        '&:focus': {
            borderColor: '#0056b3', // Dark blue border when focused
            boxShadow: '0 0 0 0.2rem rgba(0, 91, 255, 0.25)', // Light blue focus shadow
        },
    }),
    option: (styles: CSSObjectWithLabel, { isSelected, isFocused }: any) => ({
        ...styles,
        backgroundColor: isSelected
            ? '#0056b3' // Dark blue when selected
            : isFocused
            ? '#e6f0ff' // Light blue on hover/focus
            : 'transparent',
        color: isSelected ? '#ffffff' : isFocused ? '#003366' : '#333', // White when selected, dark blue when hovered
        padding: '10px 20px',
        fontSize: '14px',
        borderRadius: '4px',
        '&:hover': {
            backgroundColor: isSelected ? '#004080' : '#e6f0ff', // Darker blue or light blue on hover
        },
    }),
    menu: (styles: CSSObjectWithLabel) => ({
        ...styles,
        backgroundColor: '#ffffff', // White background for the dropdown
        borderRadius: '6px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow
        padding: '4px 0',
        zIndex: 10,
    }),
    input: (styles: CSSObjectWithLabel) => ({
        ...styles,
        color: '#333', // Dark text color for input
        fontSize: '14px',
        padding: '8px',
    }),
    placeholder: (styles: CSSObjectWithLabel) => ({
        ...styles,
        color: '#999', // Light gray for placeholder text
    }),
    singleValue: (styles: CSSObjectWithLabel) => ({
        ...styles,
        color: '#333', // Dark text color for selected value
        backgroundColor:"#dbeafe"
    }),
    clearIndicator: (styles: CSSObjectWithLabel) => ({
        ...styles,
        color: '#007BFF', // Blue color for the clear indicator
        '&:hover': {
            color: '#0056b3', // Dark blue when hovered
        },
    }),
};

const SelectField = (props: CreatableSelectProps) => {
    const {
        isClearable,
        isMulti = false,
        onChange,
        options,
        value,
        className,
        getOptionLabel,
        getOptionValue,
        placeholder,
    } = props;

    return (
        <CreatableSelect
            isMulti={isMulti}
            isClearable={isClearable}
            styles={customStyles}
            onChange={onChange}
            options={options as OptionsType[]}
            value={value}
            className={className || ""}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            placeholder={placeholder || "-- Select --"}
        />
    );
};

export default SelectField;
