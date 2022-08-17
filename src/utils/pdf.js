import { showNotification } from '@mantine/notifications';
import { savePDF } from '@progress/kendo-react-pdf';
import { SEND_PDF_URL } from './urls';

export const createPDF = (html, fileName, user) => {
  savePDF(html, {
    paperSize: 'Letter',
    fileName,
    margin: 3,
    creator: user,
    author: user,
    forceProxy: true,
    proxyURL: SEND_PDF_URL
  }, () => {
    showNotification({
      title: 'PDF sent'
    });
  });
};
