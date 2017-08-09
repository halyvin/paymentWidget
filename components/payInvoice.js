(function (window) {
	'use strict';

	class PayInvoice {
		get rerenderProps() { 
			return ['countryCode', 'price'];
		}

		view(state) {
			const { countryCode={}, price } = state;
			const { value='', validation='', loading=false } = countryCode;

			const isInvalid = validation != null && validation;

			return `
				<div class="payInvoice">
					<h1 class="payInvoice__title title">Pay invoice</h1>

					<div class="payInvoice__wrap wrap">
						<div class="payInvoice__row row">
							<label class="payInvoice__rowLabel label">Price</label>
							<div class="payInvoice__price content">${price}</div>
						</div>

						<div class="payInvoice__row row">
							<label class="payInvoice__rowLabel label">Country code</label>
							<div class="payInvoice__rowContent content">
								<input
									class="payInvoice__rowLabelInput input _size_short ${isInvalid ? '_error' : ''}"
									name="countryCode"
									placeholder="US"
									value="${value}"
									type="text"
									maxlength="2"
									oninput="window.actions.changedContryCode.call(this)">
									${isInvalid ? `<div class="error">${validation}</div>` : ''}
									${loading ? '<div class="spinner _color_blue"></div>' : ''}
							</div>
						</div>
					</div>
				</div>
			`
		}
	}

	// Export to window
	window.components = window.components || {};
	window.components.PayInvoice = PayInvoice;
})(window);