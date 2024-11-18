'use client';
import { ChooseDate, Tables } from '@/components';
import { primaryColor } from '@/constant/color';
import useGet from '@/custom-hooks/useGet';
import { Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Main = () => {
  const [reserveData, setReserveData] = useState<any>(null);
  const [tables, loadingTables, getTables] = useGet(
    `/api/tables?param=${JSON.stringify(reserveData)}`, // `/en/api/bills?param=${currentDateString}`,
  );

  useEffect(() => {
    if (reserveData?.date && tables.length == 0) {
      getTables();
    }
  }, [reserveData]);

  return (
    <Container>
      <Stack
        py={2}
        gap={2}
      >
        <Typography
          variant="h3"
          m={2}
          fontWeight={600}
          color={"ActiveBorder"}
        >
        *  احجز طاولتك الان
        </Typography>
        <ChooseDate
          getTables={getTables}
          setReserveData={setReserveData}
        />
        <Tables
          reserveData={reserveData}
          getTables={getTables}
          loadingTables={loadingTables}
          tables={tables}
        />
      </Stack>
    </Container>
  );
};

export default Main;
