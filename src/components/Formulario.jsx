import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import PropTypes from 'prop-types';

import useControlSelect from '../hooks/useControlSelect';
import Error from '../components/Error';

const Boton = styled.button`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {

    const MONEDAS = [
        { Key: '000', Value: '', Name: '---     Seleccione Moneda     ---'},
        { Key: 'USD', Value: 'USD', Name: 'Dolar Americano'},
        { Key: 'MXN', Value: 'MXN', Name: 'Peso Mexicano'},
        { Key: 'EUR', Value: 'EUR', Name: 'Euro'},
        { Key: 'GBP', Value: 'GBP', Name: 'Libra Esterlina'}
    ];

    const [criptomonedas, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    useEffect(() => 
    {
        const consultarAPI = async () => 
        {
            var dataCriptomoneda = [];
            const response = await axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD');
        
            dataCriptomoneda.push({
                Key: '000',
                Value: '',
                Name: '---     Seleccione Criptomoneda     ---'
            });

            response.data.Data.forEach(element => {
                dataCriptomoneda.push({
                    Key: element.CoinInfo.Id,
                    Value: element.CoinInfo.Name,
                    Name: element.CoinInfo.FullName
                });
            });
            
            guardarCriptomonedas(dataCriptomoneda)
        };

        consultarAPI();
        
    }, []);

    const [stateMoneda, CtrlMoneda ] = useControlSelect('Moneda: ', '', MONEDAS);
    const [stateCriptomoneda, CtrlCriptomoneda ] = useControlSelect('Criptomoneda: ', '', criptomonedas);

    const handleSubmit = e => {
        e.preventDefault();

        // Validacion
        if (stateMoneda === '' || stateCriptomoneda === '')
        {
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarMoneda(stateMoneda);
        guardarCriptomoneda(stateCriptomoneda);
    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje='Todos los campos son requeridos' /> : null}
            <CtrlMoneda />
            <CtrlCriptomoneda />
            <Boton type="submit">Calcular Cotización</Boton>
        </form>
    );
};

Formulario.propTypes = {
    guardarMoneda: PropTypes.func.isRequired, 
    guardarCriptomoneda: PropTypes.func.isRequired
};
 
export default Formulario;