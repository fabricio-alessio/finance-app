import './table.css';
import Command from '../Command';
import { orderByField } from './tickerOrderer.js';
import Link from '../Link.js';
import FieldName from '../FieldName';
import { isConditionField } from '../FieldName';

function TicketTable({ tickers, ordering, onMenuClick }) {
    const rows = [];
  
    const orderedTickers = orderByField(tickers, ordering);
    
    orderedTickers.forEach((ticker) => {
      rows.push(
        <TickerRow
          ticker={ticker}
          key={ticker.code}
          onMenuClick={onMenuClick} />
      );
    });
  
    return (
      <table className="minimalistBlack">
        <thead>
          <TickerHeader onMenuClick={onMenuClick} />
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
  
  function TickerThMenu({ label, field, onMenuClick, showCondition }) {
    const handleAnchorClick = (event, command) => {
      event.preventDefault();
      console.log("Command: " + command + " on " + field);
      onMenuClick(command + "|" + field);
    };
  
    if (showCondition) {
      var menuCondition = <Link label="Condition" onLinkClick={event => handleAnchorClick(event, Command.EDIT_CONDITION)} />
    }

    return (
      <th>
          <li className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">{label}</a>
            <div className="dropdown-content">
              <Link label="Sort A &#8594; Z" onLinkClick={event => handleAnchorClick(event, Command.ORDER_ASC)} />
              <Link label="Sort Z &#8594; A" onLinkClick={event => handleAnchorClick(event, Command.ORDER_DESC)} />
              {menuCondition}
            </div>
          </li>
      </th>
    )
  }
  
  function TickerHeader({ onMenuClick }) {

    return (
      <tr>
        <TickerThMenu label="C" field={FieldName.CODE} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.CODE)} />
        <TickerThMenu label="Name" field={FieldName.NAME} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.NAME)} />
        <TickerThMenu label="Sector" field={FieldName.SECTOR} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.SECTOR)} />
        <TickerThMenu label="Div5" field={FieldName.DIVIDEND_LAST_FIVE_YEARS} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.DIVIDEND_LAST_FIVE_YEARS)} />
        <TickerThMenu label="Div2" field={FieldName.DIVIDEND_LAST_TWO_YEARS} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.DIVIDEND_LAST_TWO_YEARS)} />
        <TickerThMenu label="DivF" field={FieldName.DIVIDEND_NEXT_TREE_YEARS} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.DIVIDEND_NEXT_TREE_YEARS)} />
        <TickerThMenu label="Price" field={FieldName.PRICE} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.PRICE)} />
        <TickerThMenu label="Payout" field={FieldName.OBSERVED_PAYOUT} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.OBSERVED_PAYOUT)} />
        <TickerThMenu label="Qtd" field={FieldName.QUANTITY} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.QUANTITY)} />
        <TickerThMenu label="Total" field={FieldName.TOTAL} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.TOTAL)} />
        <TickerThMenu label="AvgPr" field={FieldName.AVERAGE_PRICE} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.AVERAGE_PRICE)} />
        <TickerThMenu label="%AvgPr" field={FieldName.AVERAGE_PRICE_PERCENT} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.AVERAGE_PRICE_PERCENT)} />
        <TickerThMenu label="%FairPr" field={FieldName.FAIR_PRICE_PERCENT} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.FAIR_PRICE_PERCENT)} />
        <TickerThMenu label="%FairPrA" field={FieldName.FAIR_AVERAGE_PRICE_PERCENT} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.FAIR_AVERAGE_PRICE_PERCENT)} />
        <TickerThMenu label="Val30D" field={FieldName.VALORIZATION_30_DAYS} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.VALORIZATION_30_DAYS)} />
        <TickerThMenu label="Val5D" field={FieldName.VALORIZATION_5_DAYS} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.VALORIZATION_5_DAYS)} />
        <TickerThMenu label="Roic" field={FieldName.ROIC} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.ROIC)} />
        <TickerThMenu label="%Tot" field={FieldName.TOTAL_PERCENT} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.TOTAL_PERCENT)} />
        <TickerThMenu label="F" field={FieldName.FILTERED} onMenuClick={onMenuClick} showCondition={isConditionField(FieldName.FILTERED)} />
      </tr>
    );
  }
  
  function TdTicker({ value }) {
    let url = "https://statusinvest.com.br/acoes/" + value
    return (
      <td><a href={url} target="_blank" rel="noopener noreferrer">{value}</a></td>
    );
  }

  function TdTicketMenu({ value }) {

    const handleAnchorClick = (event, command) => {
      event.preventDefault();
      console.log("Td ticket command: " + command + " on " + value);
      //onMenuClick(command + "|" + field);
    };

    let urlStatusInvest = "https://statusinvest.com.br/acoes/" + value;
    let urlInvestor10 = "https://investidor10.com.br/acoes/" + value + "/";
    let urlFundamentus = "https://www.fundamentus.com.br/detalhes.php?papel=" + value;
    return (
      <td>
        <li className="dropdown">
          <a href="javascript:void(0)" className="dropbtn" style={{padding: '0px 16px'}}>{value}</a>
          <div className="dropdown-content">
            <a href={urlStatusInvest} target="_blank" rel="noopener noreferrer">Status Invest</a>
            <a href={urlInvestor10} target="_blank" rel="noopener noreferrer">Investidor 10</a>
            <a href={urlFundamentus} target="_blank" rel="noopener noreferrer">Fundamentus</a>
            <Link label="New feature" onLinkClick={event => handleAnchorClick(event, Command.ORDER_ASC)} />
          </div>
        </li>
      </td>
    );
  }
  
  function TdChecked({ value }) {
    let simbol = ""
    if (value) {
      simbol = "\u2713"
    }
  
    return (
      <td className="checked">{simbol}</td>
    );
  }
  
  function TdNumber({ value }) {
    if (value.out) {
      return (
        <td className="value" style={{background:'bisque'}}>{Number(value.value).toFixed(2)}</td>
      )
    } else {
      return (
        <td className="value">{Number(value.value).toFixed(2)}</td>
      )
    }
  }
  
  function TdNumberEvaluations({ value, code, onMenuClick }) {

    const handleAnchorClick = (event, command) => {
      event.preventDefault();
      console.log("Command: " + command);
      console.log(event.currentTarget);
      onMenuClick(command);
    };

    if (value.out) {
      return (
        <td className="value" style={{background:'bisque'}}>
          <div className="link">
            <Link label={Number(value.value).toFixed(2)} onLinkClick={event => handleAnchorClick(event, Command.EDIT_EVALUATIONS + "|" + code)} />
          </div>
        </td>
      )
    } else {
      return (
        <td className="value">
          <div className="link">
            <Link label={Number(value.value).toFixed(2)} onLinkClick={event => handleAnchorClick(event, Command.EDIT_EVALUATIONS + "|" + code)} />
          </div>
        </td>
      )
    }
  }
  
  function TdFixedText( { value, maxSize }) {
    return (
      <td>{value.substring(0, maxSize)}</td>
    )
  }

  function TickerRow({ ticker, onMenuClick }) {
    return (
      <tr>
        <TdTicketMenu value={ticker.code} />
        <TdFixedText value={ticker.name} maxSize={15} />
        <TdFixedText value={ticker.sector} maxSize={15} />
        <TdNumber value={ticker.div5} />
        <TdNumber value={ticker.div2} />
        <TdNumberEvaluations value={ticker.divF} code={ticker.code} onMenuClick={onMenuClick}/>
        <TdNumber value={ticker.price}/>
        <TdNumber value={ticker.payout}/>
        <td className="value">{ticker.quantity}</td>
        <TdNumber value={ticker.total}/>
        <TdNumber value={ticker.avgPrice}/>
        <TdNumber value={ticker.percAvgPrice}/>
        <TdNumber value={ticker.percFairPrice}/>
        <TdNumber value={ticker.percFairPriceAvg}/>
        <TdNumber value={ticker.val30Days}/>
        <TdNumber value={ticker.val5Days}/>
        <TdNumber value={ticker.roic}/>
        <TdNumber value={ticker.percTotal}/>
        <TdChecked value={ticker.filtered} />
      </tr>
    );
  }

  export default TicketTable;