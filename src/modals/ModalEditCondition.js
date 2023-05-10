
import './modal.css';
import './button.css';
import { useState } from "react";
import Client from '../Client';
import FormField from './FormField';

function FormCondition({ fieldName, condition, onFinish }) {
  
  const [minimum, setMinimum] = useState(condition.minimum);
  const [maximum, setMaximum] = useState(condition.maximum);

  const handleChangeMinimum = (event) => {
    if (!isNaN(event.target.value)) {
      setMinimum(event.target.value);
    }
  }

  const handleChangeMaximum = (event) => {
    if (!isNaN(event.target.value)) {
      setMaximum(event.target.value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();    
    var conditionEdited = { 
      minimum: minimum,
      maximum: maximum
    };
    console.log("Values to submit " + JSON.stringify(conditionEdited));
    Client.saveCondition(fieldName, conditionEdited, () => {
      console.log("Condition saved for fieldName " + fieldName);
      onFinish(true);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <FormField label="Minimum" name="minimum" value={minimum || ""} onChange={handleChangeMinimum} />
          <FormField label="Maximum" name="maximum" value={maximum || ""} onChange={handleChangeMaximum} />
        </tbody>
      </table>
      <div className="center">
        <input className="button button-center" type="submit" value="Change" />
      </div>
    </form>
  )
}

export default function ModalEditCondition({ fieldName, condition, onFinish }) {
  
    function close() {
      onFinish(false);
    }
  
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => close()}>&times;</span>
          <p>Edit condition of {fieldName}</p>
          <FormCondition fieldName={fieldName} condition={condition} onFinish={onFinish} />
        </div>
      </div>
    );
  }

