import React from 'react';
import ReactDOM from 'react-dom';



class Calculate extends React.Component {
    constructor(props){
        super(props);
        // this.iV = document.getElementById('initial-volume');
        // this.fG = document.getElementById('final-gravity');
        // this.iP = document.getElementById('initial-input');
        // this.fP = document.getElementById('final-input');

        this.state = {
            initialValue: '',
            finalValue: '',
            potential: '',
            final: ''
        }
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    calculator(iG,fG){
        let finalGravity = (iG - fG) * 131.25;
        let potentialVolume = {
            '1.000': 0.0,
            '1.005': 0.0,
            '1.010': 0.9,
            '1.015': 1.6,
            '1.020': 2.3,
            '1.025': 3.0,
            '1.030': 3.5,
            '1.035': 4.0,
            '1.040': 4.9,
            '1.045': 5.3,
            '1.050': 6.1,
            '1.055': 6.9,
            '1.060': 7.5,
            '1.065': 8.1,
            '1.070': 8.9,
            '1.075': 9.4,
            '1.080': 10.2,
            '1.085': 10.9,
            '1.090': 11.5,
            '1.095': 12.2,
            '1.100': 13.0,
            '1.105': 13.7,
            '1.110': 14.2,
            '1.115': 15.0,
            '1.120': 15.7,
            '1.125': 16.2,
            '1.130': 17.1,
            '1.135': 17.8,
            '1.140': 18.4,
            '1.145': 19.0,
            '1.150': 19.9
        }
        
        return [potentialVolume[iG], finalGravity];
    }

    handleSubmit(event){
        let initial = this.state.initialValue;
        let final = this.state.finalValue;
        let measurements = this.calculator(initial,final);
        this.setState({
            initialValue: this.state.initialValue,
            finalValue: this.state.finalValue,
            potential: measurements[0],
            final: measurements[1]
        })
        event.preventDefault();
    }
    handleChange1(event){
        this.setState({
            initialValue: event.target.value,
            finalValue: this.state.finalValue,
            initial: this.state.initial,
            final: this.state.final
        })
    }
    handleChange2(event){
        this.setState({
            initialValue: this.state.initialValue,
            finalValue: event.target.value,
            initial: this.state.initial,
            final: this.state.final
        })
    }
    
    render(){
        return (
            <div className="inner-main">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-section">
                        <label for="initial">Initial Gravity Measurement: </label><br></br>
                        <input name="initial" type="text" placeholder='in increments of 0.005'value={this.state.initialValue} onChange={this.handleChange1}></input><br></br>
                    </div>
                    <div className="form-section">
                        <label for="final">Final Gravity Measurement: </label><br></br>
                        <input name="final" type="text" value={this.state.finalValue} onChange={this.handleChange2}></input><br></br>
                    </div>
                    <button className="calculate-button" type="submit" value="Submit" onClick={this.clickHandler}>Calculate!</button>
                </form>
                <h3 id="initial-volume">Potential Gravity (before fermentation): </h3>
                <p>{this.state.potential}</p>
                <h3 id="final-gravity">Final Gravity (after fermentation): </h3>
                <p>{this.state.final}</p>
            </div>
        );
    };
}


export default Calculate;