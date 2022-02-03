// @ts-ignore
import React, { FC } from 'react';
interface ClientTableProps {
  name: string;
  company:string;
}

const ClientTable: FC<ClientTableProps> = ({ name,company }) => {
  return (
      <>
        <div className='clientscontainer '>
          <div className='clientsbox '><h2>{name}</h2> </div>
          <div className='clientsbox '><h2>{company}</h2></div>
        </div>
      </>
  );
};
export default ClientTable

