import React, { useState } from 'react';
import './second_page.css'

class SecondPage extends React.Component {
    state = {
        datas: [],
        limit: 1,
        searchText: "",
        who: "cin",
        how: "ASC",
        cin: <span>CIN  &nbsp;  &nbsp; &uarr;</span>,
        name: <span>Name</span>
    }

    updateTableWithText = () => {
        const that = this;
        
        if(this.state.searchText.length != 0)
        {
            fetch("http://localhost:3001/search_data/" + this.state.searchText + "/" + this.state.limit + "/" + this.state.who + "/" + this.state.how)
            .then(function (response) {
              // The API call was successful!
              return response.json();
            }).then(function (data) {
              that.setState({datas: data});
            }).catch(function (err) {
              // There was an error
              console.warn('Something went wrong.', err);
            });
        }
        else
        {
          that.setState({datas: []});
          this.getData();
        }
    }

    updateText = async (event) => {
        await this.setState({searchText: event.target.value,
        limit: 1});
        this.updateTableWithText();
    };

    getData = () => {
        const that = this;

        fetch('http://localhost:3001/' + this.state.limit + "/" + this.state.who + "/" + this.state.how)
        .then(response => {
            return response.json();
        })
        .then(data => {
            that.setState({
                datas: data
            })
            console.log(data);
        });
    };

    componentDidMount() {
        this.getData();
    }

    updateLimit = async (type) => {
        console.log(type);
        if(type == -1)
        {
            if(this.state.limit > 1){
                await this.setState({
                    limit: this.state.limit - 1,
                })
                
                if(this.state.searchText.length == 0)
                {
                    this.getData(); 
                }
                else{
                    this.updateTableWithText();
                }
            }
        }

        if(type == 1)
        {
                await this.setState({
                    limit: this.state.limit + 1,
                })

                if(this.state.searchText.length == 0)
                {
                    this.getData(); 
                }
                else{
                    this.updateTableWithText();
                }
        }
        
    }

    onClickTable = async (type) => {
        if(type == -1)
        {
            if(this.state.how.localeCompare('ASC') != 0)
            {
                await this.setState({
                    cin : <span>CIN  &nbsp;  &nbsp; &uarr;</span>,
                    name: <span>Name</span>,
                    who: "cin",
                    how: "ASC",
                    limit: 1
                })
            }
            else
            {
                await this.setState({
                    cin : <span>CIN  &nbsp;  &nbsp; &darr;</span>,
                    name: <span>Name</span>,
                    who: "cin",
                    how: "DESC",
                    limit: 1
                })
            }
        }
        else
        {
            if(this.state.how.localeCompare('ASC') != 0)
            {
                await this.setState({
                    cin : <span>CIN</span>,
                    name: <span>Name  &nbsp;  &nbsp; &uarr;</span>,
                    who: "name",
                    how: "ASC",
                    limit: 1
                })
            }
            else
            {
                await this.setState({
                    cin : <span>CIN</span>,
                    name: <span>Name  &nbsp;  &nbsp; &darr;</span>,
                    who: "name",
                    how: "DESC",
                    limit: 1
                })
            }
        }

        if(this.state.searchText.length == 0)
        {
            this.getData();
        }
        else{
            this.updateTableWithText();
        }
    }

    render() {
        return (
            <div className='container'>
            
                <form className='d-flex align-items-center' action='/'>
                    <button  className="btn btn-primary col-2">Add Company</button>
                    <input type="text" className="form-control " id="search" placeholder="Search by name or cin" value={this.state.searchText} onChange={this.updateText}/>
                </form>
                <table className="table table-bordered  table-striped" id ="tables">
                    <thead>
                        <tr>
                        <th scope="col" onClick={() => this.onClickTable(-1)}>{this.state.cin}</th>
                        <th scope="col" onClick={() => this.onClickTable(1)}>{this.state.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.datas.map(val => (
                            <tr key={val.cin} >
                            <td>{val.cin}</td>
                            <td>{val.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='d-flex justify-content-end my-5' action='/'>
                    <button  className="btn btn-primary mx-2 col-1" onClick={(event) => {this.updateLimit(-1)}}>Previous</button>
                    <button  className="btn btn-primary mx-2 col-1">{this.state.limit}</button>
                    <button  className="btn btn-primary mx-2 col-1" onClick={(event) => this.updateLimit(1)}>Next</button>
                </div>
               
            </div>
        );
    }
}

export default SecondPage;
