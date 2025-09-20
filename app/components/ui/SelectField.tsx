import React from 'react';
import CreatableSelect from "react-select/creatable";
import { CSSObjectWithLabel } from 'react-select';
import { useTheme } from '@/app/context/ThemeContext';

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

const SelectField = (props: CreatableSelectProps) => {
    const { isDarkMode } = useTheme();

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

    const customStyles = {
        control: (styles: CSSObjectWithLabel, { isFocused }: any) => ({
            ...styles,
            backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
            borderColor: isDarkMode ? (isFocused ? '#63b3ed' : '#4a5568') : (isFocused ? '#007BFF' : '#ccc'),
            borderRadius: '6px',
            boxShadow: 'none',
            fontSize: '14px',
            '&:hover': {
                borderColor: isDarkMode ? '#63b3ed' : '#007BFF',
            },
        }),
        option: (styles: CSSObjectWithLabel, { isSelected, isFocused }: any) => ({
            ...styles,
            backgroundColor: isSelected
                ? (isDarkMode ? '#4a5568' : '#0056b3')
                : isFocused
                    ? (isDarkMode ? '#4a5568' : '#e6f0ff')
                    : 'transparent',
            color: isSelected ? '#ffffff' : (isDarkMode ? '#e2e8f0' : '#333'),
            padding: '10px 20px',
            fontSize: '14px',
            borderRadius: '4px',
            '&:hover': {
                backgroundColor: isSelected ? (isDarkMode ? '#3a445c' : '#004080') : (isDarkMode ? '#4a5568' : '#e6f0ff'),
            },
        }),
        menu: (styles: CSSObjectWithLabel) => ({
            ...styles,
            backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
            borderRadius: '6px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            padding: '4px 0',
            zIndex: 10,
        }),
        input: (styles: CSSObjectWithLabel) => ({
            ...styles,
            color: isDarkMode ? '#e2e8f0' : '#333',
            fontSize: '14px',
            padding: '8px',
        }),
        placeholder: (styles: CSSObjectWithLabel) => ({
            ...styles,
            color: isDarkMode ? '#a0aec0' : '#999',
        }),
        singleValue: (styles: CSSObjectWithLabel) => ({
            ...styles,
            color: isDarkMode ? '#e2e8f0' : '#333',
            backgroundColor: isDarkMode ? '#4a5568' : "#dbeafe",
            borderRadius: '6px',
            padding: '2px 8px',
        }),
        multiValue: (styles: CSSObjectWithLabel) => ({
            ...styles,
            backgroundColor: isDarkMode ? '#4a5568' : "#dbeafe",
            borderRadius: '6px',
        }),
        multiValueLabel: (styles: CSSObjectWithLabel) => ({
            ...styles,
            color: isDarkMode ? '#e2e8f0' : '#333',
        }),
        multiValueRemove: (styles: CSSObjectWithLabel) => ({
            ...styles,
            color: isDarkMode ? '#a0aec0' : '#999',
            '&:hover': {
                backgroundColor: isDarkMode ? '#3a445c' : '#e0e0e0',
                color: isDarkMode ? '#e2e8f0' : '#333',
            },
        }),
        clearIndicator: (styles: CSSObjectWithLabel) => ({
            ...styles,
            color: isDarkMode ? '#e2e8f0' : '#999',
            '&:hover': {
                color: isDarkMode ? '#cbd5e0' : '#007BFF',
            },
        }),
    };

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