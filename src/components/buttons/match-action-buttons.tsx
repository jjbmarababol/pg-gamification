import React, { FunctionComponent,useState, useContext, useEffect } from 'react';
import { Button, Icon, Row, Col } from 'antd';
import { MatchContext, PlayerContext } from '../../contexts';

interface IMatchActionButtons {}

export const MatchActionButtons:FunctionComponent<IMatchActionButtons> = (props) => {

  const [ hasSelected, setHasSelected ] = useState<boolean>(false);
  const [ selectedOption, setSelectedOption ] = useState<number>(0);
  const { contributions, setContributions } = useContext(MatchContext);
  const { playerName, setCoins } = useContext(PlayerContext);
  
  const setSelectedContribution = (contribution: number) => {
    setHasSelected(true);
    setSelectedOption(contribution);
  };

  useEffect(() => {
    const requestContributions = contributions.filter(contribution => Object.keys(contribution)[0] !== playerName);
    setContributions([ ...requestContributions, {[playerName]: selectedOption}]);
    setCoins(-selectedOption);
    // eslint-disable-next-line
  }, [selectedOption, playerName]);
  
  return (
    <Row gutter={[20, 0]} justify='center' align='middle' style={{marginTop: '15px'}}>
      
      <Col xs={24} sm={12}>
        <Button className='button--match-action' type='primary' size="large" block onClick={()=>setSelectedContribution(10)} disabled={hasSelected && selectedOption === 0}>
          <Icon type="check"/> Yes. (&nbsp; -10<Icon type='dollar'/>)
        </Button>
      </Col>
      <Col xs={24} sm={12}>
        <Button className='button--match-action' type='danger' size="large" block onClick={()=>setSelectedContribution(0)} disabled={hasSelected && selectedOption === 10}>
          <Icon type="close"/> No, I won't.
        </Button>
      </Col>  
    </Row>
  );
};