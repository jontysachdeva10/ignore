import { TablePagination, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import data from "../data.json";
import { FaSearch, FaRegThumbsDown, FaThumbsDown } from "react-icons/fa";
import CategoryModal from "./CategoryModal";
import { IoAlertCircleSharp } from "react-icons/io5";
import { FcInfo } from "react-icons/fc";
import { VscThumbsup, VscThumbsdown } from "react-icons/vsc";
import { IoMdThumbsDown, IoMdThumbsUp } from "react-icons/io";
// import pic from '../image/logo-1.png';

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
              placeholder="Search"
              className="header__search--input"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        </header>

        <div className="card">
          <div className="table--wrap">
            <table className="table table-responsive">
              <thead className="bg-light" style={{whiteSpace: 'nowrap', fontSize: '0.9rem'}}>
                <tr>
                  <td>Name</td>
                  <td>Score
                    <div className="table__tooltip-1">
                      <Tooltip title={'Score is out of 9 categories'}  placement="top">
                        <span>
                          <FcInfo className="table__tooltip-1--icon" />
                         </span>
                      </Tooltip>
                    </div>
                  </td>
                  <td>Recommended</td>
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
                        <td style={{textAlign: 'center'}}><span style={{marginLeft: '-4.5rem', fontSize: '0.9rem', fontWeight: '500'}}>{item.recommendation.score}</span></td>
                        <td>
                          <span
                            className="table__data--status"
                            style={{
                              // background:
                              //   (item.recommendation.status === "Good" &&
                              //     "#cff6dd") ||
                              //   (item.recommendation.status === "Bad" &&
                              //     "#f6cfcf"),
                              // cursor: 'pointer',
                              fontSize: "0.9rem",
                              // marginLeft: '2.5rem',
                              color:
                                (item.recommendation.status === "Good" &&
                                  "#02bc88") ||
                                (item.recommendation.status === "Bad" &&
                                  "#ee3b5e"),
                            }}
                          >
                            {item.recommendation.status === "Good" ? "Recommended" : "Not Recommended"}
                            {/* {item.recommendation.status === "Good" ? <IoMdThumbsUp style={{fontSize: '1.5rem', marginLeft: '2rem'}} /> : <IoMdThumbsDown style={{fontSize: '1.5rem', marginLeft: '2rem'}} />} */}
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
