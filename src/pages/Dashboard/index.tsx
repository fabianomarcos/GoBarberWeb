import React from 'react';

import { FiClock, FiPower } from 'react-icons/fi';

import {
  Container,
  HeaderContent,
  Profile,
  Header,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const imgDefault =
    'https://avatars2.githubusercontent.com/u/42679820?s=460&u=452f7ed7a54b5017b9335b402644bb0cf9f41d0d&v=4';

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url || imgDefault} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Hoje</span>
            <span>Hoje</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src={imgDefault} alt="Fabiano Marcos" />

              <strong>Fabiano Marcos</strong>
              <span>
                <FiClock />
                <span>08:00</span>
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
