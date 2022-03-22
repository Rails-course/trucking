import {useState} from 'react';
import * as React from 'react';
import httpClients from "../../api/httpClient";

interface CheckpointsFormProps {
  id:number,
  isActiveRoutes:boolean,
  handleClose:() => void
}

const Checkpoints:React.FC <CheckpointsFormProps> = (props: CheckpointsFormProps) => {
  const {id} = props;
  const[checkpoints,setcheckpoints]=useState(null);
  React.useEffect(() => {
    httpClients.waybill.get_routes(id).then((response) => {
      setcheckpoints(response.data);console.log(response.data)
    });
  }, []);

  return (
      <>
        {checkpoints.map((route) => (
            <p className="paragr">
              {' '}
              {route}
            </p>
        ))}
      </>
  );
};

export default Checkpoints;
