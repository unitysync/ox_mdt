import React from 'react';
import { useOfficers, useSetOfficersInvolved } from '../../../../../state';
import { createStyles, Group, Stack, Text } from '@mantine/core';
import { IconUserX } from '@tabler/icons-react';
import { modals } from '@mantine/modals';

const useStyles = createStyles((theme) => ({
  officerContainer: {
    backgroundColor: theme.colors.durple[4],
    boxShadow: theme.shadows.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
      cursor: 'pointer',
    },
  },
}));

const OfficerResults: React.FC = () => {
  const officers = useOfficers();
  const setOfficersInvolved = useSetOfficersInvolved();
  const { classes } = useStyles();

  return (
    <Stack spacing="sm">
      {officers.length > 0 ? (
        officers.map((officer) => (
          <Group
            key={officer.callSign}
            className={classes.officerContainer}
            position="apart"
            onClick={() => {
              modals.closeAll();
              setOfficersInvolved((prev) => [...prev, { name: officer.name, callSign: officer.callSign }]);
            }}
          >
            <Text>{officer.name}</Text>
            <Text c="dark.2">{officer.callSign}</Text>
          </Group>
        ))
      ) : (
        <Stack justify="center" align="center" spacing={0} c="dark.2">
          <IconUserX size={36} />
          <Text size="xl">No officers found</Text>
        </Stack>
      )}
    </Stack>
  );
};

export default OfficerResults;
