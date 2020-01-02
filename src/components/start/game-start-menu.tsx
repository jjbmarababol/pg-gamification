import React, { FunctionComponent } from 'react';
import { Button, Icon, Typography } from 'antd';
import styled from 'styled-components';
import companyLogo from '../ui/images/images.png';
const { Title } = Typography;

interface IGameStartMenu {
  onClickStart: (...args: any | any[])=> void | Promise<void>;
}

const CompanyLogo = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${companyLogo});
  background-size: cover;
  margin: 0 auto;
  mix-blend-mode: multiply;
`;


export const GameStartMenu:FunctionComponent<IGameStartMenu> = (props) => {

  const {onClickStart} = props;

  return (
    <>
      <CompanyLogo />
      <Title level={2} style={{ textAlign: 'center', color: 'rgb(98, 114, 123)' , fontWeight: 100, marginBottom: 50 }}>Public Goods Game</Title>
      <Button type="primary" size="large" block onClick={()=>onClickStart(true)}>
        <Icon type="heart" />
        Game Start
      </Button>
    </>
  );
};