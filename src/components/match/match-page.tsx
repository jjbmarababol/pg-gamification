import React, { FunctionComponent } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { MatchActionButtons } from '../buttons';
import { MatchTimer } from '../match';
import { Navbar } from '../navbar';
import MatchBackground from '../ui/images/bg-home.jpg';
interface IMatchPage{}

const PageLayout = styled.div`
  min-height: 100vh;
  background-image: url(${MatchBackground});
	background-size: cover;
	animation: gradient-bg 60s linear infinite;

  @keyframes gradient-bg {
	0% {
		background-position: 0% 0%;
	}
  50% {
		background-position: 100% 0%;
	}
	100% {
		background-position: 0% 0%;
	}
}`;

export const MatchPage: FunctionComponent<IMatchPage> = (props) => {
  return (
    <PageLayout>
		<Navbar />
    <Row style={{minHeight: '50vh'}} type='flex' justify='center' align='middle'>
      <Col span={20}>
        <MatchTimer/>
        <MatchActionButtons />
      </Col>
    </Row>
    </PageLayout>
  );
}