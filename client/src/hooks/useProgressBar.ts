import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const useProgressBar = () => {
  const location = useLocation();

  console.log('location', location);

  useEffect(() => {
    const x = NProgress.start();
    console.log('nprogress started', x);
    // Optionally set a percentage if needed, though it is not necessary
    NProgress.set(0.2); // 40% as an example

    return () => {
      console.log('nprogress ended');
      x.done();
    };
  }, [location]);

  return {};
};

export default useProgressBar;
