
import './progress-bar.css';
import './modal.css';
import './button.css';
import { useState } from 'react';
import Client from '../Client';

function ProgressBar({ position }) {
    return (
      <div id="myProgress">
        <div id="myBar" style={{width:position + '%'}}></div>
      </div>
    );
  }

export default function ModalExtractMyAccount({ onFinish }) {
    const [position, setPosition] = useState(0);
  
    function extractIndicators(codes, totalLength) {
      if (codes.length == 0) {
        console.log("Finish indicators extraction");
        setPosition(100);
        onFinish(true);
        return;
      }
      var code = codes[0];
      Client.extractIndicator(code, () => {
        console.log(`Indicator ${code} extracted`);
        setPosition(100 - (codes.length / totalLength * 100));
        var sliceCodes = codes.slice(1, codes.length);
        setTimeout(() => {
          extractIndicators(sliceCodes, totalLength);
        }, 500);
      });
    }
  
    function startExtraction() {
      Client.getAllIndicatorCodes((response) => {
        setPosition(0);
        extractIndicators(response.codes, response.codes.length);
      });
    }  
    
    function close() {
      onFinish(false);
    }
  
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => close()}>&times;</span>
          <p>Extract all tickers indicators</p>
          <ProgressBar position={position}/>
          <p></p>
          <div className="center">
            <button className="button button-center" onClick={() => startExtraction()}>Start</button>
          </div>
        </div>
      </div>
    );
  }

