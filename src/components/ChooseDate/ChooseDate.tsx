'use client';
import { Stack, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

interface ChooseDateProps {
  setReserveData: (data: {
    date: string;
    fromTime: string;
    toTime: string;
    currentDate: string;
  }) => void;
}
const ChooseDate = ({ setReserveData }: ChooseDateProps) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [fromTime, setFromTime] = useState<Dayjs | null>(
    dayjs().hour(13).minute(0).second(0), // 01:00 PM
  );
  const [toTime, setToTime] = useState<Dayjs | null>(
    dayjs().hour(15).minute(0).second(0), // 03:00 PM
  );

  useEffect(() => {
    const currentDate = dayjs().format('DD-MM-YYYY');
    const formattedDate = date ? date.format('DD-MM-YYYY') : '';
    const formattedFromTime = fromTime ? fromTime.format('hh:mm A') : '';
    const formattedToTime = toTime ? toTime.format('hh:mm A') : '';

    // Update reserveData with the formatted values
    setReserveData({
      date: '17-11-2024', //formattedDate,
      fromTime: formattedFromTime,
      toTime: formattedToTime,
      currentDate: currentDate,
    });
  }, [date, fromTime, toTime, setReserveData]);

  return (
    <Stack
      alignItems={'center'}
      spacing={2}
      direction={'row'}
      flexWrap={'wrap'}
      gap={2}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="تاريخ الحجز"
            autoFocus
            value={date}
            onChange={(newValue: Dayjs | null) => setDate(newValue)}
            minDate={dayjs()}
          />
        </DemoContainer>

        <Stack gap={1}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker
              label="بداية الحجز"
              value={fromTime}
              onChange={(newTime: Dayjs | null) => setFromTime(newTime)}
            />
          </DemoContainer>

          <DemoContainer components={['TimePicker']}>
            <TimePicker
              label="نهاية الحجز"
              value={toTime}
              onChange={(newTime: Dayjs | null) => setToTime(newTime)}
            />
          </DemoContainer>
        </Stack>
      </LocalizationProvider>
    </Stack>
  );
};

export default ChooseDate;
