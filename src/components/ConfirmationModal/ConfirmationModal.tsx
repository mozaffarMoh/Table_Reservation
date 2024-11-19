'use client';
import { primaryColor, secondaryColor } from '@/constant/color';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReserveDataSchema } from './schema';

const ConfirmationModal = ({
  open,
  handleCancel,
  handleConfirm,
  message,
  loading = false,
  setReserveData,
  successReserve,
  currentSlug,
}: any) => {
  const [isDataReady, setIsDataReady] = useState(false);
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(
      ReserveDataSchema(['name', 'phone', 'personsNum'], currentSlug),
    ),
  });

  const tableName = () => {
    if (currentSlug == 'normal') return 'طاولات عادية';
    else if (currentSlug == 'family') return 'طاولات عائلية';
    else if (currentSlug == 'vip') return 'طاولات VIP';
    else {
      return 'اخرى';
    }
  };

  const rightStyleInput = {
    InputLabelProps: {
      sx: {
        right: 30,
        left: 'auto',
        transformOrigin: 'top right',
        textAlign: 'right',
      },
    },
    sx: {
      m: 2,
      '& .MuiOutlinedInput-notchedOutline legend': {
        textAlign: 'right',
      },
      '& .MuiFormLabel-root': {
        textAlign: 'right',
      },
      bgcolor: 'white',
    },
  };

  const fieldsArr = [
    {
      type: 'text',
      label: 'الإسم',
      slug: 'name',
    },
    {
      type: 'text',
      label: 'رقم الهاتف',
      slug: 'phone',
    },
    {
      type: 'number',
      label: 'عدد الأشخاص',
      slug: 'personsNum',
    },
  ];

  /* Empty all values when success */
  useEffect(() => {
    if (successReserve || !open) {
      reset();
      setIsDataReady(false);
      let emptyData = { name: '', phone: '', personsNum: 0 };
      setReserveData((prevArr: any) => {
        const updatedData = {
          ...prevArr,
          ...emptyData,
        };
        return updatedData;
      });
    }
  }, [successReserve, open]);

  /* Success submit */
  const onSubmit = (data: any) => {
    setReserveData((prevArr: any) => {
      const updatedData = {
        ...prevArr,
        ...data,
      };
      return updatedData;
    });
    setIsDataReady(true);
  };

  useEffect(() => {
    isDataReady && handleConfirm();
  }, [isDataReady]);

  return (
    <Dialog
      className="logout-alert"
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleCancel(event);
        }
      }}
      disableEscapeKeyDown
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        {message}
        <Typography>{tableName()}</Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          p={2}
          gap={2}
        >
          <Stack>
            {fieldsArr.map((item: any, i: number) => {
              return (
                <Controller
                  name={item.slug}
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <TextField
                        key={i}
                        type={item.type}
                        label={item.label}
                        value={field.value}
                        onChange={(e: any) => field.onChange(e.target.value)}
                        error={!!fieldState.error}
                        helperText={
                          fieldState.error ? fieldState.error.message : ''
                        }
                        {...rightStyleInput}
                      />
                    );
                  }}
                />
              );
            })}
          </Stack>
          <Stack
            direction={'row'}
            justifyContent={'center'}
            gap={2}
          >
            <Button
              variant="contained"
              onClick={handleCancel}
              sx={{
                background: secondaryColor,
                '&:hover': { background: secondaryColor },
              }}
            >
              الغاء
            </Button>
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              sx={{
                background: primaryColor,
                '&:hover': { background: primaryColor },
              }}
            >
              تأكيد
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
};

export default ConfirmationModal;
