import Main from '@/sections/Main/Main';
import PushNotification from '@/sections/SendNotification/SendNotification';
import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <>
      <h1>Push Notification</h1>
      <PushNotification />
    </>
  );
};

export default HomePage;
