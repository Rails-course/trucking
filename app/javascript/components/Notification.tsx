import * as React from 'react';

const Notification = ({ notice, alert }) => {
  return (
    <div>
      {notice ? <p>{notice}</p> : null}
      {alert ? <p>{alert}</p> : null}
    </div>
  )
}

export default Notification;
