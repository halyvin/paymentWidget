(function (window) {
	'use strict';

	let store = {
		price: '$300.00',
		countryCode: {
			value: '',
			validation: null,
			loading: false
		},
		paymentMethods: [],
		checkedMethod: null,
		cardNumber: {
			value: '',
			validation: null
		},
		expirationsDateMonth: {
			value: '',
			validation: null
		},
		expirationsDateYear: {
			value: '',
			validation: null
		},
		CVV: {
			value: '',
			validation: null
		},
		email: {
			value: '',
			validation: null
		},
		loading: false,
		success: false,
		popup: false
	};

	store = new Proxy(store, {
		set(target, prop, value) {
			target[prop] = value;

			const allComponenetsNames = Object.keys(window.initedComponents);

			allComponenetsNames.forEach(name => {
				const neededStore = window.initedComponents[name].rerenderProps || [];

				if(~neededStore.indexOf(prop)) window.rerenderComponent(name);
			});

			return true;
		}
	});


	window.store = store;
})(window);