'use client';
import { primaryColor, secondaryColor } from '@/constant/color';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

const ConfirmationModal = ({
  open,
  handleCancel,
  handleConfirm,
  message,
  loading = false,
}: any) => {

  return (
    <Dialog
      className="logout-alert"
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle>{message}</DialogTitle>
      <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
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
          loading={loading}
          variant="contained"
          onClick={handleConfirm}
          sx={{
            background: primaryColor,
            '&:hover': { background: primaryColor },
          }}
        >
        تأكيد
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
