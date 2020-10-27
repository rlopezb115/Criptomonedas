import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 0.5rem;
    --webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useControlSelect = (label, estadoInicial, opciones) => {
    const [state, setState] = useState(estadoInicial);

    const SelectOption = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => setState(e.target.value)}
                value={state}
            >
                {
                    opciones.map(opcion => (
                        <option
                            key={opcion.Key}
                            value={opcion.Value}
                        >
                            {opcion.Name}
                        </option>
                    ))
                }
            </Select>
        </Fragment>
    );

    return[state, SelectOption];
}

useControlSelect.propTypes = {
    label: PropTypes.string.isRequired, 
    estadoInicial: PropTypes.string.isRequired, 
    opciones: PropTypes.array.isRequired
};

export default useControlSelect;