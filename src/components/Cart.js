import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {
    render() {
        const {cartItems} = this.props;
        return (
            <div>
                {cartItems.length === 0 ? (
                    <div className="cart cart-header">Korpa je prazna</div>
                ) :  (
                <div className="cart cart-header">
                    Broj artikala u korpi je  {" "}{cartItems.length} 
                </div>
                )}

                <div>
                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}></img>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x { item.count } {" "}
                                        <button 
                                            className="button" 
                                            onClick={() => this.props.removeFromCart(item)}
                                        >
                                        Skloni iz korpe
                                    </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {cartItems.length!==0 && (    // if cart.Items not = 0 then
                    <div className="cart">
                    <div className="total">
                        <div>
                            Ukupno: {" "}
                            {formatCurrency(
                                cartItems.reduce((a, c) => a + c.price * c.count, 0)
                         )}
                     </div>
                   </div>
                    <button clssName="button primary">Nastavi</button>
                </div>
                )}
                
            </div>    
            </div>
            
        
        );
    }
}
