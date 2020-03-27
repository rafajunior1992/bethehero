import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() { 
    const [incidents, setIncidents] = useState([]); /** variavel usada para retornar os casos, tem que ser um array para que seja possível armazenar vários dados  */
    
    const history = useHistory();
    const ongId = localStorage.getItem('ongId'); /** pegando id da ong salvo no localstorage quando a ong logou no site */
    const ongName = localStorage.getItem('ongName'); /** pegando nome da ong salvo no localstorage */

    useEffect(() => { 
        api.get('profile', { 
            headers: {
                Authorization: ongId 
            }
        }).then(response => { /** .then sendo utilizado para pegar a resposta de dados */
            setIncidents(response.data);
      })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err) {
            alert('Erro ao deletar caso, tente novamente.');
        }

    }
    
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => ( /* .map percorre os casos do banco e retorna algo  */
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

/** useEffect(() => {}, []) toda vez que a dependencia que está no array é alterada
     *  ele executa o código que está entre chaves
     */
    /** useEffect usado para disparar uma função em determinado momento do componente, 
     * por exemplo assim que ele é mostrado em tela */
    /** useEffect recebe dois parametros, qual função e quando será executada */