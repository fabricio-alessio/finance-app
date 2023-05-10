import './menu.css';
import Command from '../Command';
import Link from '../Link.js';

export default function Menu({ onMenuClick }) {
    const handleAnchorClick = (event, command) => {
      event.preventDefault();
      console.log("Command: " + command);
      console.log(event.currentTarget);
      onMenuClick(command);
    };
  
    return (
      <ul>
        <li>
            <Link label="Load tickers" onLinkClick={event => handleAnchorClick(event, Command.LOAD_TICKETS)} />
        </li>
        <li className="dropdown">
          <a href="javascript:void(0)" className="dropbtn">Extraction</a>
          <div className="dropdown-content">          
            <Link label="All tickers" onLinkClick={event => handleAnchorClick(event, Command.EXTRACT_ALL_TICKETS)} />
            <Link label="My account" onLinkClick={event => handleAnchorClick(event, Command.EXTRACT_MY_ACCOUNT)} />
          </div>
        </li>
        <li className="dropdown">
          <a href="javascript:void(0)" className="dropbtn">Configuration</a>
          <div className="dropdown-content">
            <Link label="Edit tickets" onLinkClick={event => handleAnchorClick(event, "editTickets")} />
            <Link label="Limits" onLinkClick={event => handleAnchorClick(event, "limits")} />
          </div>
        </li>
      </ul>
    )
  }