import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StickyHeadTable = ({ columns, rows }) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const selectedDashboard = localStorage.getItem('selectedDashboard');
  const role = localStorage.getItem('role');



  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
    navigate(`/user-management/edit-user/${id}`);
  };
  // if(selectedDashboard === "userTable" && role === "ADMIN" || role === "READ_ONLY"){

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth || 100 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
              {columns.map(column => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id}>
                    {column.id === 'action' ? (
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(row.id)} 
                      >
                        Edit
                      </Button>
                    ) : (
                      value
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );

};

export default StickyHeadTable;
