import React, { Component } from 'react'
import { connect } from 'react-redux';

import { filterProducts, sortProducts } from '../actions/productActions';

 class Filter extends Component {
    render() {
        return (
            !this.props.filteredProducts ? (
            <div>Loading...</div>
            ) : (
            <div className="filter">
                <div className="filter-result">
                    {this.props.filteredProducts.length} artikal/kla/kala
                    </div>
                <div className="filter-sort">
                    Redosled{" "}
                    <select 
                        value={this.props.sort} 
                        onChange={ (e) => 
                            this.props.sortProducts (
                                this.props.filteredProducts,
                                e.target.value  // entered by user
                            )
                        }
                    >
                        <option value="latest">Novije</option>
                        <option value="lowest">Jeftinije</option>
                        <option value="highest">Skuplje</option>
                    </select>
                </div>
                <div className="filter-size">
                    Filter{" "}
                    <select 
                        value={this.props.size} 
                        onChange={(e) => 
                            this.props.filterProducts(this.props.products, e.target.value)
                        }
                    >
                        <option value="">Sve veličine</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>

                </div>

            </div>
        ));
    }
}

export default connect((state) => ({
// first parameter of connect formating the state to props
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,

}), 
    { // second, formating the actions
        filterProducts,
        sortProducts,
    }
)(Filter);
