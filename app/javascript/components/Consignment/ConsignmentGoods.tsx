import * as React from 'react';
import { Form, Formik } from 'formik';

import {
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, Button, ListItemButton, ListItemText,
  IconButton, Paper, Table, TableHead, TableRow, TableBody, TableContainer, Checkbox,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

import {
  ConsignmentGoodsProps, Item,
} from '../../common/interfaces_types';
import { StyledTableCell, StyledTableRow } from '../../utils/style';
import { consignmentGoods } from '../../constants/consignmentFields';

const ConsignmentGoods: React.FC<ConsignmentGoodsProps> = (props: ConsignmentGoodsProps) => {
  const {
    isActiveModal, handleClose, handleGoodsSubmit, goods, checkedGoods, setTitleStatus,
    setCheckedGooods, titleStatus, currentUserRole,
  } = props;

  const handleToggle = (value: Item) => () => {
    if (checkedGoods.indexOf(value) === -1) {
      setCheckedGooods([...checkedGoods, value]);
    } else {
      setCheckedGooods(checkedGoods.filter((item) => item !== value));
    }
    switch (value.status) {
      case 'accepted':
        return setTitleStatus('Checked');
      case 'checked':
        setTitleStatus('Checked');
        return setTitleStatus('Delivered');
      default:
        setTitleStatus('');
        return setTitleStatus('');
    }
  };

  return (
    <div>
      <Dialog
        open={isActiveModal}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { maxWidth: '650px', maxHeight: 535 } }}
        maxWidth="xs"
      >
        <DialogTitle>Goods Conformity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <Formik
                initialValues={{ checked: [] }}
                onSubmit={handleGoodsSubmit}
              >
                <Form>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell>{titleStatus}</StyledTableCell>
                          {consignmentGoods.map((good) => (
                            <StyledTableCell key={good.id} align={good.align}>
                              {good.title}
                            </StyledTableCell>
                          ))}
                        </StyledTableRow>
                      </TableHead>
                      <TableBody>
                        {!goods
                          ? (
                            <TableRow>
                              <StyledTableCell>No data yet ...</StyledTableCell>
                            </TableRow>
                          )
                          : goods.map((value) => {
                            const labelId = `checkbox-list-label-${value}`;
                            return (
                              <StyledTableRow key={value.id}>
                                <StyledTableCell>
                                  <ListItemButton
                                    role={undefined}
                                    onClick={handleToggle(value)}
                                    disabled={!['driver', 'manager'].includes(currentUserRole)}
                                    dense
                                  >
                                    <Checkbox
                                      checked={checkedGoods.indexOf(value) !== -1}
                                      tabIndex={-1}
                                      disableRipple
                                      inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                  </ListItemButton>
                                </StyledTableCell>
                                <StyledTableCell align="center"><ListItemText id={labelId} primary={`${value?.good_name}`} /></StyledTableCell>
                                <StyledTableCell align="center"><ListItemText id={labelId} primary={`${value?.quantity}`} /></StyledTableCell>
                                <StyledTableCell align="center"><ListItemText id={labelId} primary={`${value?.unit_of_measurement}`} /></StyledTableCell>
                                <StyledTableCell align="center">{value?.status}</StyledTableCell>
                                <StyledTableCell align="right" style={{ width: '30%' }}>
                                  <IconButton edge="end" aria-label="comments"><CommentIcon /></IconButton>
                                </StyledTableCell>

                              </StyledTableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <DialogActions>
                    <Button
                      type="submit"
                      onClick={handleClose}
                      color="success"
                      disabled={!['driver', 'manager'].includes(currentUserRole)}
                      variant="outlined"
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
