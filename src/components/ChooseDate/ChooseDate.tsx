import { Stack } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import dayjs from 'dayjs';

const ChooseDate = () => {
  const [date, setDate] = useState(dayjs());

  return (
    <Stack alignItems={'center'}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="ابحث عبر التاريخ"
            autoFocus
            value={date}
            onChange={(newValue: any) => setDate(newValue)}
            minDate={dayjs()}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Stack>
  );
};

export default ChooseDate;
