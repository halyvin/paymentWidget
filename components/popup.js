(function (window) {
	'use strict';

	class Popup {
		get rerenderProps() {
			return ['popup'];
		}

		view(state) {
			const { popup } = state;

			if (!popup) return '';

			return `
				<div class="popup">
					<div class="popup__overlay" onclick="window.actions.togglePopup()"></div>
					<div class="popup__body">
						<div class="popup__text">${popup}</div>
						<button class="popup__button" onclick="window.actions.togglePopup()">OK</button>
					</div>
				</div>
			`
		}
	}

	// Export to window
	window.components = window.components || {};
	window.components.Popup = Popup;
})(window);