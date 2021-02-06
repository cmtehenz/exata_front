import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Loader from 'react-loader-spinner';
import { format } from 'date-fns';
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
  whatsapp: string;
  dataNasc: Date;
  emprestimos: [
    {
      id: string;
      valor: string;
      dataRealizado: Date;
      dataFinalizado: Date;
      status: string;
    },
  ];
  addresses: [
    {
      id: string;
      endereco: string;
      numero: string;
      complemento: string;
      bairro: string;
      cidade: string;
      estado: string;
      cep: string;
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
        const createdAtDate = new Date(response.data.dataNasc);
        const dateFormated = createdAtDate.toLocaleDateString('pt-BR');
        response.data.dataNasc = dateFormated;
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
                <S.Label>Whatsapp</S.Label>
                <p>{client?.whatsapp}</p>
              </S.InfoBox>
            </S.RowBox>
            <S.RowBox>
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
                <S.Container>
                  <S.BoxWrapp>
                    <Button
                      color="#4ab9d8"
                      onClick={() =>
                        // eslint-disable-next-line prettier/prettier
                      history.push(`/clients/adressnew/${client?.id}`)}
                    >
                      Novo endereço
                    </Button>
                    <S.BoxTabs>
                      {client?.addresses.map(endereco => (
                        <S.BoxData key={endereco.id}>
                          <S.BoxLabel>
                            Endereço:
                            <p>
                              {endereco.endereco}
                              ,&nbsp;
                              {endereco.numero}
                              &nbsp;
                              {endereco.complemento}
                            </p>
                            <p>
                              Bairro: &nbsp;
                              {endereco.bairro}
                              ,&nbsp; Cidade: &nbsp;
                              {endereco.cidade}
                              ,&nbsp;
                              {endereco.estado}
                              &nbsp; CEP: &nbsp;
                              {endereco.cep}
                            </p>
                          </S.BoxLabel>
                        </S.BoxData>
                      ))}
                    </S.BoxTabs>
                  </S.BoxWrapp>
                </S.Container>
              </TabPanel>
              <TabPanel>
                <S.Container>
                  <S.BoxWrapp>
                    <Button
                      color="#4ab9d8"
                      onClick={() =>
                        // eslint-disable-next-line prettier/prettier
                      history.push(`/clients/adressnew/${client?.id}`)}
                    >
                      Novo empréstimo
                    </Button>
                    <S.BoxTabs>
                      {client?.emprestimos.map(loan => (
                        <S.BoxData key={loan.id}>
                          <S.BoxLabel>
                            Empréstimo:
                            <p>
                              Valor:&nbsp;
                              {loan.valor}
                              &nbsp; Data Realizado: &nbsp;
                              {format(
                                new Date(loan.dataRealizado),
                                'dd/MM/yyyy',
                              )}
                              &nbsp; Data Finalizado: &nbsp;
                              {format(
                                new Date(loan.dataFinalizado),
                                'dd/MM/yyyy',
                              )}
                              &nbsp; Status: &nbsp;
                              {loan.status}
                            </p>
                          </S.BoxLabel>
                        </S.BoxData>
                      ))}
                    </S.BoxTabs>
                  </S.BoxWrapp>
                </S.Container>
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
