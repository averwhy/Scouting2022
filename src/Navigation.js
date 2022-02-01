import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle, faAddressBook, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
const tabs = [{
    route: "/home",
    icon: faHome,
    label: "Home"
  },{
    route: "/entry",
    icon: faAddressBook,
    label: "Data Entry"
  },{
    route: "/matches",
    icon: faUserCircle,
    label: "Match Data"
  },{
    route: "/teams",
    icon: faUserAstronaut,
    label: "Team Data"
  }]
  
const Navigation = (props) => {
	return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light sticky-top" 	role="navigation">
        <div className="container-fluid">
            <a className="navbar-brand" href="/home">Scouting 2022 - Entropy 138</a>
            <Nav className="ml-auto">
            <NavItem>
                <NavLink to="/entry" className="nav-link">
                  Data Entry
                </NavLink>
              </NavItem>
            <NavItem>
                <NavLink to="/matches" className="nav-link">
                  Matches
                </NavLink>
              </NavItem>
            <NavItem>
                <NavLink to="/teams" className="nav-link">
                  Teams
                </NavLink>
              </NavItem>
            </Nav>
        </div>
      </nav>
        {props.children}
      <nav className="navbar fixed-bottom navbar-light" role="navigation">
            <Nav className="w-100">
            <div className=" d-flex flex-row justify-content-around w-100">
                {
                tabs.map((tab, index) =>(
                    <NavItem key={`tab-${index}`}>
                    <NavLink to={tab.route} className="nav-link" activeClassName="active">
                        <div className="row d-flex flex-column justify-content-center align-items-center">
                        <FontAwesomeIcon size="lg" icon={tab.icon}/>
                        <div>{tab.label}</div>
                        </div>
                    </NavLink>
                    </NavItem>
                ))
                }
            </div>
            </Nav>
      </nav>
    </div>
  )
};

export default Navigation;