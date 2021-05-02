import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ReactDOM from 'react-dom';


const ATMDeposit = (props) => {
  return (
    <label className="label huge">
      <h3> {props.atmMode}</h3>
      <input className={`input-${props.atmMode}`} id="number-input" type="number" defaultValue={0} min="0" width="200" onChange={props.onChange}></input>
      <input className={`${props.atmMode}`} type="submit" width="200" value="Submit" id="submit-input"  disabled={props.validTransaction}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  let status = `Account Balance $ ${totalState} `;
 
  const handleChange = (event) => {
    setDeposit(Number(event.target.value));
    let isValid = (isDeposit ? totalState + Number(event.target.value) : totalState - Number(event.target.value));
    console.log(`isDeposit ${isDeposit}`);
    console.log(`totalState ${totalState}`);
    console.log(`deposit ${deposit}`);
    console.log(`isValid ${isValid}`);
    setValidTransaction(isValid< 0 ? true : false)
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    event.preventDefault();
    setValidTransaction(newTotal- deposit < 0 ? true : false );
  };
  const handleModeSelect = (e) => {
    setIsDeposit(e.target.value === "Deposit" ? true : false )
    setAtmMode(e.target.value);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option  id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash-Back">Cash Back</option>
      </select>
        {atmMode === "" ? <></> :
          <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode} validTransaction={validTransaction} ></ATMDeposit>
        }
    </form>
  );
};
 

export default Account ;
