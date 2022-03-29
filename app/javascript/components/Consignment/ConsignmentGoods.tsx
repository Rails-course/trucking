import * as React from 'react';
import { Form, Formik } from 'formik';

import CommentIcon from '@mui/icons-material/Comment';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, Button,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, IconButton,
} from '@mui/material';
import httpClient from '../../api/httpClient';
import { Item } from '../../common/interfaces_types';

interface ConsignmentGoodsProps {
  isActiveModal: boolean;
  handleClose: () => void;
  consId: number;
  goods: Item[];
  consignments: any;
  setConsignment: any;
}

const ConsignmentGoods: React.FC<ConsignmentGoodsProps> = (props: ConsignmentGoodsProps) => {
  const {
    isActiveModal, handleClose, consId, goods, consignments, setConsignment
  } = props;

  const [checkedGoods, setCheckedGooods] = React.useState<Item[]>([]);

  const handleToggle = (value: Item) => () => {
    if (checkedGoods.indexOf(value) === -1) {
      setCheckedGooods([...checkedGoods, value]);
    } else {
      setCheckedGooods(checkedGoods.filter(item => item !== value));
    }
  };

  // TODO: after Submit cheking goods update Consignment table with new consignment value
  // Should render new consignemnt status and create waybill button should unlock
  const handleSubmit = async () => {
    await httpClient.goods.setConsignmentGoodsChecked(consId, checkedGoods).then((response) => {
      const objIndex = consignments.findIndex(element => element.id === consId);
      console.log(objIndex + 'before')
      console.log(consignments);
      consignments[objIndex] = response.data.consignment
      setConsignment(consignments)
      console.log('after')
      console.log(consignments);
    });
    setCheckedGooods([])
  };

  return (
    <div>
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
                        <ListItem
                          key={value.id}
                          secondaryAction={(
                            <IconButton edge="end" aria-label="comments">
                              <CommentIcon />
                            </IconButton>
                          )}
                          disablePadding
                        >
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

export default ConsignmentGoods;
