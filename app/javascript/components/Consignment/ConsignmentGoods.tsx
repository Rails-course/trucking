import * as React from 'react';
import { Form, Formik } from 'formik';

import CommentIcon from '@mui/icons-material/Comment';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, Button,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, IconButton,
} from '@mui/material';

interface ConsignmentGoodsProps {
  isActiveModal: boolean;
  handleClose: () => void;
  consId: number;
}

const ConsignmentGoods: React.FC<ConsignmentGoodsProps> = (props: ConsignmentGoodsProps) => {
  const { isActiveModal, handleClose, consId } = props;

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleSubmit = () => {
    console.log(checked, 'checked');
    console.log(consId, 'consignment id');
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
                    {[0, 1, 2, 3].map((value) => {
                      const labelId = `checkbox-list-label-${value}`;
                      return (
                        <ListItem
                          key={value}
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
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
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
