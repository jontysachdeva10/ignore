import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import data from "../data.json";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  table: {
    maxHeight: '10rem',
    overflowY: 'scroll'
  },
  tableHead: {
    backgroundColor: theme.palette.primary.light,
    position: 'sticky'
  },
  tableHeadCell: {
    color: "#ffffff",
    textAlign: "center",
  },
  tableBodyCell: {
    textAlign: "center",
  },
  status: {
    display: "inline-block",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    fontSize: "0.7rem",
    padding: "3px 10px",
  },
  searchBar: {
    width: "30rem",
    //   position: "absolute",
    marginTop: "2.6rem",
    marginLeft: "17rem",
  },
  tablePagination: {
    marginLeft: '50rem'
  }
}));

const TableData = () => {
  const classes = useStyles();
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const searchFilter = (rows) => {
    const columns = rows[0] && Object.keys(rows[0]);

    return rows.filter((row) =>
      columns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(searchData.toLowerCase()) > -1
      )
    );
    // return rows.filter(row => row.apiName.toLowerCase().indexOf(searchData) > -1)
  };
  return (
    <>
      <Paper>
        <Header title="HSBC" subtitle="API Details" />
        <TextField
          className={classes.searchBar}
          id="standard-basic"
          label="Search here"
          variant="standard"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <TableContainer className="table__container">
          <Table className="table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableHeadCell}>Id</TableCell>
                <TableCell className={classes.tableHeadCell}>
                  API Name
                </TableCell>
                <TableCell className={classes.tableHeadCell}>Score</TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Recommendation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchFilter(data)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((x) => {
                  return (
                    <TableRow key={x.id} className="table__row">
                      <TableCell className={classes.tableBodyCell}>
                        {x.id}
                      </TableCell>
                      <TableCell className={classes.tableBodyCell}>
                        {/* <Link to='/api'>{x.apiName}</Link> */}
                        <a href={x.apiLink} className="table__cell-link">
                          {x.apiName}
                        </a>
                      </TableCell>
                      <TableCell className={classes.tableBodyCell}>
                        {x.socre}
                      </TableCell>
                      <TableCell className={classes.tableBodyCell}>
                        <span
                          className={classes.status}
                          style={{
                            backgroundColor:
                              (x.recommendation === "Good" && "green") ||
                              (x.recommendation === "Bad" && "red"),
                          }}
                        >
                          {x.recommendation}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TableFooter> */}
          <TablePagination
            className={classes.tablePagination}
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        {/* </TableFooter> */}
      </Paper>
    </>
  );
};

export default TableData;
