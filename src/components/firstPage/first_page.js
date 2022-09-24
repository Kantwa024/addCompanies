import React, { useState } from 'react';
import './first_page.css'
import { useNavigate} from 'react-router-dom';


class FirstPage extends React.Component {
  state = {searchText: "",
          output: [],
          key: ""};

  onDropDownClick = async (key, name) => {
    await this.setState({
      searchText : name,
      key: key
    })
    console.log(this.state);
  };


  uploadOnDataBase = () => {
    const that = this;
    
    fetch("http://localhost:3001/add_companies", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": that.state.searchText,
        "cin": that.state.key
      }),
      })
      .then(function (response) {
        // The API call was successful!
        return response.text();
      }).then(function (data) {
        // This is the JSON from our response
        console.log(data);
        // const navigate = useNavigate();
        // navigate('/show_data', {replace: true});
        
      }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
      });
  };

  update = async (event) => {
    await this.setState({searchText: event.target.value});
    const that = this;
    
    if(this.state.searchText.length != 0)
    {
        fetch("/custom-search", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "search": that.state.searchText,
              "filter": "company"
            }),
        })
        .then(function (response) {
          // The API call was successful!
          return response.text();
        }).then(function (data) {
          // This is the JSON from our response
          const newData = data.split(`"`);
          const running_data = [];

          for(var i = 0; i < newData.length; i++)
          {
            var str = newData[i];
            if(str.startsWith("company"))
            {
              running_data.push({
                  'id': str.split(`/`)[2],
                  'name': str.split(`/`)[1],
              });
            }
          }

          that.setState({output: running_data});

        }).catch(function (err) {
          // There was an error
          console.warn('Something went wrong.', err);
        });
    }
    else
    {
      that.setState({output: []});
    }
    
  };

  render() {
    return (
      <div className='container' >
          <form className='d-flex align-items-center col-6' action='/show_data'>
              <input type="text" className="form-control mx-5 " id="search" placeholder="Search by name or cin" value={this.state.searchText} onChange={this.update}/>
              <button  className="btn btn-primary" onClick={this.uploadOnDataBase}>Submit</button>
          </form>
          {this.state.output.map(data => (
              <div className="custom_search" key={data.id} onClick={(event) => this.onDropDownClick(data.id, data.name)}>{data.name}</div>
          ))}
      </div>
    );
  }
  
}

export default FirstPage;