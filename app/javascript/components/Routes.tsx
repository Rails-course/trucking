import React, {useState} from "react"
import PropTypes from "prop-types"
import {Box, DialogTitle, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import CompanyTable from "./CompanyTable";
import CreateCompanyForm from "./CreateCompanyForm";
import RouteTable from "./RouteTable";
import CreateRoutes from "./CreateRoutes";
import { Dialog, DialogActions, DialogContent} from "@mui/material";
import httpClients from "../api/httpClient";

interface RoutesFormProps {
    isActiveRoute: boolean;
    RoutehandleClose: () => void;
    open: () => void;
    setRoutes: any,
    routes:any,
}

const Routes:React.FC <RoutesFormProps> = (props: RoutesFormProps) =>  {
    const {
        isActiveRoute, RoutehandleClose, setRoutes,routes,open
    } = props;

    // модальное окно создания чекпоинтов
    const [isCreateRoutes, setCreateRoutes] = useState(false);

    const CloseCreateRoutes=()=>{
        setCreateRoutes(false)
    }
    return (
        <div className="wrapper">

            <Dialog
                open={isActiveRoute}
                onClose={RoutehandleClose}
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
                maxWidth="xs"
            >
                <DialogTitle>Add checkpoint</DialogTitle>
                <DialogContent>
                    <Button variant="outlined" onClick={open} >
                        Open create
                    </Button>
                    {routes.map((route) => (
                        route.name
                    ))}
                </DialogContent>
            </Dialog>
        </div>
    );
  }


export default Routes
