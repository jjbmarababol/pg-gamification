import { Button, Col, Icon, Row } from 'antd';
import _ from 'lodash';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';

import { MatchContext, PlayerContext } from '../../contexts';

export const MatchActionButtons: FunctionComponent = () => {
  const [hasSelected, setHasSelected] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const { contributions, setContributions } = useContext(MatchContext);
  const { playerName, updateCoins } = useContext(PlayerContext);
  const setSelectedContribution = (contribution: number) => {
    setHasSelected(true);
    setSelectedOption(contribution);
  };

  useEffect(() => {
    const requestContributions = contributions.filter(
      (contribution) => Object.keys(contribution)[0] !== playerName,
    );
    setContributions([
      ...requestContributions,
      { [playerName]: selectedOption },
    ]);
    updateCoins(-selectedOption);
    // eslint-disable-next-line
  }, [selectedOption, playerName]);

  return (
    <Row
      gutter={[20, 0]}
      justify="center"
      align="middle"
      style={{ marginTop: '15px' }}
    >
      <Col xs={24} sm={12}>
        {/* TODO: ADD FIREBASE ACTION TO SEND CONTRIBUTION, after timer is adds up all contributions then divide to 6 then add to coins */}
        <Button
          className="button--match-action"
          type="primary"
          size="large"
          block
          onClick={() => setSelectedContribution(10)}
          disabled={hasSelected && selectedOption === 0}
        >
          <Icon type="check" /> Yes. (&nbsp; -10
          <Icon type="dollar" />)
        </Button>
      </Col>
      <Col xs={24} sm={12}>
        <Button
          className="button--match-action"
          type="danger"
          size="large"
          block
          onClick={() => setSelectedContribution(0)}
          disabled={hasSelected && selectedOption === 10}
        >
          <Icon type="close" /> No, I {_.escape("won't")}.
        </Button>
      </Col>
    </Row>
  );
};
