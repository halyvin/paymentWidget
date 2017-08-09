(function (window) {
	'use strict';
	window.initedComponents = {};
	const componentsName = Object.keys(window.components);

	componentsName.forEach(component => {
		const container = document.getElementById(component);
		const Instant = window.components[component];
		const initedComponent = new Instant();
		const neededStore = initedComponent.rerenderProps || [];
		const state = {};

		neededStore.forEach(segment => {
			state[segment] = window.store[segment];
		})

		const view = initedComponent.view(state);

		container.innerHTML = view;

		window.initedComponents[component] = initedComponent;
	});
})(window);