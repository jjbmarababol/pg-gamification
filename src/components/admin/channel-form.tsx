import { Button, InputNumber, notification } from 'antd';
import React, { FunctionComponent, useState } from 'react';

import { Channel, channelAPI, contributionAPI, playerAPI } from '../../hooks';

interface ChannelFormProps {
  channel: Channel;
}

function getBaseNumber(e: string | number): string {
  const [base] = e.toString().split('.');

  return base;
}

export const ChannelForm: FunctionComponent<ChannelFormProps> = (props) => {
  const { channel } = props;
  const { updateChannel, resetChannel } = channelAPI;
  const { clearChannelContributions } = contributionAPI;
  const { clearChannelPlayers } = playerAPI;
  const [population, setPopulation] = useState<number>(channel.population || 1);

  const resetChannelValues = async (docId: string, channelName: string) => {
    await Promise.all([
      resetChannel(docId),
      clearChannelContributions(docId),
      clearChannelPlayers(docId),
    ]).then(() => {
      notification.open({
        message: 'Reset Successfully',
        description: `The channel ${channelName} has been reset successfully.`,
      });
    });
  };

  return (
    <>
      <div style={{ display: 'flex', marginBottom: '15px' }}>
        <div style={{ flexGrow: 3 }}>
          <p>Players:</p>
        </div>
        <div style={{ flexGrow: 1 }}>
          <InputNumber
            style={{ width: '100%' }}
            type="number"
            min={1}
            max={200}
            formatter={(value) => getBaseNumber(value || population)}
            onChange={(value) => setPopulation(value || population)}
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Button
            shape="circle"
            onClick={async () =>
              await updateChannel({
                docId: channel.docId,
                population,
              })
            }
            style={{ marginLeft: '10px', lineHeight: '8px' }}
            type="primary"
            icon="save"
          />
        </div>
      </div>
      <Button
        type="danger"
        icon="trash"
        size="large"
        block
        onClick={async () =>
          await resetChannelValues(channel.docId, channel.name)
        }
      >
        Reset Channel
      </Button>
    </>
  );
};
