import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spiner from './components/Spiner';
import imagen from './cryptomonedas.png';

const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;

    @media (min-width: 992px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
`;

const Imagen = styled.img`
    max-width: 100%;
    margin-top: 5rem;
`;

const Heading = styled.h1`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-align: left;
    font-weight: 700;
    font-size: 50px;
    margin-top: 80px 0 50px;

    &::after{
        content: '';
        width: 100px;
        height: 6px;
        background-color: #66A2FE;
        display: block;
    }
`;

const App = () => 
{
    const [moneda, guardarMoneda] = useState('');
    const [criptomoneda, guardarCriptomoneda] = useState('');
    const [resultado, guardarResultado] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const cotizarCriptomoneda = async () => 
        {
            if (moneda === '' || criptomoneda === '') return;
            setIsLoading(true);
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
            const response = await axios.get(url);
            guardarResultado(response.data.DISPLAY[criptomoneda][moneda]);
            setTimeout(() => {setIsLoading(false)}, 3000);
        };

        cotizarCriptomoneda();

    }, [moneda, criptomoneda]);

    return (
        <Contenedor>
            <div>
                <Imagen 
                    alt="Imagen Criptomoneda"
                    src={imagen}
                />
            </div>
            <div>
                <Heading>Cotizar Criptomonedas al Instante</Heading>
                <Formulario 
                    guardarMoneda={guardarMoneda}
                    guardarCriptomoneda={guardarCriptomoneda}
                />
                {
                    isLoading ? <Spiner /> : <Cotizacion resultado={resultado} />
                }
            </div>
        </Contenedor>
    );
}
 
export default App;