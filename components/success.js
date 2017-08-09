(function (window) {
	'use strict';

	class Success {
		get rerenderProps() {
			return ['email', 'price', 'success'];
		}

		view(state) {
			const { email, price, success } = state;

			if (!success) return '';

			return `
				<div class="success">
					<div class="success__overlay" onclick="window.actions.togglePopup()"></div>
					<div class="success__body">
						<h1 class="success__title title">Payment completed</h1>
						<div class="success__bodyWrap">
							<div class="success__price">${price}</div>	
							<div class="success__text">Your payment is successfully completed!</div>
							<div class="success__etc">Your receipt has been sent to ${email.value}.</div>
						</div>
						<div class="success__bodyWrap">
							<button class="success__button" onclick="window.actions.toggleSuccess()">OK</button>
						</div>
					</div>
				</div>
			`
		}
	}

	// Export to window
	window.components = window.components || {};
	window.components.Success = Success;
})(window);