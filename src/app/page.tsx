import Main from '@/sections/Main/Main';
import PushNotification from '@/sections/SendNotification/SendNotification';
import { Typography } from '@mui/material';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <>
      {/*    <Main /> */}
      <Typography>PUSH NOTIFIAITON</Typography>
      <PushNotification />
    </>
  );
};

export default HomePage;
