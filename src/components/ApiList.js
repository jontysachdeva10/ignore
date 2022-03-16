import { TablePagination, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import data from "../data.json";
import { FaSearch } from "react-icons/fa";
import CategoryModal from "./CategoryModal";
import { IoAlertCircleSharp } from "react-icons/io5";
import pic from '../image/logo-1.png';

const ApiList = () => {
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [resultList, setResultList] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const searchFilter = (rows) => {
    const columns = rows[0] && Object.keys(rows[0]);

    return rows.filter(
      (row) => row.name.toLowerCase().indexOf(searchData) > -1
      // columns.some(
      //   (column) =>
      //     row[column]
      //       .toString()
      //       .toLowerCase()
      //       .indexOf(searchData.toLowerCase()) > -1
      // )
    );
  };

  const onModalClick = (name, categoryList, resultList) => {
    setShowModal(true);
    setName(name);
    setCategoryList(categoryList);
    setResultList(resultList);
  };

  const filterCauses = (data) => {
    return data
      .filter((x) => x.status === "FAILED")
      .map((item) => <li>{item.category}</li>);
  };

  return (
    <>
      <div className="main-content">
        <header className="header">
          <div className="header__title">
            <p>API</p>
          </div>

          <div className="header__search">
            <FaSearch className="header__search--icon" />
            <input
              placeholder="Search here"
              className="header__search--input"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        </header>

        <div className="card">
          <div className="table--wrap">
            <table className="table">
              <thead className="table__heading">
                <tr>
                  <td>Name</td>
                  <td>Score</td>
                  <td>Recommendation</td>
                  {/* <td className="table__categories">Failing Categories</td> */}
                </tr>
              </thead>
              <tbody>
                {searchFilter(data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
                      <tr key={item.name}>
                        <td>
                          {/* <Link
                        className="table__link"
                        to={{
                          pathname: `/api/${item.name}`,
                        }}
                        state={{
                          name: item.name,
                          category: item.categoryResults,
                          result: item.results,
                        }}
                      > */}
                          <a
                            className="table__link"
                            href="#"
                            onClick={() =>
                              onModalClick(
                                item.name,
                                item.categoryResults,
                                item.results
                              )
                            }
                          >
                            {item.name}
                          </a>
                          {/* </Link> */}
                        </td>
                        <td>{item.recommendation.score}</td>
                        <td>
                          <span
                            className="table__data--status"
                            style={{
                              background:
                                (item.recommendation.status === "Good" &&
                                  "#cff6dd") ||
                                (item.recommendation.status === "Bad" &&
                                  "#f6cfcf"),
                              color:
                                (item.recommendation.status === "Good" &&
                                  "#1fa750") ||
                                (item.recommendation.status === "Bad" &&
                                  "#dc3545"),
                            }}
                          >
                            {item.recommendation.status}
                          </span>
                          <div className="table__tooltip">
                            <Tooltip
                              title={filterCauses(item.categoryResults)}
                              placement="right"
                            >
                              <span>
                                <IoAlertCircleSharp  className="table__tooltip--icon" />
                                {/* <img className="table__tooltip--img" src={pic} /> */}
                              </span>
                            </Tooltip>
                          </div>
                        </td>
                        {/* <td>
                          <div className="table__tooltip">
                            <Tooltip
                              title={filterCauses(item.categoryResults)}
                              placement="right"
                            >
                              <span>
                                <FiAlertTriangle  className="table__tooltip--icon" />
                                <img className="table__tooltip--img" src={pic} />
                              </span>
                            </Tooltip>
                          </div>
                        </td> */}
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
