import styled from 'styled-components';

export const Container = styled.div`
  width: 98%;
  margin: 10px;
  display: flex;
  margin-top: 8px;
`;

export const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 15%;
  padding-left: 40%;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.7); /* Black w/ opacity */
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

export const BoxWrapp = styled.div`
  width: 100%;
  button {
    width: 250px;
  }
`;

export const BoxTabs = styled.div`
  margin-top: 10px;
`;

export const BoxData = styled.div`
  border: 1px solid #171c26;
  border-radius: 6px;
  padding: 4px;
  margin-bottom: 2px;
`;

export const BoxLabel = styled.div`
  color: ${({ theme }) => theme.colors.label};
  font-size: 14px;
  margin-bottom: 8px;
  p {
    color: #171c26;
    font-size: 12px;
  }
`;
