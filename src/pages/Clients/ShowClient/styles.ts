import styled from 'styled-components';

export const Container = styled.div`
  width: 98%;
  margin: 10px;
  display: flex;
  margin-top: 8px;
`;

export const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 30%;
    h1 {
      margin-top: 12px;
    }
  }
`;

export const Formulario = styled.div`
  border: 1px solid #aaaaaa;
  border-radius: 8px;
  height: 600px;
`;

export const RowBox = styled.div`
  padding-left: 5px;
  display: flex;
  justify-content: space-between;
`;

export const InfoBox = styled.div`
  margin: 5px 5px 5px 5px;
  padding-left: 5px;
  width: 48%;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.shape};
  height: 60px;

  p {
    margin-left: 10px;
  }
`;

export const Label = styled.div`
  color: ${({ theme }) => theme.colors.label};
  font-size: 22px;
`;
