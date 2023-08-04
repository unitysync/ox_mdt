import React from 'react';
import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useReportId, useReportTitle, useSetIsReportActive } from '../../../../../state';
import { modals } from '@mantine/modals';
import EditTitleModal from './modals/EditTitleModal';
import { fetchNui } from '../../../../../utils/fetchNui';
import { queryClient } from '../../../../../main';
import locales from '../../../../../locales';

const ReportTitle: React.FC = () => {
  const title = useReportTitle();
  const id = useReportId();
  const setIsReportActive = useSetIsReportActive();

  return (
    <Group position="apart" noWrap>
      <Text size="xl" truncate>
        {title}
      </Text>
      <Group spacing="xs" noWrap>
        <Tooltip label={locales.delete_report}>
          <ActionIcon
            color="red"
            variant="light"
            onClick={() =>
              modals.openConfirmModal({
                title: locales.delete_report,
                children: <Text size="sm">{locales.delete_report_confirm}</Text>,
                labels: { confirm: locales.confirm, cancel: locales.cancel },
                onConfirm: async () => {
                  await fetchNui('deleteReport', id, { data: 1 });
                  await queryClient.invalidateQueries(['reports']);
                  setIsReportActive(false);
                },
                confirmProps: {
                  color: 'red',
                },
              })
            }
          >
            <IconTrash size={20} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label={locales.edit_title}>
          <ActionIcon
            color="blue"
            variant="light"
            onClick={() =>
              modals.open({ title: locales.edit_report_title, size: 'sm', children: <EditTitleModal title={title} /> })
            }
          >
            <IconEdit size={20} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Group>
  );
};

export default ReportTitle;