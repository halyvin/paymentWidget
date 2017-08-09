(function (window) {
	'use strict';

	const api = {
		getCountry() {
			return window.doRequest('GET', '');
		},

		getPaymentMethods(countyCode) {
			return window.doRequest('GET', `https://api.paymentwall.com/api/payment-systems/?key=2c6f42e2f0bf7f443261f0f37db3265a&country_code=${countyCode}&sign_version=2`);
		}
	};

	window.api = api;
})(window);