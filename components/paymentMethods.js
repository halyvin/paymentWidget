(function (window) {
	'use strict';

	class PaymentMethods {
		get rerenderProps() { 
			return ['paymentMethods'];
		}

		item({img_url='', name=''}) {
			return `<div class="paymentMethods__item" onclick="window.actions.checkMethod('${name}')">
					<input class="paymentMethods__itemCheckbox" type="radio" name="method" id="${name}">
					<label class="paymentMethods__itemLabel" for="${name}">
						<img class="paymentMethods__itemLogo" src="${img_url}" alt="${name}">
					</label>
				</div>`
		}

		renderItemsArray(paymentMethods) {
			if (!paymentMethods.length) return 'Need to choose country with payment methods';

			return paymentMethods.map(method => this.item(method)).join('');
		}

		view(state) {
			const { paymentMethods=[] } = state;

			return `
				<div class="paymentMethods">
					<h1 class="paymentMethods__title title">Paument methods</h1>

					<div class="paymentMethods__wrap wrap">
						<div class="paymentMethods__slider">
							${this.renderItemsArray(paymentMethods)}
						</div>
					</div>
				</div>
			`
		}
	}

	// Export to window
	window.components = window.components || {};
	window.components.PaymentMethods = PaymentMethods;
})(window);