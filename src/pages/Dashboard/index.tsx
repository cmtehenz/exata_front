/* eslint-disable camelcase */
import React from 'react';
import { FiBell, FiDollarSign, FiUploadCloud, FiUsers } from 'react-icons/fi';

import * as Style from './styles';

const Dashboard: React.FC = () => {
  return (
    <Style.Container>
      <Style.TopInfo>
        <Style.BoxInfo>
          <FiUsers size={86} />
          <Style.BoxNum>
            <strong>Total</strong>
            <p>545</p>
            <small>clientes</small>
          </Style.BoxNum>
        </Style.BoxInfo>
        <Style.BoxInfo>
          <FiBell size={86} />
          <Style.BoxNum>
            <strong>Total</strong>
            <p>545</p>
            <small>clientes</small>
          </Style.BoxNum>
        </Style.BoxInfo>
        <Style.BoxInfo>
          <FiDollarSign size={86} />
          <Style.BoxNum>
            <strong>Total</strong>
            <p>545</p>
            <small>clientes</small>
          </Style.BoxNum>
        </Style.BoxInfo>
        <Style.BoxInfo>
          <FiUploadCloud size={86} />
          <Style.BoxNum>
            <strong>Total</strong>
            <p>545</p>
            <small>clientes</small>
          </Style.BoxNum>
        </Style.BoxInfo>
      </Style.TopInfo>
    </Style.Container>
  );
};

export default Dashboard;
