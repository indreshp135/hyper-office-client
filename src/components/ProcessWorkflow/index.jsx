import React from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';

import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import {
  Button, Center, Container, Grid, Title
} from '@mantine/core';
import { IconCheck, IconTrash } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

export function ProcessWorkflow() {
  const { t } = useTranslation();
  return (
    <Container my={20}>
      <Center><Title>{t('showPdf')}</Title></Center>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
        <div style={{ height: window.innerHeight - 260 }}>
          <Viewer fileUrl="https://delta.nitt.edu/~anirudhvs/HyperOffice.pdf" />
        </div>
      </Worker>
      <Grid grow mt={10}>
        <Grid.Col span={6}>
          <Button style={{ width: '100%' }} leftIcon={<IconCheck />}>
            Approve
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button color="red" style={{ width: '100%' }} leftIcon={<IconTrash />}>
            Reject
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
