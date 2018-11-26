# Creating a theme

* [Before you proceed](#before-you-proceed)
* [Using the script](#using-the-script)
* [Manually creating a theme](#manually-creating-a-theme)
* [Customizing your theme's JavaScript](#customizing-your-themes-javascript)
  * [Web profile object](#web-profile-object)
  * [Profile object](#profile-object)
  * [Section object](#section-object)
    * [`style`](#style)
    * [`heading`](#heading)
  * [Contents object](#contents-object)
    * [`text`](#text)
    * [`records`](#records)
    * [`groups`](#groups)
* [Creating a preview image](#creating-a-preview-image)
* [Handling errors](#handling-errors)

## Before you proceed

Review the [CSS classes leveraged by the default theme](styling.md#css-class-names). The CSS asset from that project works in conjunction with these classes to ensure styles defined inside the report template are honored in the web profile.

Use of these classes is **strongly encouraged for all themes**, and required for themes which will be contributed back to this project.

## Using the script

The easiest way to create a new theme is to use `npm run create-theme` from the command line to help generate the required files.

The script will prompt you for the following:

- `Theme ID`: a unique alphanumeric identifier for the theme; cannot match an existing theme name
- `Display Name`: a human-readable name for the theme
- `Intended for distribution`: `true` or `false`; `true` if the new theme will be contributed back to this project; `false` otherwise

The script will then create a new directory inside `themes` matching the theme ID provided. This directory will contain:

- An empty CSS file
- A stubbed JavaScript file
- An empty `README.md`
- A pre-populated `package.json`, if the theme is intended for distribution.

## Manually creating a theme

Before you proceed, decide the following for the new theme:

- `Theme ID`: a unique alphanumeric identifier for the theme; cannot match an existing theme ID. The only theme ID not present in this project is `default`.
- `Display Name`: a human-readable name for the theme
- Will the new theme be contributed back to this project?

To manually create a new theme:

1. Create a subdirectory beneath `themes`, using your theme ID as the directory name
2. Copy the `template` files over to your new theme directory.
    - If you do not intend to contribute the theme back to this project, `package.json` can be skipped
3. Inside your new theme directory, rename the files:
    - `theme.js` -> `{{THEME_ID}}.js`
    - `theme.css` -> `{{THEME_ID}}.css`
4. Inside the files in your new themes directory, replace all occurrences of the following:
    - `{{THEME_ID}}` -> replace with your theme's ID
    - `{{DISPLAY_NAME}}` -> replace with the human-readable name for your theme

## Customizing your theme's JavaScript

The JavaScript asset should attach a method to the `window.dmWebProfiles.themes` object. The method name should be the theme ID (e.g. for "tabbed", `window.dmWebProfiles.themes.tabbed = function() { ... }`).

### Web profile object

The attached method should accept a web profile object, and return a single DOM element containing the appropriate rendering. The given object includes the following (more details on each section below):

Key | Type | Description
--- | --- | ---
`loading` | Object | Contains message to display while web profile is loading |
`profile` | Object | The web profile data, based on the report template and using the specified user's data |
`error` | Object | Contains information about any errors that occurred while generating the web profile |
`render` | Function | Convenience function for rendering the object. Will automatically perform the correct rendering based on status |
`renderError` | Function | Convenience function for displaying a custom error message. Useful when a theme needs to do additional validation on the profile following initial render by `dm-web-profiles`. |

```javascript
{
  loading: {
    // Text of message to display while loading
    message: '',
    // Returns a single DOM element containing the message
    render: function() { ... }
  },
  profile: {
    // see Profile section below
  },
  error: {
    // Code of error returned
    code: '',
    // Standard error message text. Default used if none provided.
    message: '',
    // Server response for the failed AJAX call, or `false` if none available
    response: Response || false,
    // Array of errors parsed out from the server response
    errors: [],
    // Returns a single DOM element.
    // Display always includes the `message`, followed by each item from `errors`
    render: function() { ... }
  },
  render: function() { ... },
  renderError: function() { ... }
}
```

### Profile object

The object layout mimics the layout of sections/text/activities as found in the report builder.

Each item (section/text/activity/etc.) provides a render method, returning a default representation of the item as one or more DOM elements. This can be leveraged by a template when only a subset of items require a change in rendering.

The `profile` object contains the following:

Key | Type | Description
--- | --- | ---
`sections` | Array | [Sections](#section-object) contained in the web profile |
`preambleSections` | Array *or* `false` | Array of sections above the first web profile content section heading, or `false` if none. See [section object](#section-object) for typing |
`contentSections` | Array *or* `false` | Array of web profile content sections, or `false` if none indicated on report template. Each item in array is an array of report `section`s. See [section object](#section-object) for typing |
`render` | Function | Function that renders the complete web profile. If profile includes at least one web profile content section, `renderSectionedProfile` is used; else `renderFullProfile`. |
`renderFullProfile` | Function | Renders the web profile without including extra container elements for web profile content sections |
`renderSectionedProfile` | Function | Renders the web profile, including container elements for web profile content sections |
`renderPreamble` | Function | Renders container with all report sections above the first web profile content section |
`renderContentSections` | Function | Returns single root element with each web profile content section as a child |

```javascript
{
  sections: [],
  preambleSections: [] || false,
  contentSections: [] || false,
  render: function() { ... },
  renderFullProfile: function() { ... },
  renderSectionedProfile: function() { ... },
  renderPreamble: function() { ... },
  renderContentSections: function() { ... }
}
```

### Section object

Each `section` aligns with a section inside the SSR report builder, and contains the following:

Key | Type | Description
--- | --- | ---
`render` | Function | Convenience function for rendering a single section. Returns a DOM element with children including the section's style, heading, and content. |
`id` | String | Unique ID for the section |
`classNames` | Array | Array of all class names associated with the section |
`className` | String | Space-separated string of `classNames` |
`style` | Object or `false` | Contains pertinent style information (e.g., section-level styles from the report template) otherwise `false` if no styles or styles are excluded. See [`style`](#style) for typing. |
`heading` | Object or `false` | Contains pertinent information about the section's heading otherwise `false` if no heading exists for section. See [`heading`](#heading) for typing. |
`contents` | Array | All children inside a section. Includes both text and activities children. See [Contents object](#contents-object) for typing. |

```javascript
{
  render: function() { ... }
  id: '',
  classNames: [],
  className: '',
  style: {} || false,
  heading: {} || false,
  contents: []
}
```

#### `style`

Key | Type | Description
--- | --- | ---
`className` | String | Name of class for associated styles |
`css` | Array | CSS style definition objects, containing `attribute` and `value` keys |
`cssString` | String | Valid CSS definition for the `className` and `css` styles |
`render` | Function | Convenience function for rendering a valid `style` tag containing the `cssString`. Returns a DOM element. |

```javascript
{
  className: ''
  css: [{
    // Valid CSS attribute name
    attribute: '',
    // Valid CSS value for the given `attribute`
    value: ''
  }]
  cssString: '',
  render: function() { ... }
}
```

#### `heading`

Key | Type | Description
--- | --- | ---
`classNames` | Array | All class names associated with the heading
`className` | String | Space-separated string of `classNames`
`level` | Number | Level of the heading (1 - 6)
`value` | String | Text of the heading
`render` | Function | Convenience function for rendering the heading. Returns a DOM element

```javascript
{
  classNames: []
  className: '',
  level: Number,
  value: '',
  render: function() { ... }
}
```

### Contents object

Each item in `contents` has the following:

Key | Type | Description
--- | --- | ---
`id` | String | Unique ID for the item
`parentId` | String | ID of the parent section
`classNames` | Array | Array of all class names associated with the content container
`className` | String | Space-separated string of `classNames`
`style` | Object *or* `false` | `false` if no styles or styles are excluded; else object containing pertinent style information (e.g., content-level styles from the report template). See [`style`](#style) section for typing.
`text` | Object *or* `false` | `false` if there is no text content; else object containing pertinent text information. See [`text`](#text) section for typing.
`records` | Object *or* `false` | `false` if there are no activities; else object containing pertinent activities information.  See [`records`](#records) section for typing.
`groups` | Object *or* `false` | `false` if there are no grouped activities; else object containing grouped activities.  See [`groups`](#groups) section for typing.

#### `text`

Key | Type | Description
--- | --- | ---
`classNames` | Array | Array of all class names associated with the text
`className` | String | Space-separated string of `classNames`
`value` | String | Text of the section. May include markup.
`render` | Function | Convenience function for rendering the text. Returns a DOM element.

```javascript
{
  classNames: []
  className: '',
  value: '',
  render: function() { ... }
}
```

#### `records`

Key | Type | Description
--- | --- | ---
`classNames` | Array | Array of all class names associated with the text
`className` | String | Space-separated string of `classNames`
`includeStyles` | Boolean | Flag for determining if styles from report template should be included (affects default rendering)
`values` | Array | Array of records, where each item contains an object with `id` and `value` keys
`render` | Function | Convenience method for rendering the activities. Returns a DOM element

```javascript
{
  classNames: []
  className: '',
  includeStyles: true || false,
  values: [{
    // Unique identifier for the record
    id: '',
    // Fully rendered citation for the record
    value: ''
  }],
  render: function() { ... }
}
```

#### `groups`

Key | Type | Description
--- | --- | ---
`containerClass` | String | Class name for the group container element
`itemClass` | String | Class name for each grouped item's container element
`includeStyles` | Boolean | Flag for determining if styles from report template should be included (affects default rendering)
`values` | Array | Array of groups, where each group contains an object with [`heading`](#heading) and [`records`](#records) keys
`render` | Function | Convenience method for rendering the grouped activities. Returns a DOM element.

```javascript
{
  classNames: []
  className: '',
  includeStyles: true || false,
  values: [{
    heading: {},
    records: {}
  }],
  render: function() { ... }
}
```

## Creating a preview image

A preview image is required for all themes contributed to this project.

The preview image must be:
* PNG format (*.png)
* 575x772 pixels

To create a preview image:

1. Finalize all changes for the theme
2. Add the following to your theme's CSS:
    ```css
    #dm-web-profile-root {
      filter: blur(3.5px);
    }
    ```
3. Start your local server, and preview your theme
4. Resize your browser window, and capture a screenshot. Ensure image complies with above specifications.
5. Rename the image to be `themeId.png`, and place it inside your theme's directory
6. Remove the CSS added above from your theme

## Handling errors

A generic error message is provided for any errors returned by the web profiles API endpoint. If you would like to customize error handling with more specific messages, the table below lists error codes returned from the endpoint. Most errors stem from how the profile is invoked using the [`showProfile` method in the code snippet](cms-usage.md#showprofile-function).

Code | Message               | Note
---- | --------------------- | ----
4605 | `UNKNOWN_ERROR_CODE`  | ¯\\\_(ツ)\_/¯
5001 | `NO_AUTH_TOKEN`       | Authorization for the endpoint is missing
5002 | `USER_NOT_FOUND`      | The specified username cannot be found in the system
5003 | `REPORT_NOT_FOUND`    | The specified report ID does not exist
5004 | `REPORT_NOT_PROFILE`  | The specified report ID is not enabled for web profiles. Contact your Digital Measures admin for information on resolving this issue.
5005 | `NO_TRACK_ACTIVITIES` | The specified username does not have "Track Activities" enabled. Contact your Digital Measures admin for information on resolving this issue.
