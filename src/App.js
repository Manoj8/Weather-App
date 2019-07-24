import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
    state = {
      query: '',
      info:'',
      show:false
    };

    updateinput=(query)=>{
        this.setState({query:query.trim()})
    }
    clearinput=()=>{
        this.setState({ query: '' })
    }

    disp=()=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&appid=788a2eea848fd74536ce8fb67e15d591`)
        .then((Response)=>
        {
            Response.json().then((Response)=>{
                this.setState({
                    info:Response,
                    show:true
                });
                console.log(Response);
                console.log(this.state.info);
            })
        })
        .catch((Reject)=>
        {
            this.setState({
                info:Reject,
                show:true
            });
            console.log(this.state.info)
        })
    }

    showing=()=>{
        this.setState({show:false})

    }

    render() {

      return (
        
        <div className="App">

            <h1 className="navbar">Weather App</h1>
                <input id="field" type='text' placeholder='Search Places' onChange={(event)=>{this.updateinput(event.target.value)}} onClick={this.showing}/>
                <button onClick={this.disp}>Search</button>
            {this.state.show && this.state.info.cod===200 &&
                <div> 
                    <h2>Temperature of {this.state.query} is {Math.round(this.state.info.main.temp-273.15)}</h2>
                    <h2>Humidity of {this.state.query} is {this.state.info.main.humidity}</h2>
                </div>
            }

            {this.state.show && this.state.info.cod==='404' &&
                <div> 
                    <h2>{this.state.info.message}</h2>
                </div>
            }
        </div>
      );
    }
}

export default App;
