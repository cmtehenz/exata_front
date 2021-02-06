/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale } from 'react-datepicker';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  FiMail,
  FiUser,
  FiCreditCard,
  FiFile,
  FiPhone,
  FiCalendar,
} from 'react-icons/fi';

import api from '../../../services/api';

import DatePicker from '../../../components/DatePicker';
import Input from '../../../components/Input';
import InputMask from '../../../components/InputMask';
import Button from '../../../components/Button';

import { useToast } from '../../../hooks/toast';

import * as S from './styles';
import getValidationErrors from '../../../utils/getValidationErrors';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ptBR', ptBR);

interface ClientDataForm {
  name: string;
  email: string;
  cpf: string;
  rg: string;
  telefone: string;
  whatsapp: string;
  dataNasc: Date;
}

const CreateClient: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ClientDataForm) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().email('Digite um e-mail válido'),
          name: Yup.string().required('Nome é obrigatório'),
          cpf: Yup.string().required('CPF é obrigatório'),
          rg: Yup.string(),
          telefone: Yup.string(),
          whatsapp: Yup.string(),
          dataNasc: Yup.date(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/clients', data);

        addToast({
          type: 'success',
          title: 'Cadastro cliente',
          description: 'Foi efetuado o cadastro do novo cliente com sucesso. ',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: `Ocorreu um erro ao tentar salvar o cliente, tente novamente.${err.message}`,
        });
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

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
            <h1>Novo Cliente</h1>
          </div>
          <div>
            <Button type="button" onClick={() => history.push('/clients')}>
              Listar Clientes
            </Button>
          </div>
        </S.Header>

        <S.Formulario>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <S.RowBox>
                <S.InfoBox>
                  <Input name="name" icon={FiUser} placeholder="Nome" />
                </S.InfoBox>
                <S.InfoBox>
                  <DatePicker
                    name="DataNasc"
                    icon={FiCalendar}
                    placeholderText="Data Nascimento"
                  />
                </S.InfoBox>
              </S.RowBox>
              <S.RowBox>
                <S.InfoBox>
                  <InputMask
                    mask="999.999.999-99"
                    name="cpf"
                    icon={FiCreditCard}
                    placeholder="CPF"
                  />
                </S.InfoBox>
                <S.InfoBox>
                  <Input name="rg" icon={FiFile} placeholder="RG" />
                </S.InfoBox>
              </S.RowBox>
              <S.RowBox>
                <S.InfoBox>
                  <Input
                    name="telefone"
                    icon={FiPhone}
                    placeholder="Telefone"
                  />
                </S.InfoBox>
                <S.InfoBox>
                  <InputMask
                    mask="(99) 9 9999-9999"
                    name="whatsapp"
                    icon={FiPhone}
                    placeholder="WhatsApp"
                  />
                </S.InfoBox>
              </S.RowBox>
              <S.RowBox>
                <S.InfoBox>
                  <Input name="email" icon={FiMail} placeholder="Email" />
                </S.InfoBox>
                <S.InfoBox />
              </S.RowBox>
              <S.RowBox>
                <S.InfoBox>
                  <Button>Limpar</Button>
                </S.InfoBox>
                <S.InfoBox>
                  <Button type="submit">Cadastrar</Button>
                </S.InfoBox>
              </S.RowBox>
            </div>
          </Form>
        </S.Formulario>
      </S.Content>
    </S.Container>
  );
};

export default CreateClient;
