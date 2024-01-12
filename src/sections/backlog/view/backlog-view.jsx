import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { backlog } from 'src/_mock/backlog';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import BacklogTableRow from '../backlog-table-row';
import BacklogTableHead from '../backlog-table-head';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function BacklogPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = backlog.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Backlog</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => navigate('/backlog/new')}
          >
            New Backlog
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <BacklogTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={backlog.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'task', label: 'Tasks' },
                    { id: 'status', label: 'Status' },
                    { id: 'assigne', label: 'Assigne' },
                    { id: 'startDate', label: 'Start Date' },
                    { id: 'endDate', label: 'End Date' },
                    { id: 'priority', label: 'Priority', align: 'center' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {backlog
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <BacklogTableRow
                        task={row.task}
                        avatarUrl={row.avatarUrl}
                        assigned={row.assigned}
                        endDate={row.endDate}
                        startDate={row.startDate}
                        status={row.status}
                        priority={row.priority}
                        // selected={selected.indexOf(row.name) !== -1}
                        // handleClick={(event) => handleClick(event, row.name)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={backlog.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
