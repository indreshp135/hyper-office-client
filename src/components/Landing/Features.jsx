import React from 'react';
import {
  ThemeIcon,
  Text,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles
} from '@mantine/core';
import {
  IconWorld, IconFriends, IconUser, IconPlant, IconLock, IconCertificate
} from '@tabler/icons';
import PropTypes from 'prop-types';

export const FEATURES = [
  {
    icon: IconWorld,
    title: 'Completely digital',
    description:
        'Digital infrastructure for a robust and smart Document Management System (DMS) that will make ICCR paperless.'
  },
  {
    icon: IconUser,
    title: 'Accountable & Fast',
    description:
        'Reduce intermediaries in the approval process thereby reducing complexity in workflow & improving speed.'
  },
  {
    icon: IconFriends,
    title: 'Compatibility & Inclusivity',
    description:
        'Multi-language and multi-device support to account for the diversity in India.'
  },
  {
    icon: IconLock,
    title: 'Secure by default',
    description:
        'Hyperledger enables clients to record, share and synchronize transactions of files in their respective electronic ledgers.'
  },
  {
    icon: IconCertificate,
    title: 'Digital Signatures',
    description:
      'Digital signature of the document enables the user to verify the signature in the document'
  },
  {
    icon: IconPlant,
    title: 'Reduce Carbon Footprint',
    description:
        'Drastically minimize paper consumption in the long run by transitioning from paper to digital.'
  }
];

export function Feature({ icon: Icon, title, description }) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

Feature.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingBottom: theme.spacing.xl * 4
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left'
    }
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left'
    }
  }
}));

export function FeaturesGrid() {
  const { classes, theme } = useStyles();
  const features = FEATURES.map((feature) => <Feature {...feature} key={feature.title} />);

  return (
    <Container className={classes.wrapper}>
      {/* <Title className={classes.title}>

        Integrate effortlessly with any technology stack
      </Title> */}

      {/* <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Every once in a while, you’ll see a Golbat that’s missing some fangs.
          This happens when hunger drives it to try biting a Steel-type Pokémon.
        </Text>
      </Container> */}

      <SimpleGrid
        mt={60}
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' }
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
