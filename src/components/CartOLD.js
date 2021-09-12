import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            email:"",
            address:"",
            showCheckout: false };
    }
    //method function
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartitems,
        };
        this.props.createOrder(order);
    };
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    };
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
                    <Fade left cascade>
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
                    </Fade>
                </div>
                {cartItems.length!==0 && (    // if cart.Items not = 0 then
                    <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                Ukupno: {" "}
                                {formatCurrency(
                                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                )}
                            </div>
                            <button 
                                onClick={()=>{
                                    this.setState({showCheckout: true});
                                }} 
                               
                                className="button primary"
                            >
                                Zaključi
                            </button>
                        </div>
                    </div>
                    {this.state.showCheckout && (
                        <Fade right cascade>
                        <div className="cart">
                            <form onSubmit={this.createOrder}>
                                <ul clčassName="form-container">
                                    <li>
                                        <label>Email</label>
                                        <br/>
                                        <input
                                            name="email" 
                                            type="email"
                                            required
                                            onChang={this.handleInput}
                                        ></input>
                                    </li>
                                    <li>
                                        <label>Ime i prezime</label>
                                        <input
                                            name="name" 
                                            type="text"
                                            required
                                            onChang={this.handleInput}
                                        ></input>
                                    </li>
                                    <li>
                                        <label>Adresa</label>
                                        <br/>
                                        <input
                                            name="address" 
                                            type="text"
                                            required
                                            onChang={this.handleInput}
                                        ></input>
                                    </li>
                                    <br />
                                    <li>
                                        <button className="button primary" type="submit">
                                               Naruči   
                                        </button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        </Fade>
                    )}
                </div>
                )}
            </div>    
            </div>
        );
    }
}
