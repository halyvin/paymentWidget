(function (window) {
	'use strict';
	const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const CARD_REGEX = /^[0-9]{16}$/;
	const CVV_REGEX = /^[0-9]{3}$/;
	const MONTH_REGEX = /^(0[1-9]|1[0-2])/;
	const YEAR_REGEX = /^([0-9]{2})$/;

	function setValidationText(value, re) {
		if (!value.length) return 'required field';

		return re.test(value) ? '' : 'wrong format';
	}

	function checkFields(store, requiredFields) {
		let failed = false;

		requiredFields.forEach(field => {
			const { value, validation } = store[field];

			if (validation == null || validation) {
				failed = true;
			}
			store[field].validation = validation == null ? 'required field' : validation;
			store[field] = store[field];
		});

		return !failed;
	}

	function fakeRequest(store) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const { CVV } = store;
				if (CVV.value !== '111') return resolve();
				return reject('Try another card');
			}, 2000);
		});
	}

	// Эти экшены спасет только рекурсивная proxy
	const actions = {
		changedContryCode() {
			const { value='' } = this;

			if (value.length === 2) {
				window.store.countryCode = {
					value,
					validation: '',
					loading: true
				};

				window.api.getPaymentMethods(value || '')
					.then(response => {
						window.store.paymentMethods = JSON.parse(response);
						window.store.checkedMethod = null;

						const countryCode = window.store.countryCode;
						countryCode.loading = false;

						window.store.countryCode = countryCode;
					})
					.catch(err => {
						window.store.paymentMethods = [];
						window.store.checkedMethod = null;

						const countryCode = window.store.countryCode;
						countryCode.validation = 'try another code';
						countryCode.loading = false;

						window.store.countryCode = countryCode;
					});
			} else {
				window.store.countryCode = {
					value,
					validation: '',
					loading: false
				};
			}
		},

		checkMethod(name) {
			window.store.checkedMethod = name;
		},

		togglePopup() {
			if (!window.store.popup) {
				const allFieldsValid = checkFields(window.store, ['countryCode', 'email', 'cardNumber', 'expirationsDateMonth', 'expirationsDateYear', 'CVV']);

				if (!allFieldsValid) return;
				if (!window.store.checkedMethod) {
					window.store.popup = 'Check mayment method';
					return;
				}

				window.store.loading = true;

				fakeRequest(window.store)
					.then(() => {
						window.store.loading = false;
						window.store.success = true;
					})
					.catch(err => {
						window.store.popup = err;
						window.store.loading = false;
					});
			} else {
				window.store.popup = null;				
			}
		},

		changeEmail() {
			const { value='' } = this;
			window.store.email = {
				value,
				validation: setValidationText(value , EMAIL_REGEX)
			};
		},

		changeCardNumber() {
			const { value='' } = this;
			window.store.cardNumber = {
				value,
				validation: setValidationText(value, CARD_REGEX)
			};
		},

		changeExpirationsDateMonth() {
			const { value='' } = this;
			window.store.expirationsDateMonth = {
				value,
				validation: setValidationText(value, MONTH_REGEX)
			};
		},

		changeExpirationsDateYear() {
			const { value='' } = this;
			window.store.expirationsDateYear = {
				value,
				validation: setValidationText(value, YEAR_REGEX)
			};
		},

		changeCVV() {
			const { value='' } = this;
			window.store.CVV = {
				value,
				validation: setValidationText(value , CVV_REGEX)
			};
		},

		toggleSuccess() {
			window.store.success = !window.store.success;
		}
	}

	window.actions = actions;
})(window);