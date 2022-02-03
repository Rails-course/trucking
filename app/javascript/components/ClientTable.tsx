// @ts-ignore
import React, { FC } from 'react';
interface ClientTableProps {
  name: string;
  company:string;
}

const ClientTable: FC<ClientTableProps> = ({ name,company }) => {
  return (
      <>s
        <div className='clientscontainer '>
          <div className='clientsbox '>{name} </div>
          <div className='clientsbox '> {company}</div>
        </div>
      </>
  );
};
export default ClientTable

