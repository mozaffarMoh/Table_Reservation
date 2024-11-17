'use client';
import { primaryColor, secondaryColor, thirdColor } from '@/constant/color';
import useGet from '@/custom-hooks/useGet';
import { Skeleton, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import CustomAlert from '../CustomAlert/CustomAlert';
import usePost from '@/custom-hooks/usePost';

const Tables = ({ reserveData }: any) => {
  const [showReserveConfirmation, setShowReserveConfirmation] = useState(false);
  const [currentNum, setCurrentNum] = useState(0);
  const [currentSlug, setCurrentSlug] = useState('');

  const [tables, loadingTables, getTables] = useGet(
    `/api/tables?param=${JSON.stringify(reserveData)}`, // `/en/api/bills?param=${currentDateString}`,
  );

  const [
    ,
    loadingReserve,
    handleReserve,
    successReserve,
    successReserveMessage,
    errorReserveMessage,
  ] = usePost('/api/tables', {
    reserveData: { ...reserveData, num: currentNum,slug:currentSlug },
  });

  useEffect(() => {
    if (reserveData?.date) {
      getTables();
    }
  }, [reserveData]);

  const handleOpenReserveModal = (num: number, slug: string) => {
    setShowReserveConfirmation(true);
    setCurrentNum(num);
    setCurrentSlug(slug);
  };

  useEffect(() => {
    if (successReserve) {
      setShowReserveConfirmation(false);
      setCurrentNum(0);
      setCurrentSlug('');
      getTables();
    }
  }, [successReserve]);

  return (
    <Stack gap={2}>
      <CustomAlert
        openAlert={Boolean(errorReserveMessage)}
        setOpenAlert={() => {}}
        message={errorReserveMessage}
      />
      <CustomAlert
        openAlert={Boolean(successReserveMessage)}
        type="success"
        setOpenAlert={() => {}}
        message={successReserveMessage}
      />
      <ConfirmationModal
        open={showReserveConfirmation}
        handleCancel={() => setShowReserveConfirmation(false)}
        handleConfirm={currentNum ? handleReserve : null}
        loading={loadingReserve}
        message={'تأكيد الحجز'}
      />

      {loadingTables
        ? Array(3)
            .fill('')
            .map((_: any, i: number) => {
              return (
                <Stack
                  gap={2}
                  key={i}
                >
                  <Skeleton width={150} />
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
        : tables &&
          tables.map((item: any, i: number) => {
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
                      const isReserved =
                        item?.isReserved &&
                        item?.reservedNums?.some((res: any) => res == i2 + 1);
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
                          <Typography>طاولة رقم {i2 + 1}</Typography>
                          <LoadingButton
                            variant="contained"
                            color={isReserved ? 'error' : 'info'}
                            onClick={
                              !isReserved
                                ? () =>
                                    handleOpenReserveModal(i2 + 1, item?.slug)
                                : () => {}
                            }
                          >
                            {isReserved ? 'محجوز' : 'حجز'}
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

export default Tables;
