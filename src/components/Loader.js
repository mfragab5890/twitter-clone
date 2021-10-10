import React from 'react'

function Loader() {
  return (
    <div className="ui segment" style = {{height:'50rem'}}>
      <div className="ui active dimmer">
        <div className="ui large text loader">Loading</div>
      </div>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );

}

export default Loader
