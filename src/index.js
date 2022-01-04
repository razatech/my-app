import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

class Products extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      products:{
        Name:'',
        Model:'',
        Quantity:'',
        Price:'',
        CustomerId:''
      }
    }
  }

  changeHandler=e=>{
    const name = e.target.name;
    const value = e.target.value;

    this.setState({products:{
      ...this.state.products,
      [name]:value
     }});
  }
  
  onCreateProducts=()=>{
    console.log(this.state.products);
        // creates entity
        fetch("https://localhost:7047/api/CustomersApi/Post", {
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*", 
            "Access-Control-Allow-Headers":"X-Requested-With"
          },
          "body": JSON.stringify({
            Name: this.state.products.Name,
            Model: this.state.products.Model,
            Quantity: this.state.products.Quantity,
            Price: this.state.products.Price,
            CustomerId: this.state.products.CustomerId
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err);
        });
  }

  render(){
    <Provider store={store}>
    <App />
  </Provider>
    return(
      <Container>
        <Row className="justify-content-md-center">
        <Col md="auto">
      <div>
        <h2>Product Form</h2>
        <form>
          <p>
            <label className='label-control'>Product Name: <input className='form-control' type="text" name="Name" value={this.state.Name} onChange={this.changeHandler}></input></label>
          </p>
          <p>
            <label className='label-control'>Product Model: <input type="text" className='form-control' name="Model" value={this.state.Model} onChange={this.changeHandler}></input></label>
          </p>
          <p>
            <label className='label-control'>Product Quantity: <input type="text" className='form-control' name="Quantity" value={this.state.Quantity} onChange={this.changeHandler}></input></label>
          </p>
          <p>
            <label className='label-control'>Product Price: <input type="text" name="Price" className='form-control' value={this.state.Price} onChange={this.changeHandler}></input></label>
          </p>
          <p>
              <label className='label-control'>Customer: 
                <select name="CustomerId" className='form-control' onChange={this.changeHandler}>
                  <option value="1">Test1</option>
                  <option value="2">Test2</option>
                </select>
              </label>
          </p>
         
        </form>
        <p>
            <Button onClick={this.onCreateProducts}>Create</Button>
        </p>
      </div>
      </Col>
      </Row>
      </Container>
    )
  }
}
const element = <Products></Products>
ReactDOM.render(element, document.getElementById("root"));