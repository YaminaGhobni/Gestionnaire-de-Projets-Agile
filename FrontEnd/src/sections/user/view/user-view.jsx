import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import CreateUser from '../modals/createUser/crerate-user';
import AddUser from '../modals/AddUser/AddUser';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'src/my-store/slices/users-rolesSlice';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.members);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [value, setValue] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(60);
  const [users, setUSers] = useState([]);

  //modals
  const [isModalCreate, setIsModalCreate] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    dispatch(getUsers({ query: '' }));
  }, []);
  useEffect(() => {
    setUSers(members);
  }, [members]);

  useEffect(() => {
    if (value.length === 0) {
      setUSers(members);
    } else {
      setUSers(
        members.filter(
          (el) =>
            el?.name?.includes(value) ||
            el?.firstName?.includes(value) ||
            el?.lastName?.includes(value) ||
            el?.email?.includes(value) ||
            el?.phoneNumber?.includes(value) ||
            el?.roles?.includes(value) ||
            el?.userName?.includes(value)
        )
      );
    }
  }, [value]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button
          onClick={() => setIsModalCreate(true)}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar numSelected={selected.length} users={members} setValue={setValue} />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'Phone Number', label: 'Phone Number' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'email', label: 'Created At' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <UserTableRow
                    key={row.id}
                    name={row.firstName ? row.firstName : row.name}
                    role={row.roles}
                    email={row.email}
                    status={row.createdAt}
                    company={row.phoneNumber}
                    avatarUrl={row.phoneNumber}
                    isVerified={row.phoneNumber}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                    id={row._id}
                    user={row}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {/* {notFound && <TableNoData query={filterName} />} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        {/* 
        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Card>
      {/* <CreateUser isOpen={isModalCreate} setIsOpen={setIsModalCreate} /> */}
      <AddUser open={isModalCreate} handleClose={setIsModalCreate} />
    </Container>
  );
}
