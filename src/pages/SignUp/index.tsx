import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SigUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      formRef.current?.setErrors({});
      const message = 'Campo obrigatório';
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required(message),
          email: Yup.string().required(message).email('Digite um email válido'),
          password: Yup.string().min(6, 'Senha deve ter  no mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso!',
          description: 'Você já pode fazer o seu logon no GoBarber',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao tentar realizar o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para o logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SigUp;
