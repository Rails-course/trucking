import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, Button,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox,
} from '@mui/material';

import httpClient from '../../api/httpClient';
import { WaybillGoodsProps } from '../../common/interfaces_types';

const WaybillGoods: React.FC<WaybillGoodsProps> = (props: WaybillGoodsProps) => {
  const { wayId } = props;
  const [isActiveModal, setModalActive] = React.useState(false);
  const [goods, setGoods] = React.useState([]);
  const [checkedGoods, setCheckedGooods] = React.useState([]);

  const handleClose = () => setModalActive(false);

  const handleGetGoods = () => {
    // BUGFIX: if statement probably unnecessary
    if (wayId) {
      setModalActive(true);
      httpClient.goods.getWaybillGoods(wayId?.wayId).then((response) => setGoods(response.data));
    }
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checkedGoods.indexOf(value);
    const newCheckedGoods = [...checkedGoods];
    if (currentIndex === -1) {
      newCheckedGoods.push(value);
    } else {
      newCheckedGoods.splice(currentIndex, 1);
    }
    setCheckedGooods(newCheckedGoods);
  };

  const handleSubmit = () => httpClient.goods.setWaybillGoodsStatus(wayId?.wayId, checkedGoods);

  return (
    <div>
      <Button onClick={() => { handleGetGoods(); }}>Open goods</Button>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>Goods Conformity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={8}>
              <Formik
                initialValues={{ checked: [] }}
                onSubmit={handleSubmit}
              >
                <Form>
                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {goods.map((value) => {
                      const labelId = `checkbox-list-label-${value}`;
                      return (
                        <ListItem key={value.id}>
                          <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={checkedGoods.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value?.good_name} ${value?.quantity} ${value?.unit_of_measurement}`} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                  <DialogActions>
                    <Button type="submit" onClick={handleClose}>Submit</Button>
                  </DialogActions>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default WaybillGoods;
