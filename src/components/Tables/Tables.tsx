'use client';
import { primaryColor, secondaryColor, thirdColor } from '@/constant/color';
import useGet from '@/custom-hooks/useGet';
import { Card, Skeleton, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';

const ChooseDate = () => {
  const [currentDateString, setCurrentDateString]: any = useState('');
  const [tables, loadingTables, getTables, successTables] = useGet(
    '/api/tables', // `/en/api/bills?param=${currentDateString}`,
  );

  useEffect(() => {
    getTables();
  }, []);
  console.log(tables);

  return (
    <Stack
      alignItems={'center'}
      gap={2}
    >
      {!loadingTables
        ? Array(3)
            .fill('')
            .map((_: any, i: number) => {
              return (
                <Stack
                  gap={2}
                  key={i}
                >
                  <Skeleton
                    width={150}
                  />
                  <Stack
                    direction={'row'}
                    flexWrap={'wrap'}
                    gap={2}
                  >
                    {Array(3)
                      .fill('')
                      .map((_: any, i2: number) => {
                        return (
                          <Skeleton
                            key={i2}
                            variant="rounded"
                            width={100}
                            height={70}
                          />
                        );
                      })}
                  </Stack>
                </Stack>
              );
            })
        : tables.map((item: any, i: number) => {
            return (
              <Stack
                gap={1}
                key={i}
              >
                <Typography
                  variant="h6"
                  color={thirdColor}
                  fontWeight={600}
                >
                  {item?.type}
                </Typography>
                <Stack
                  direction={'row'}
                  flexWrap={'wrap'}
                  gap={2}
                >
                  {Array(item?.num)
                    .fill('')
                    .map((_: any, i2: number) => {
                      return (
                        <Stack
                          key={i2}
                          sx={{
                            width: 100,
                            height: 100,
                            bgcolor: primaryColor,
                            borderRadius: 2,
                            color: 'white',
                          }}
                          alignItems={'center'}
                          justifyContent={'center'}
                          gap={1}
                        >
                          <Typography>طاولة رقم {i + 1}</Typography>
                          <LoadingButton
                            variant="contained"
                            color="info"
                          >
                            حجز
                          </LoadingButton>
                        </Stack>
                      );
                    })}
                </Stack>
              </Stack>
            );
          })}
    </Stack>
  );
};

export default ChooseDate;
