/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useRef, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale } from 'react-datepicker';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiCalendar, FiHome } from 'react-icons/fi';

import api from '../../../services/api';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { useToast } from '../../../hooks/toast';

import * as S from './styles';
import getValidationErrors from '../../../utils/getValidationErrors';

import 'react-datepicker/dist/react-datepicker.css';
import InputCurrency from '../../../components/Form/InputCurrency';
import DatePicker from '../../../components/DatePicker';

interface EmprestimoDataForm {
  clientId: string;
  valor: string;
  dataRealizado: string;
  dataFinalizado: string;
  status: string;
}

interface ParamTypes {
  id: string;
}

const CreateEmprestimo: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToast();
  const { id } = useParams<ParamTypes>();

  const handleSubmit = useCallback(
    async (data: EmprestimoDataForm) => {
      try {
        data.clientId = id;
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          valor: Yup.number(),
          dataFinalizado: Yup.string(),
          dataRealizado: Yup.string(),
          status: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/emprestimos', data);

        addToast({
          type: 'success',
          title: 'Cadastro empréstimo',
          description:
            'Foi efetuado o cadastro do novo emprestimo com sucesso. ',
        });
        history.goBack();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: `Ocorreu um erro ao tentar salvar o emprestimo, tente novamente.${err.message}`,
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
            <h1>Novo Empréstimo</h1>
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
                  <InputCurrency
                    name="valor"
                    label="Valor"
                    // icon={FiHome}
                    placeholder="Valor"
                  />
                </S.InfoBox>
                <S.InfoBox>
                  <Input
                    name="status"
                    icon={FiHome}
                    placeholder="Status"
                    defaultValue="Aberto"
                  />
                </S.InfoBox>
              </S.RowBox>
              <S.RowBox>
                <S.InfoBox>
                  <DatePicker
                    name="dataRealizado"
                    icon={FiHome}
                    placeholderText="Data Realizado"
                  />
                </S.InfoBox>
                <S.InfoBox>
                  <DatePicker
                    name="dataFinalizado"
                    icon={FiCalendar}
                    placeholderText="Data Finalizado"
                  />
                </S.InfoBox>
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

export default CreateEmprestimo;
