/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useRef, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
  FiHome,
} from 'react-icons/fi';

import api from '../../../services/api';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { useToast } from '../../../hooks/toast';

import * as S from './styles';
import getValidationErrors from '../../../utils/getValidationErrors';

import 'react-datepicker/dist/react-datepicker.css';
import InputMask from '../../../components/InputMask';

registerLocale('ptBR', ptBR);

interface EnderecoDataForm {
  clientId: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface ParamTypes {
  id: string;
}

const CreateEndereco: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToast();
  const { id } = useParams<ParamTypes>();

  const handleSubmit = useCallback(
    async (data: EnderecoDataForm) => {
      try {
        // eslint-disable-next-line no-param-reassign
        data.clientId = id;
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          endereco: Yup.string(),
          numero: Yup.string(),
          complemento: Yup.string(),
          bairro: Yup.string(),
          cidade: Yup.string(),
          estado: Yup.string(),
          cep: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/clients/address', data);

        addToast({
          type: 'success',
          title: 'Cadastro endereço',
          description: 'Foi efetuado o cadastro do novo endereço com sucesso. ',
        });
        history.goBack();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: `Ocorreu um erro ao tentar salvar o endereço, tente novamente.${err.message}`,
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
    [addToast, history, id],
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
            <h1>Novo Endereço</h1>
          </div>
          <div>
            <Button
              color="#4ab9d8"
              type="button"
              onClick={() => history.goBack()}
            >
              Voltar
            </Button>
          </div>
        </S.Header>

        <S.Formulario>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <S.RowBox>
                <S.InfoBox>
                  <Input name="endereco" icon={FiHome} placeholder="Endereço" />
                </S.InfoBox>
                <S.InfoBox>
                  <Input name="numero" icon={FiHome} placeholder="Numero" />
                </S.InfoBox>
              </S.RowBox>
              <S.RowBox>
                <S.InfoBox>
                  <Input
                    name="complemento"
                    icon={FiHome}
                    placeholder="Complemento"
                  />
                </S.InfoBox>
                <S.InfoBox>
                  <Input name="bairro" icon={FiHome} placeholder="Bairro" />
                </S.InfoBox>
              </S.RowBox>
              <S.RowBox>
                <S.InfoBox>
                  <Input name="cidade" icon={FiHome} placeholder="Cidade" />
                </S.InfoBox>
                <S.InfoBox>
                  <Input name="estado" icon={FiHome} placeholder="Estado" />
                </S.InfoBox>
              </S.RowBox>
              <S.RowBox>
                <S.InfoBox>
                  <InputMask
                    mask="99.999-999"
                    name="cep"
                    icon={FiMail}
                    placeholder="Cep"
                  />
                </S.InfoBox>
                <S.InfoBox />
              </S.RowBox>
              <S.RowBox>
                <S.InfoBox>
                  <Button color="#f2b543" type="reset">
                    Limpar
                  </Button>
                </S.InfoBox>
                <S.InfoBox>
                  <Button color="#4ab9d8" type="submit">
                    Cadastrar
                  </Button>
                </S.InfoBox>
              </S.RowBox>
            </div>
          </Form>
        </S.Formulario>
      </S.Content>
    </S.Container>
  );
};

export default CreateEndereco;
