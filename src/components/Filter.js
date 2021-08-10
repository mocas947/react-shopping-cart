import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} raspoloživih artikala</div>
                <div className="filter-sort">
                    Redosled{" "}
                    <select 
                        value={this.props.sort} 
                        onChange={ (e) => 
                            this.props.sortProducts (
                                this.props.filteredProducts,
                                e.target.value
                            )
                        }
                    >
                        <option value="latest">Novo</option>
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
        );
    }
}
