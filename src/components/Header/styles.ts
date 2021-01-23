import styled from 'styled-components';

export const Header = styled.div`
  background: ${({ theme }) => theme.colors.shape};
  height: 60px;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
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
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #171c26;
    }
    a {
      text-decoration: none;
      color: #2e5f67;
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
