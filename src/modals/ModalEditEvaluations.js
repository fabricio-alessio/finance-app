
import './modal.css';
import './button.css';
import { useState } from "react";
import Client from '../Client';
import FormField from './FormField';

function FormEvaluations({ code, evaluations, onFinish }) {
  
  const [observedPayout, setObservedPayout] = useState(evaluations.observedPayout);
  const [prediction0, setPrediction0] = useState(evaluations.proventPredictions[0].value);
  const [prediction1, setPrediction1] = useState(evaluations.proventPredictions[1].value);
  const [prediction2, setPrediction2] = useState(evaluations.proventPredictions[2].value);

  const handleChangeObservedPayout = (event) => {
    if (!isNaN(event.target.value)) {
      setObservedPayout(event.target.value);
    }
  }

  const handleChangePrediction0 = (event) => {
    if (!isNaN(event.target.value)) {
      setPrediction0(event.target.value);
    }
  }

  const handleChangePrediction1 = (event) => {
    if (!isNaN(event.target.value)) {
      setPrediction1(event.target.value);
    }
  }

  const handleChangePrediction2 = (event) => {
    if (!isNaN(event.target.value)) {
      setPrediction2(event.target.value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();    
    var evaluationsEdited = { 
      observedPayout: observedPayout, 
      proventPredictions: [
        { year: 2023, value: prediction0 },
        { year: 2024, value: prediction1 },
        { year: 2025, value: prediction2 }
      ] 
    };
    console.log("Values to submit " + JSON.stringify(evaluationsEdited));
    Client.saveCompanyEvaluations(code, evaluationsEdited, () => {
      console.log("evaluations saved for company " + code);
      onFinish(true);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <FormField label="Observed payout" name="observedPayout" value={observedPayout || ""} onChange={handleChangeObservedPayout} />
          <FormField label={evaluations.proventPredictions[0].year} name="prediction0" value={prediction0 || ""} onChange={handleChangePrediction0} />
          <FormField label={evaluations.proventPredictions[1].year} name="prediction1" value={prediction1 || ""} onChange={handleChangePrediction1} />
          <FormField label={evaluations.proventPredictions[2].year} name="prediction2" value={prediction2 || ""} onChange={handleChangePrediction2} />          
        </tbody>
      </table>
      <div className="center">
        <input className="button button-center" type="submit" value="Change" />
      </div>
    </form>
  )
}

export default function ModalEditEvaluations({ code, evaluations, onFinish }) {
  
    function close() {
      onFinish(false);
    }
  
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => close()}>&times;</span>
          <p>Edit evaluations of {code}</p>
          <FormEvaluations code={code} evaluations={evaluations} onFinish={onFinish} />
        </div>
      </div>
    );
  }

