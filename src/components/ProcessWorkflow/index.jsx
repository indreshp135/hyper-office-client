import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import {
  Button, Container, Grid
} from '@mantine/core';
import { IconCheck, IconTrash } from '@tabler/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { showNotification } from '@mantine/notifications';
import { approveDocRequest, fileGetRequest } from '../../utils/requests';

export function ProcessWorkflow({ viewOnly }) {
  const { docid } = useParams();
  const navigate = useNavigate();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const sendProcess = async (status) => {
    try {
      const response = await approveDocRequest(docid, status);
      if (response.status === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: `Document has been ${status}`
        });
        navigate('..');
      } else {
        showNotification({
          color: 'red',
          title: 'Error',
          message: response.data
        });
      }
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: error.response.data
                && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  return (
    <Container my={50}>
      <div style={{
        display: 'flex',
        justifyContent: 'right',
        margin: 20
      }}
      >
        <Button color="grape">
          Show History
        </Button>
      </div>
      {!viewOnly && (
        <Grid grow my={10}>
          <Grid.Col span={6}>
            <Button style={{ width: '100%' }} leftIcon={<IconCheck />} onClick={() => sendProcess('approve')}>
              Approve
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button color="red" style={{ width: '100%' }} leftIcon={<IconTrash />} onClick={() => sendProcess('reject')}>
              Reject
            </Button>
          </Grid.Col>
        </Grid>
      )}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
        <div>
          <Viewer
            fileUrl={fileGetRequest(docid)}
            withCredentials
            plugins={[defaultLayoutPluginInstance]}
          />
        </div>
      </Worker>

    </Container>
  );
}

ProcessWorkflow.defaultProps = {
  viewOnly: false
};

ProcessWorkflow.propTypes = {
  viewOnly: PropTypes.bool
};
