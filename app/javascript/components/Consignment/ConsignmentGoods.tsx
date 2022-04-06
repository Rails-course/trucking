import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, Button,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, IconButton,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

import { ConsignmentGoodsProps, Item } from '../../common/interfaces_types';

const ConsignmentGoods: React.FC<ConsignmentGoodsProps> = (props: ConsignmentGoodsProps) => {
  const {
    isActiveModal, handleClose, handleGoodsSubmit, goods, checkedGoods, setCheckedGooods, currentUserRole
  } = props;

  const handleToggle = (value: Item) => () => {
    if (checkedGoods.indexOf(value) === -1) {
      setCheckedGooods([...checkedGoods, value]);
    } else {
      setCheckedGooods(checkedGoods.filter((item) => item !== value));
    }
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
                onSubmit={handleGoodsSubmit}
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
                          <ListItemButton
                            role={undefined}
                            onClick={handleToggle(value)}
                            dense
                            disabled={!(currentUserRole === 'manager')}
                          >
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
                    <Button
                      type="submit"
                      onClick={handleClose}
                      disabled={!(currentUserRole === 'manager')}
                    >
                      Submit
                    </Button>
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
