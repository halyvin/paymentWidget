(function (window) {
  'use strict';

    function rerenderComponent(component) {
        const activeElementName = document.activeElement.getAttribute('name');
    	const container = document.getElementById(component);
    	const initedComponent = window.initedComponents[component];

    	const neededStore = initedComponent.rerenderProps;
		const state = {};

		neededStore.forEach(segment => {
			state[segment] = window.store[segment];
		});

		const view = initedComponent.view(state);

		container.innerHTML = view;

        Promise.resolve().then(() => {
            const renderedElem = document.querySelector(`[name=${activeElementName}]`);

            if (renderedElem) {
                renderedElem.focus();
                renderedElem.value = renderedElem.value;
            }
        });
    }

    window.rerenderComponent = rerenderComponent;
})(window);
