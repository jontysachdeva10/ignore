import React, { useState } from "react";
import { MdSpaceDashboard, MdDataUsage } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { BsGearFill } from "react-icons/bs";

const Sidebar = () => {
  // const [searchData, setSearchData] = useState("");

  // const searchFilter = (rows) => {
  //   const columns = rows[0] && Object.keys(rows[0]);

  //   return rows.filter(
  //     (row) => row.name.toLowerCase().indexOf(searchData) > -1
  //     // columns.some(
  //     //   (column) =>
  //     //     row[column]
  //     //       .toString()
  //     //       .toLowerCase()
  //     //       .indexOf(searchData.toLowerCase()) > -1
  //     // )
  //   );
  // };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__brand">
          <h2>API C</h2>
          <div className="sidebar__brand--line"></div>
        </div>

        <div className="sidebar__menu">
          <ul className="sidebar__menu--list">
            <li>
              <NavLink to="/" className="sidebar__menu--link">
                <MdSpaceDashboard className="sidebar__menu--icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/api" className="sidebar__menu--link">
                <MdDataUsage className="sidebar__menu--icon" />
                <span>API List</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* <div className="sidebar__settings">
          <BsGearFill className="sidebar__settings--icon" />
          <span>Settings</span>
        </div> */}
      </div>
      {/* <header className="main-content">
        <div className="header__search">
          <FaSearch className="header__search--icon" />
          <input
            placeholder="Search here"
            className="header__search--input"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </header> */}
    </>
  );
};

export default Sidebar;
