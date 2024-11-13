'use client';
import { ChooseDate, Tables } from '@/components';
import { Container, Stack } from '@mui/material';

const Main = () => {
  return (
    <Container>
      <Stack py={2}>
        <ChooseDate />
        <Tables />
      </Stack>
    </Container>
  );
};

export default Main;
