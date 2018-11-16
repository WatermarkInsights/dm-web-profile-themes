(function(profiles) {
	/**
	 * @param {webProfile} webProfile The web profile object.
	 * @returns {HTMLElement} Element containing rendered web profile
	 */
	function render(webProfile) {
		return webProfile.render();
	}

	if (!profiles) {
		throw new Error(
			'window.dmWebProfiles does not exist. Please include the dm-web-profiles javascript asset first.'
		);
	}

	if (!profiles.themes) {
		throw new Error(
			'window.dmWebProfiles.themes does not exist. Please ensure dm-web-profiles javascript asset is included.'
		);
	}

	if (profiles.themes.{{THEME_ID}}) {
		throw new Error(
			'window.dmWebProfiles.themes.{{THEME_ID}} already exists. Only one instance of dm-web-profiles allowed per page.'
		);
	} else {
		profiles.themes.{{THEME_ID}} = render;
	}
})(window.dmWebProfiles);
