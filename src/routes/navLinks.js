import {
  IconHome,
  IconForms,
  IconFileReport,
  IconFileUpload,
  IconJumpRope,
  IconAdjustments,
  IconDevicesPc
} from '@tabler/icons';

export const navLinks = [
  { link: '/home', label: 'home', icon: IconHome },
  { link: '/formbuilder', label: 'formBuilder', icon: IconForms },
  { link: '/formviewer', label: 'formViewer', icon: IconFileReport },
  { link: '/fileupload', label: 'fileUpload', icon: IconFileUpload },
  { link: '/workflow', label: 'workflow', icon: IconJumpRope },
  { link: '/setroles', label: 'setRole', icon: IconAdjustments },
  { link: '/showpdf', label: 'showPdf', icon: IconDevicesPc },
  { link: '/showapproved', label: 'showApproved', icon: IconDevicesPc },
  { link: '/showrejected', label: 'showRejected', icon: IconDevicesPc },
  { link: '/showpending', label: 'showPending', icon: IconDevicesPc },
  { link: '/documentsForApproval', label: 'documentsForApproval', icon: IconDevicesPc }
];
