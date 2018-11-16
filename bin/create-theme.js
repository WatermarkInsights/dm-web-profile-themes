#!/usr/bin/env node

/**
 * Copyright (c) 2018, Watermark
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const prompt = require('prompt');
const path = require('path');
const fs = require('fs-extra');
const replace = require('replace-in-file');

const THEMES_DIR = path.resolve(__dirname, '../themes');
const TEMPLATE_DIR = path.resolve(__dirname, '../template');
const FILE = {
	PACKAGE_JSON: 'package.json',
	README: 'README.md'
};
const TEMPLATE_FILE = {
	PACKAGE_JSON: path.resolve(TEMPLATE_DIR, FILE.PACKAGE_JSON),
	README: path.resolve(TEMPLATE_DIR, FILE.README),
	CSS: path.resolve(TEMPLATE_DIR, 'theme.css'),
	JS: path.resolve(TEMPLATE_DIR, 'theme.js')
};

prompt.start();

const PROPERTY_SCHEMA = {
	properties: {
		themeId: {
			description: 'Enter unique theme id',
			type: 'string',
			pattern: /^(?!default)[a-zA-Z0-9_-]+$/g,
			message:
				'Theme id must contain only numbers, letters, underscores (_), or dashes (-), and not match an existing theme id',
			required: true
		},
		themeName: {
			description: 'Enter a theme display name',
			type: 'string',
			pattern: /^[a-zA-Z0-9_-\s]+$/g,
			message:
				'Theme id must contain only numbers, letters, underscores (_), dashes (-), or spaces ( )',
			required: true
		},
		isDistributed: {
			description:
				'Is this theme being developed for use by all clients of Web Profiles by Digital Measures by Watermark (true/false)?',
			type: 'boolean',
			required: true
		}
	}
};

function gatherThemeOpts() {
	return new Promise((resolve, reject) => {
		prompt.get(PROPERTY_SCHEMA, (error, result) => {
			if (error) {
				reject('Failed to gather theme info from user prompts');
			}

			var destinationDirectory = path.resolve(THEMES_DIR, result.themeId);
			fs.pathExists(destinationDirectory, (err, exists) => {
				if (err) {
					reject('Could not determine if theme exists');
				}
				if (exists) {
					reject(
						`Destination for "${
							result.themeId
						}" theme already exists - ${destinationDirectory}`
					);
				} else {
					resolve(result);
				}
			});
		});
	});
}

function createThemeFiles(themeOpts) {
	return new Promise((resolve, reject) => {
		var destinationDir = path.resolve(THEMES_DIR, themeOpts.themeId);
		var movedCount = 0;
		var filesToMove = themeOpts.isDistributed ? 4 : 3;

		fs.pathExists(
			destinationDir,
			(destinationDirError, destinationDirExists) => {
				if (destinationDirError) {
					reject(destinationDirError);
				}
				if (destinationDirExists) {
					reject(
						`Non-unique theme id ${
							themeOpts.themeId
						} provided; theme directory already exists.`
					);
				}

				var destinationReadMe = path.resolve(destinationDir, FILE.README);
				console.log(`Copying ${FILE.README}...`);
				fs.copy(TEMPLATE_FILE.README, destinationReadMe, readMeError => {
					if (readMeError) {
						reject(
							`Failed to copy file from ${
								TEMPLATE_FILE.README
							} to ${destinationReadMe}`
						);
					}
					console.log(`Successfully copied ${FILE.README}...`);
					movedCount++;
					if (movedCount === filesToMove) {
						resolve();
					}
				});

				var destinationCssFile = `${themeOpts.themeId}.css`;
				var destinationCss = path.resolve(destinationDir, destinationCssFile);
				console.log(`Copying ${destinationCssFile}...`);
				fs.copy(TEMPLATE_FILE.CSS, destinationCss, cssError => {
					if (cssError) {
						reject(
							`Failed to copy file from ${
								TEMPLATE_FILE.CSS
							} to ${destinationCss}`
						);
					}
					console.log(`Successfully copied ${destinationCssFile}`);
					movedCount++;
					if (movedCount === filesToMove) {
						resolve();
					}
				});

				var destinationJsFile = `${themeOpts.themeId}.js`;
				var destinationJs = path.resolve(destinationDir, destinationJsFile);
				console.log(`Copying ${destinationJsFile}...`);
				fs.copy(TEMPLATE_FILE.JS, destinationJs, jsError => {
					if (jsError) {
						reject(
							`Failed to copy file from ${TEMPLATE_FILE.JS} to ${destinationJs}`
						);
					}
					console.log(`Successfully copied ${destinationJsFile}`);

					var replaceOpts = {
						files: destinationJs,
						from: /{{THEME_ID}}/g,
						to: themeOpts.themeId
					};
					console.log(`Updating ${destinationJsFile}...`);
					replace(replaceOpts, (error, changes) => {
						if (error || (!changes || changes.indexOf(destinationJs) === -1)) {
							reject(
								`Failed to update ${destinationJsFile} with specified values.`
							);
						}
						console.log(
							`Successfully updated ${destinationJsFile} with specified values`
						);

						movedCount++;
						if (movedCount === filesToMove) {
							resolve();
						}
					});
				});

				if (themeOpts.isDistributed) {
					var destinationPackageJson = path.resolve(
						destinationDir,
						FILE.PACKAGE_JSON
					);
					console.log(`Copying ${FILE.PACKAGE_JSON}...`);
					fs.copy(
						TEMPLATE_FILE.PACKAGE_JSON,
						destinationPackageJson,
						jsError => {
							if (jsError) {
								reject(
									`Failed to copy file from ${
										TEMPLATE_FILE.PACKAGE_JSON
									} to ${destinationPackageJson}`
								);
							}
							console.log(`Successfully copied ${FILE.PACKAGE_JSON}`);

							var replaceOpts = {
								files: destinationPackageJson,
								from: [/{{THEME_ID}}/g, /{{DISPLAY_NAME}}/g],
								to: [themeOpts.themeId, themeOpts.themeName]
							};
							console.log(`Updating ${FILE.PACKAGE_JSON}...`);
							replace(replaceOpts, (error, changes) => {
								if (
									error ||
									(!changes || changes.indexOf(destinationPackageJson) === -1)
								) {
									reject(
										`Failed to update ${
											FILE.PACKAGE_JSON
										} with specified values.`
									);
								}
								console.log(
									`Successfully updated ${
										FILE.PACKAGE_JSON
									} with specified values`
								);

								movedCount++;
								if (movedCount === filesToMove) {
									resolve();
								}
							});
						}
					);
				}
			}
		);
	});
}

gatherThemeOpts().then(
	themeOpts => {
		createThemeFiles(themeOpts).then(
			() => {
				console.log(`Successfully created new theme ${themeOpts.themeId}`);
			},
			themeError => {
				console.log('Could not create theme file');
				console.log(themeError);
			}
		);
	},
	themeError => {
		console.log('Could not create theme with given options');
		console.log(themeError);
	}
);
