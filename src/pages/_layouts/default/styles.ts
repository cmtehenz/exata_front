import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.colors.background};
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;
`;
