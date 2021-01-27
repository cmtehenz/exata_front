import styled from 'styled-components';

export const Header = styled.div`
  background: ${({ theme }) => theme.colors.shape};
  height: 60px;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse;
  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  img {
    margin-top: 10px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 30px;
    line-height: 18px;
    span {
      color: #171c26;
      font-size: 14px;
    }
    a {
      text-decoration: none;
      color: #2e5f67;
      font-size: 14px;
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
