import React, { useEffect } from 'react';

export const Alert = ({ alert, removeAlert, list }) => {
  //   console.log(message);
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  return (
    <div
      className={`text-${alert.color}-500 bg-${alert.color}-100 text-lg border-1 border-${alert.color}-500 rounded justify-center p-2 mb-2`}
    >
      {alert.message}
    </div>
  );
};
