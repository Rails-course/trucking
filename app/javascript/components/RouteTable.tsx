import React from "react"
import PropTypes from "prop-types"
import Button from "@mui/material/Button";

interface RoutesTableFormProps {
  Routes:any,
  setRoutes: any,
}

const RouteTable:React.FC <RoutesTableFormProps> = (props: RoutesTableFormProps) =>{
  const {
    Routes, setRoutes
  } = props;
return (
      <React.Fragment>
        {Routes.map((route) => (
           route.name
        ))}
      </React.Fragment>
    );
  }


export default RouteTable
