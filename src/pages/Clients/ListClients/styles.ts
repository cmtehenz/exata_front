import styled from 'styled-components';
import { shade } from 'polished';

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
  margin-bottom: 16px;
  > div {
    align-items: center;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  span {
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  tr {
    th {
      font-size: 18px;
      font-weight: 500;
    }
    th:nth-child(1) {
      width: 40%;
      text-align: left;
      padding-left: 8px;
    }
    th:nth-child(2) {
      width: 15%;
      text-align: center;
    }
    th:nth-child(3) {
      width: 30%;
      text-align: right;
      padding-right: 8px;
    }
  }
`;

export const ClientRow = styled.tr`
  td {
    height: 36px;
  }
  td:nth-child(1) {
    padding-left: 8px;
    border-radius: 10px 0 0 10px;
  }
  td:nth-child(2) {
    text-align: center;
  }
  td:nth-child(3) {
    text-align: right;
    padding-right: 8px;
    border-radius: 0 10px 10px 0;
  }

  background: ${({ theme }) => theme.colors.shape};
  font-size: 16px;
  transition: background 0.3s;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => shade(0.4, theme.colors.shape)};
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: 60px;
`;
