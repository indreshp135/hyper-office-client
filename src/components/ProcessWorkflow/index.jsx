import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import {
  Button, Container, Grid, createStyles, Timeline, Title, Center, Text, Anchor
} from '@mantine/core';
import {
  IconCheck,
  IconTrash,
  IconPlus,
  IconX
} from '@tabler/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { showNotification } from '@mantine/notifications';
import { useLoading } from '../../hooks/useLoading';
import { approveDocRequest, fileGetRequest, getDocsRequestStatus } from '../../utils/requests';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5
  }
}));

export function ProcessWorkflow({ viewOnly }) {
  const getFilePluginInstance = getFilePlugin();
  const { classes } = useStyles();
  const { docid } = useParams();
  const { request } = useLoading();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const sendProcess = async (status) => {
    try {
      const response = await approveDocRequest(docid, status);
      if (response.status === 200) {
        showNotification({
          color: 'green',
          title: 'Success',
          message: `Document has been ${status}${status === 'approve' ? 'd' : 'ed'}`
        });
        navigate('/documentsForApproval');
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

  const getDocStatus = async () => {
    try {
      const response = await request(() => getDocsRequestStatus(docid));

      if (response.data) {
        setData(response.data);
      } else {
        showNotification({
          color: 'red',
          title: 'Error while fetching data'
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

  useEffect(() => {
    getDocStatus();
  }, []);

  return (
    <div className={classes.root}>
      <Grid gutter="md">
        <Grid.Col lg={8} orderlg={2}>
          <Container my={50}>
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
                  plugins={[defaultLayoutPluginInstance, getFilePluginInstance]}
                />
              </div>
            </Worker>

          </Container>
        </Grid.Col>
        <Grid.Col lg={4} orderlg={1}>

          <Container my={50}>
            <Center>
              <Title m={12} order={4}>Approval Status</Title>
            </Center>
            <Center>
              {data && (
                <Timeline active={data.transactions.length - 1}>
                  {data.transactions.map((item, idx) => (
                    <Timeline.Item
                      bullet={idx === 0 ? <IconPlus size={12} /> : data.completedStates[idx] === 'Rejected' ? <IconX size={12} /> : <IconCheck size={12} />}
                      key={item.txId}
                      title={item.message}
                    >
                      <Text color="dimmed" size="xs">
                        {new Date(item.timestamp).toUTCString()}
                      </Text>
                      <Anchor href={`https://explorer.hyper-office.tech/?tab=transactions&transId=${item.txId}`} target="_blank" rel="noreferrer">
                        <Text color="dimmed" size="xs" style={{ wordBreak: 'break-all' }}>
                          {item.txId}
                        </Text>
                      </Anchor>
                    </Timeline.Item>
                  ))}
                  {data.pendingStates.map((item) => (
                    <Timeline.Item
                      key={item.status}
                      title={`${item.designation} approval`}
                    >
                      <Text color="dimmed" size="xs">PENDING</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              )}
            </Center>
          </Container>
        </Grid.Col>
      </Grid>
    </div>
  );
}

ProcessWorkflow.defaultProps = {
  viewOnly: false
};

ProcessWorkflow.propTypes = {
  viewOnly: PropTypes.bool
};
