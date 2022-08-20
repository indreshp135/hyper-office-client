import React from 'react';
import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles
} from '@mantine/core';
import {
  IconGauge, IconCookie, IconUser, IconMessage2, IconLock
} from '@tabler/icons';
import PropTypes from 'prop-types';

export const FEATURES = [
  {
    icon: IconGauge,
    title: 'Extreme performance',
    description:
        'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit'
  },
  {
    icon: IconUser,
    title: 'Privacy focused',
    description:
        'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma'
  },
  {
    icon: IconCookie,
    title: 'No third parties',
    description:
        'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves'
  },
  {
    icon: IconLock,
    title: 'Secure by default',
    description:
        'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right'
  },
  {
    icon: IconMessage2,
    title: '24/7 Support',
    description:
        'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail'
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
      <Title className={classes.title}>

        Integrate effortlessly with any technology stack
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Every once in a while, you’ll see a Golbat that’s missing some fangs.
          This happens when hunger drives it to try biting a Steel-type Pokémon.
        </Text>
      </Container>

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
