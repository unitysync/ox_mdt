import React from 'react';
import { Button, Stack } from '@mantine/core';
import { useSetAnnouncements } from '../../../state';
import { modals } from '@mantine/modals';
import { useCharacter } from '../../../state';
import Editor from '../../../components/Editor';
import { Announcement } from '../../../typings';

const AnnouncementModal: React.FC<{ announcement?: Announcement }> = ({ announcement }) => {
  // Character used only for testing
  const character = useCharacter();
  const setAnnouncements = useSetAnnouncements();
  const [value, setValue] = React.useState('');

  const createAnnouncement = () => {
    modals.closeAll();
    setAnnouncements((prev) => [
      {
        id: prev.length > 0 ? prev[0].id + 1 : 0,
        creator: {
          stateId: character.stateId,
          callSign: character.callSign,
          image: character.image,
          lastName: character.lastName,
          firstName: character.firstName,
        },
        createdAt: Date.now(),
        contents: value,
      },
      ...prev,
    ]);
  };

  const editAnnouncement = () => {
    modals.closeAll();
    if (!announcement) return;
    setAnnouncements((prev) => {
      return prev.map((item) => {
        if (item.id !== announcement.id) return item;
        return { ...item, contents: value };
      });
    });
  };

  return (
    <Stack h={400}>
      <Editor
        placeholder="Announcement contents..."
        content={announcement?.contents}
        onChange={(value) => setValue(value || '')}
      />
      <Button variant="light" fullWidth onClick={() => (announcement ? editAnnouncement() : createAnnouncement())}>
        Confirm
      </Button>
    </Stack>
  );
};

export default AnnouncementModal;
