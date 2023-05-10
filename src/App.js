import { useState } from 'react';
import Client from './Client';
import Command from './Command';
import ModalAllTickersExtractor from './modals/ModalAllTickersExtractor.js';
import ModalExtractMyAccount from './modals/ModalExtractMyAccount.js';
import ModalEditEvaluations from './modals/ModalEditEvaluations.js';
import ModalEditCondition from './modals/ModalEditCondition.js';
import TicketTable from './table/TicketTable.js';
import Menu from './menu/Menu.js';
import { fieldAsText } from './FieldName';

export default function App() {
  const [ordering, setOrdering] = useState({type: "NONE", field: "code"});
  const [tickers, setTickers] = useState([]);
  const [showModalExtractAllTickers, setShowModalExtractAllTickers] = useState(false);
  const [showModalExtractMyAccount, setShowModalExtractMyAccount] = useState(false);
  const [editEvaluations, setEditEvaluations] = useState({ enabled: false, ticketCode: "" });
  const [editCondition, setEditCondition] = useState({ enabled: false, fieldName: "" });

  function handleMenuClick(command) {
    console.log("Menu clicked " + command);
    if (command.substring(0, Command.ORDER_ASC.length) == Command.ORDER_ASC) {
      var field = command.substring(Command.ORDER_ASC.length+1, command.length);
      var fieldText = fieldAsText(field);
      console.log("run ordering command " + command + " fieldText " + fieldText);
      setOrdering({type: "ASC", field: fieldText});
    } else if (command.substring(0, Command.ORDER_DESC.length) == Command.ORDER_DESC) {
      var field = command.substring(Command.ORDER_DESC.length+1, command.length);
      var fieldText = fieldAsText(field);
      console.log("run ordering command " + command + " fieldText " + fieldText);
      setOrdering({type: "DESC", field: fieldText});
    } else if (command == Command.LOAD_TICKETS) {
      Client.loadReport((loadedTickers) => {
        setTickers(loadedTickers.tickers.slice());
      });
    } else if (command == Command.EXTRACT_ALL_TICKETS) {      
      setShowModalExtractAllTickers(true);
    } else if (command == Command.EXTRACT_MY_ACCOUNT) {
      setShowModalExtractMyAccount(true);
    } else if (command.substring(0, Command.EDIT_EVALUATIONS.length) == Command.EDIT_EVALUATIONS) {
      console.log("Command evaluations " + command);
      var code = command.substring(Command.EDIT_EVALUATIONS.length+1, command.length);
      Client.getCompanyEvaluations(code, (evaluations) => {
        console.log("evaluations for company " + code + " is " + JSON.stringify(evaluations));
        setEditEvaluations({ enabled: true, ticketCode: code, evaluations: evaluations });
      });
    } else if (command.substring(0, Command.EDIT_CONDITION.length) == Command.EDIT_CONDITION) {
      console.log("Command condition " + command);
      var fieldName = command.substring(Command.EDIT_CONDITION.length+1, command.length);
      //var field = fieldFromName(fieldName);
      Client.getCondition(fieldName, (condition) => {
        console.log("Condition for field " + fieldName + " is " + JSON.stringify(condition));
        setEditCondition({ enabled: true, fieldName: fieldName, condition: condition });
      });
    }
  }
  
  function handleExtractAllTickersFinish() {
    console.log("Receive all tickers finish");
    setShowModalExtractAllTickers(false);
  }
  
  function handleExtractMyAccountFinish() {
    console.log("Receive my account finish");
    setShowModalExtractMyAccount(false);
  }
  
  function handleEditEvaluationsFinish(refresh) {
    console.log("Receive edit evaluations finish");
    setEditEvaluations(false);
    if (refresh) {
      Client.loadReport((loadedTickers) => {
        setTickers(loadedTickers.tickers.slice());
      });
    }
  }
  
  function handleEditConditionFinish(refresh) {
    console.log("Receive edit condition finish");
    setEditCondition(false);
    if (refresh) {
      Client.loadReport((loadedTickers) => {
        setTickers(loadedTickers.tickers.slice());
      });
    }
  }

  if (showModalExtractAllTickers) {
    var modal = <ModalAllTickersExtractor onFinish={handleExtractAllTickersFinish} />;
  } else if (showModalExtractMyAccount) {
    var modal = <ModalExtractMyAccount onFinish={handleExtractMyAccountFinish} />;
  } else if (editEvaluations.enabled) {
    console.log("criou modal edit evaluations " + editEvaluations.ticketCode);    
    var modal = <ModalEditEvaluations code={editEvaluations.ticketCode} evaluations={editEvaluations.evaluations} onFinish={handleEditEvaluationsFinish} />;
  } else if (editCondition.enabled) {
    console.log("criou modal edit condition " + editCondition.fieldName);    
    var modal = <ModalEditCondition fieldName={editCondition.fieldName} condition={editCondition.condition} onFinish={handleEditConditionFinish} />;
  }

  return (
    <>
      <Menu onMenuClick={handleMenuClick} />
      <TicketTable tickers={tickers} ordering={ordering} onMenuClick={handleMenuClick} />
      {modal}
    </>
  )
}
