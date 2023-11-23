
import React, { useState } from 'react';
import Select from 'react-select';
const SelectInput = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { value: 'en', label: 'En' },
        { value: 'sb', label: 'Sb' },
    ];
    return (
        <Select
            defaultValue={selectedOption}
            placeholder={options[0].label}
            onChange={setSelectedOption}
            options={options}
            className="react-select form-item__select"
            classNamePrefix="react-select"
            // Theme={neutral5}
            // defaultMenuIsOpen={true}
        />
    );
};

export {SelectInput};
