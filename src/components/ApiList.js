import { TablePagination } from "@material-ui/core";
import React, { useState } from "react";
import data from "../data.json";
import { FaSearch } from "react-icons/fa";
import CategoryModal from "./CategoryModal";

const ApiList = () => {
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
  };

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [resultList, setResultList] = useState([]);

  const onModalClick = (name, categoryList, resultList) => {
    setShowModal(true);
    setName(name);
    setCategoryList(categoryList);
    setResultList(resultList);
    console.log(categoryList.filter(x => x.status === "Failed"));
  };

  return (
    <>
      <div className="main-content">
        <header className="header">
          <div className="header__title">
            <h2>API</h2>
          </div>

          <div className="search">
            <FaSearch className="search__icon" />
            <input
              placeholder="Search here"
              className="search__input"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        </header>

        <div className="card">
          <div className="table--wrap">
            <table className="table table-hover">
              <thead className="table__heading">
                <tr>
                  <th>&nbsp;</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Recommendation</th>
                  {/* <th>Cause</th> */}
                </tr>
              </thead>
              <tbody>
                {searchFilter(data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
                      <tr key={item.id}>
                        <th>{item.id}</th>
                        <td>
                          {/* <Link
                        className="table__link"
                        to={{
                          pathname: `/api/${item.apiName}`,
                        }}
                        state={{
                          name: item.apiName,
                          category: item.categoryStatus,
                          result: item.results,
                        }}
                      > */}
                          <a
                            className="table__link"
                            href="#"
                            onClick={() =>
                              onModalClick(
                                item.apiName,
                                item.categoryStatus,
                                item.results
                              )
                            }
                          >
                            {item.apiName}
                          </a>
                          {/* </Link> */}
                        </td>
                        <td>{item.socre}</td>
                        <td>
                          <span
                            className="table__data--status"
                            style={{
                              background:
                                (item.recommendation === "Good" && "#cff6dd") ||
                                (item.recommendation === "Bad" && "#f6cfcf"),
                              color:
                                (item.recommendation === "Good" && "#1fa750") ||
                                (item.recommendation === "Bad" && "#dc3545"),
                            }}
                          >
                            {item.recommendation}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="table__pagination">
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
      <CategoryModal
        name={name}
        categoryList={categoryList}
        resultList={resultList}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default ApiList;
