import React from "react";
import { MdSpaceDashboard, MdDataUsage } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__brand">
          <h2>API C</h2>
        </div>

        <div className="sidebar__menu">
          <ul>
            <li className="sidebar__menu--list">
              <NavLink to='/' className="sidebar__menu--link">
                <MdSpaceDashboard className="sidebar__menu--icon"/>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="sidebar__menu--list">
              <NavLink to="/api" className="sidebar__menu--link">
                <MdDataUsage className="sidebar__menu--icon"/>  
                <span>API List</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
