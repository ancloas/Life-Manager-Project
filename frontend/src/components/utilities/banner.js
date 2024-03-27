import React, { useState, useEffect } from 'react';

function NotificationBanner({ type, message, onClose, timeout }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer;
    if (timeout) {
      timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, timeout);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [onClose, timeout]);

  return (
    <div className={`banner ${type}`} style={{ display: visible ? 'block' : 'none' }}>
      {message}
      <button onClick={onClose}>X</button>
    </div>
  );
}

export default NotificationBanner;
