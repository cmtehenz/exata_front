import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 5px 20px;
  background: #fff;
  margin-top: 10px;
`;

export const TopInfo = styled.div`
  display: flex;
  height: 180px;
  width: 100%;
`;

export const BoxInfo = styled.div`
  border: 1px solid #ced0ce;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  margin-right: 10px;
  width: 25%;
  svg {
    margin: 45px 0px 0px 25px;
    color: #2e5f67;
  }
`;

export const BoxNum = styled.div`
  width: 40%;
  margin-top: 30px;
  margin-left: 15px;
`;
