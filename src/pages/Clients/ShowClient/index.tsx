import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loader from 'react-loader-spinner';
import 'react-tabs/style/react-tabs.css';

import { useToast } from '../../../hooks/toast';
import Button from '../../../components/Button';

import api from '../../../services/api';
import * as S from './styles';

interface Client {
  id: string;
  name: string;
  cpf: string;
  email: string;
  rg: string;
  telefone: string;
  dataNasc: Date;
  emprestimos: [
    {
      id: string;
    },
  ];
  addresses: [
    {
      id: string;
    },
  ];
}

interface ParamTypes {
  id: string;
}

const ShowClient: React.FC = () => {
  const { id } = useParams<ParamTypes>();
  const [client, setClient] = useState<Client>();
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const { addToast } = useToast();

  useEffect(() => {
    async function loadClient(): Promise<void> {
      try {
        setLoading(true);
        const response = await api.get(`clients/${id}`);
        setClient(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca',
        });
      } finally {
        setLoading(false);
      }
    }
    loadClient();
  }, [addToast, id]);

  if (loading) {
    return (
      <S.Container>
        <S.Modal>
          <Loader type="TailSpin" color="#00BFFF" height={200} width={200} />
        </S.Modal>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <div>
            <h1>Dados Cliente</h1>
          </div>
          <div>
            <Button
              color="#4ab9d8"
              type="button"
              onClick={() => history.push('/clients')}
            >
              Listar Clientes
            </Button>
          </div>
        </S.Header>
        <S.Formulario>
          <div>
            <S.RowBox>
              <S.InfoBox>
                <S.Label>Nome</S.Label>
                <p>{client?.name}</p>
              </S.InfoBox>
              <S.InfoBox>
                <S.Label>Data Nascimento</S.Label>
                <p>{client?.dataNasc}</p>
              </S.InfoBox>
            </S.RowBox>
            <S.RowBox>
              <S.InfoBox>
                <S.Label>CPF</S.Label>
                <p>{client?.cpf}</p>
              </S.InfoBox>
              <S.InfoBox>
                <S.Label>RG</S.Label>
                <p>{client?.rg}</p>
              </S.InfoBox>
            </S.RowBox>
            <S.RowBox>
              <S.InfoBox>
                <S.Label>Telefone</S.Label>
                <p>{client?.telefone}</p>
              </S.InfoBox>
              <S.InfoBox>
                <S.Label>Email</S.Label>
                <p>{client?.email}</p>
              </S.InfoBox>
            </S.RowBox>
          </div>
          <div>
            <Tabs>
              <TabList>
                <Tab>Endereços</Tab>
                <Tab>Empréstimos</Tab>
                <Tab>Documentos</Tab>
              </TabList>

              <TabPanel>
                {client?.addresses.map(endereco => (
                  <Button key={endereco.id}>{endereco.id}</Button>
                ))}
              </TabPanel>
              <TabPanel>
                {client?.emprestimos.map(loan => (
                  <p key={loan.id}>{loan.id}</p>
                ))}
              </TabPanel>
              <TabPanel>
                <h2>Any content 3</h2>
              </TabPanel>
            </Tabs>
          </div>
        </S.Formulario>
      </S.Content>
    </S.Container>
  );
};

export default ShowClient;
