import React, { Component } from 'react';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }
  //runs automatically when the component mounts
  componentDidMount() {
    //fetch call
    fetch('/api/products')
      .then(res => res.json())
      .then(products =>
        this.setState({ products: products }, () => console.log('Products fetched', products))
      );
  }
  render() {
    return (
      <div>
        <h2>Products</h2>
        <ul>
          {this.state.products.map(product => (
            <li key={product.id}>
              {product.name} {product.quantity} {product.price}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Products