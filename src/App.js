import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, Card } from 'react-bootstrap';
import Data from './data.js';
import Player from './player.js';
import Stat from './stat.js';
import { Link, Route, Switch } from 'react-router-dom';



function App() {

  const [momPage, momPage변경] = useState(false);
  const [statPage, statPage변경] = useState(false);
  const [teamPage, teamPage변경] = useState(false);
  const [이달의선수, 이달의선수변경] = useState(Data);

  return (
    <div className="App">
      
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">AF Recorder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="mr-auto">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/recorderboard">RECORDER</Nav.Link>
            <NavDropdown title="RANKING" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">FORWARD</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">MIDFIELDER</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">STOPPER</NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
          <br/>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{width: 75+"%"}}/>
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Nav justify variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link eventKey="/" onClick={(e)=>{
            momPage변경(true);
            statPage변경(false);
            teamPage변경(false);
          }}>MOM</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="/recorderboard" onClick={(e)=>{
            momPage변경(false);
            statPage변경(true);
            teamPage변경(false);
          }}>스탯 기록</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={(e)=>{
            momPage변경(false);
            statPage변경(false);
            teamPage변경(true);
          }}>내 팀</Nav.Link>
        </Nav.Item>
      </Nav>

      {
        momPage === true
        ? <div>
            { 이달의선수.map((a, i)=>{
              return <Mom 이달의선수={이달의선수[i]} i={i} ></Mom>
            }) }
          </div>
        : null
      }

      {
        statPage === true
        ? <Recorderboard></Recorderboard>
        : null
      }

      {
        teamPage === true
        ? <Teamboard></Teamboard>
        : null
      }

    </div>
  );
}


function Mom(props) {
  return(
    <div className="momBox">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" className="imgBox" src={"./" + props.이달의선수.img + ".jpg"} />
        <Card.Body>
          <Card.Title>{props.이달의선수.title}</Card.Title>
          <Card.Text>
            (선수 이름)
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link href="#">{props.이달의선수.goal}</Card.Link>
          <Card.Link href="#">{props.이달의선수.assist}</Card.Link>
        </Card.Body>
      </Card>
    </div>
  )
}


function Recorderboard(props) {
  const [x좌표, x좌표변경] = useState(0);
  const [y좌표, y좌표변경] = useState(0);
  const [target, target변경] = useState(false);
  const [back창, back창변경] = useState(false);
  const [stat창, stat창변경] = useState(false);
  const [stat박스, stat박스변경] = useState(false);
  const [close, close변경] = useState(false);
  const [선수, 선수변경] = useState(Player);
  const [stat, stat변경] = useState(Stat);
 

  return(
        <div>
          <div className="mainContainer">
            <div className="mainImgBox">
              <img src="./축구장.png" className="mainImg" 
                onClick={(e)=>{
                x좌표변경(e.nativeEvent.offsetX);
                y좌표변경(e.nativeEvent.offsetY);

                target변경(true);
                back창변경(true);
                stat창변경(true);
                close변경(true);

              }}>
              </img>
            </div>

            {
              target === true
              ? <Target x좌표={x좌표} y좌표={y좌표} target변경={target변경}/>
              : null
            }

            
            {
              back창 === true
              ? <BackBoard stat창변경={stat창변경} stat박스변경={stat박스변경} back창변경={back창변경}/>
              : null
            }

            {
              stat창 === true
              ? <PlayerBoard stat창변경={stat창변경} stat박스변경={stat박스변경} 선수={선수} back창변경={back창변경}/>
              : null
            }

            {
              stat박스 === true
              ? <StatBoard stat박스={stat박스} stat박스변경={stat박스변경} stat={stat} back창변경={back창변경} close변경={close변경}/>
              : null
            }

            {
              close === true
              ? <CloseBox stat창변경={stat창변경} stat박스변경={stat박스변경} back창변경={back창변경} close변경={close변경}/>
              : null
            }

          </div>
        </div>
  )
}


function Target(props) {
  return (
    <div className="target" style={{marginTop: props.y좌표-15+"px", marginLeft: props.x좌표-15+"px"}}></div>
  )
}


function BackBoard(props) {
  return (
    <div className="statContainer">
      <div className="statBack"></div>
    </div>
  )
}


function PlayerBoard(props) {
  return (
    <div className="statContainer">
      { props.선수.map(function(a, i){
        return (
          <div className="playerBox" onClick={(e)=>{
            props.stat창변경(false);
            props.stat박스변경(true);
          }}><p>{ props.선수[i].name }</p></div>
        )
      }) }
    </div>
  )
}


function StatBoard(props) {
  return (
    <div className="statContainer">
      { props.stat.map(function(a, i){
        return (
          <div className="statBox" onClick={(e)=>{
            props.stat박스변경(false);
            props.back창변경(false);
            props.close변경(false);
          }}><p>{ props.stat[i].stat }</p></div>
        )
      }) }
    </div>
  )
}


function CloseBox(props) {
  return (
    <div>
      <div className="closeBox" onClick={(e)=>{
        props.back창변경(false);
        props.stat박스변경(false);
        props.stat창변경(false);
        props.close변경(false);
      }}>X</div>
    </div>
  )

}


function Teamboard() {
  return (
    <div>
      <div>{}팀 명</div>
    </div>
  )
}


export default App;
