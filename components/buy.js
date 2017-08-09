(function (window) {
	'use strict';

	class Buy {

		get rerenderProps() {
			return ['loading'];
		}

		view(state) {
			const { loading=false } = state;

			return `
				<div class="buy wrap">
					<button class="buy__button" onclick="window.actions.togglePopup()">
						${loading ? '<div class="spinner"></div>' : 'Buy'}
					</buttom>
				</div>
			`
		}
	}

	// Export to window
	window.components = window.components || {};
	window.components.Buy = Buy;
})(window);