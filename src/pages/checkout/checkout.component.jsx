import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selector';
import CheckOutItem from '../../components/checkout-item/checkout-item.component';
import {Link} from "react-router-dom";
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total }) => (
	<div className="checkout-page">
		<div className="checkout-header">
			<div className="header-bloack">
				<span>Prooduct</span>
			</div>
			<div className="header-bloack">
				<span>Description</span>
			</div>
			<div className="header-bloack">
				<span>Quantity</span>
			</div>
			<div className="header-bloack">
				<span>Price</span>
			</div>
			<div className="header-bloack">
				<span>Remove</span>
			</div>
		</div>
		{cartItems.map((cartItem) => <CheckOutItem key={cartItem.id} cartItem={cartItem} />)}
		<div className="total">
			<span>TOTAL:${total}</span>
		</div>

		{/*<div className="test-warning">
			*Please use the following test credit cart for payments
			<br />
			4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
		</div>

		<StripeCheckoutButton price={total} />*/}

		<Link className='link' to="/map">Find Local Pickup Point</Link>

	</div>
);

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
