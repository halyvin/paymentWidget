(function (window) {
	'use strict';

	class PaymentDitails {
		get rerenderProps() { 
			return ['email', 'cardNumber', 'expirationsDateMonth', 'expirationsDateYear', 'CVV'];
		}

		createValidation(error) {
			return `<div class="error">${error}</div>`;
		}

		isInvalid(prop) {
			return prop.validation != null && !!prop.validation;
		}

		view(state) {
			const { email={}, cardNumber={}, expirationsDateMonth={}, expirationsDateYear={}, CVV={} } = state;

			const invalidCardNumber = this.isInvalid(cardNumber);
			const invalidEmail = this.isInvalid(email);
			const invalidMonth = this.isInvalid(expirationsDateMonth);
			const invalidYear = this.isInvalid(expirationsDateYear);
			const invalidCVV = this.isInvalid(CVV);

			return `
				<div class="paymentDitails">
					<h1 class="paymentDitails__title title">Payment ditails</h1>

					<div class="paymentDitails__wrap wrap">
						
						<div class="paymentDitails__row row">
							<label class="paymentDitails__rowLabel label">E-mail</label>
							<div class="paymentDitails__rowContent content">
								<input
									class='paymentDitails__rowLabelInput input ${invalidEmail ? '_error': ''}'
									name="email"
									type="email"
									value="${email.value}"
									placeholder="john@doe.com"
									oninput="window.actions.changeEmail.call(this)">
									${invalidEmail ? this.createValidation(email.validation): ''}
							</div>
						</div>

						<div class="paymentDitails__row row">
							<label class="paymentDitails__rowLabel label">Card number</label>
							<div class="paymentDitails__rowContent content">
								<input
									class='paymentDitails__rowLabelInput input ${invalidCardNumber ? '_error': ''}'
									name="cardNumber"
									type="text"
									value="${cardNumber.value}"
									placeholder="1234567812345678"
									maxlength="16"
									oninput="window.actions.changeCardNumber.call(this)">
									${invalidCardNumber ? this.createValidation(cardNumber.validation): ''}
							</div>
						</div>

						<div class="paymentDitails__row row">
							<label class="paymentDitails__rowLabel label">Expiration date</label>
							<div class="paymentDitails__rowContent content">
								<span class="inputWrap">
									<input
										class='paymentDitails__rowLabelInput input _size_short ${invalidMonth ? '_error': ''}'
										name="expirationDate"
										value="${expirationsDateMonth.value}"
										placeholder="MM"
										type="text"
										maxlength="2"
										oninput="window.actions.changeExpirationsDateMonth.call(this)">
										${invalidMonth ? this.createValidation(expirationsDateMonth.validation): ''}
								</span>
								<span class="inputWrap">	
									<input
										class='paymentDitails__rowLabelInput input _size_short ${invalidYear ? '_error': ''}'
										name="expirationDate__second"
										value="${expirationsDateYear.value}"
										placeholder="YY"
										type="text"
										maxlength="2"
										oninput="window.actions.changeExpirationsDateYear.call(this)">
										${invalidYear ? this.createValidation(expirationsDateYear.validation): ''}
								</span>
							</div>
						</div>

						<div class="paymentDitails__row row">
							<label class="paymentDitails__rowLabel label">CVV code</label>
							<div class="paymentDitails__rowContent content">
								<input
									class='paymentDitails__rowLabelInput input _size_short ${invalidCVV ? '_error': ''}'
									name="CVV"
									value="${CVV.value}"
									placeholder="123"
									type="text"
									maxlength="3"
									oninput="window.actions.changeCVV.call(this, 'month')">
									${invalidCVV ? this.createValidation(CVV.validation): ''}
							</div>
						</div>
					</div>
				</div>
			`
		}
	}

	// Export to window
	window.components = window.components || {};
	window.components.PaymentDitails = PaymentDitails;
})(window);