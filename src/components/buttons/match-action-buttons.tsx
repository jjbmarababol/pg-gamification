/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Icon, Row } from 'antd';
import React, { FunctionComponent, useContext, useState } from 'react';

import { MatchContext, PlayerContext } from '../../contexts';
import { contributionAPI } from '../../hooks';

export const MatchActionButtons: FunctionComponent = () => {
  const { addContribution } = contributionAPI;
  const [hasSelected, setHasSelected] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const { round } = useContext(MatchContext);
  const { updateCoins, channelId, playerId } = useContext(PlayerContext);

  const selectContribution = async (contrib: number) => {
    await Promise.all([
      setSelectedOption(contrib),
      setHasSelected(true),
      updateCoins(-contrib),
    ]);

    await addContribution({
      round,
      channelId,
      playerId,
      amount: contrib,
    });
  };

  return (
    <Row
      gutter={[20, 0]}
      justify="center"
      align="middle"
      style={{ marginTop: '15px' }}
    >
      <Col xs={24} sm={12}>
        <Button
          className="button--match-action"
          type="primary"
          size="large"
          block
          onClick={() => selectContribution(10)}
          disabled={hasSelected && selectedOption === 0}
        >
          <Icon type="check" /> Yes.&nbsp;-10
          <Icon type="copyright" className="icon--gold-coin" />
        </Button>
      </Col>
      <Col xs={24} sm={12}>
        <Button
          className="button--match-action"
          type="danger"
          size="large"
          block
          onClick={() => selectContribution(0)}
          disabled={hasSelected && selectedOption === 10}
        >
          <Icon type="close" /> No, I won&apos;t.
        </Button>
      </Col>
    </Row>
  );
};
