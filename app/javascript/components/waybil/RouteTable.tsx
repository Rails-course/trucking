import React from "react"

interface RoutesTableFormProps {
  routes:any
}

const RouteTable:React.FC <RoutesTableFormProps> = (props: RoutesTableFormProps) =>{
  const {
    routes
  } = props;
return (
      <React.Fragment>
        {routes.map((route) => (
         <p> {route.name}</p>
        ))}
      </React.Fragment>
    );
  }


export default RouteTable
