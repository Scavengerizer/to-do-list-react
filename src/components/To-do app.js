import React from 'react';

function ToDo(){
  return(
    <header>
      <div className="row center">
        <div className="logo">
          <h1><span>H</span>OME <span>D</span>ECOR</h1>
        </div>
        <nav>
          <ul className="nav-links row center">
            <li><a href="#" className='link'>HOME</a></li>
            <li><a href="#" className='link'>ABOUT</a></li>
            <li><a href="#" className='link'>WORK</a></li>
            <li><a href="#" className='link contact'>CONTACT US</a></li>
          </ul>
        </nav>
      </div>

    </header>
  )
}

export default ToDo;