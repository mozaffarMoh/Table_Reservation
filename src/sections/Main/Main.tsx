'use client';
import { ChooseDate, Tables } from '@/components';
import { Container, Stack } from '@mui/material';
import { useState } from 'react';

const Main = () => {
  const [reserveData, setReserveData] = useState<any>(null);


  return (
    <Container>
      <Stack
        py={2}
        gap={2}
      >
        <ChooseDate setReserveData={setReserveData} />
        <Tables reserveData={reserveData} />
      </Stack>
    </Container>
  );
};

export default Main;
