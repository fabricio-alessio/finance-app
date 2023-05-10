
import './modal.css';
import './button.css';
import {useRef} from 'react';
import Client from '../Client';

export default function ModalExtractMyAccount({ onFinish }) {
  
    const bearer = useRef(null);

    function startExtraction() {
      //console.log(bearer.current.value);
      Client.extractPositions(bearer.current.value, () => {
        onFinish();
      });
    }

    function close() {
      onFinish();
    }
  
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => close()}>&times;</span>
          <p>Extract my account</p>
          <textarea ref={bearer} rows="20" style={{width: 100 + '%'}} placeholder="custody-position Authorization: bearer"></textarea>
          <p></p>
          <div className="center">
            <button className="button button-center" onClick={() => startExtraction()}>Start</button>
          </div>
        </div>
      </div>
    );
  }

