# Using Web Profiles in a Content Management System (CMS)

Using Web Profiles requires both a subscription to Digital Measures by Watermark and Faculty Web Profiles.

## Generating the snippet

In Digital Measures, go to **Reports** and select or create a new Self-Service Report (SSR). The web profile snippet generator is under **Options**.

The snippet will include the following parts:
* **JavaScript:** includes both a JS script file, as well as a separate JS script tag for executing the function to display a single web profile. Typically, this should be added to your page (or theme's) header
* **Styles:** includes standard styles for the web profile in addition to the theme's style. Typically, this should be added to your page (or theme's) header
* **HTML container element:** element where a single user's web profile will be rendered. Typically, this should be added to your page's body / content area. Note you can provide your own query selector instead of relying on the default element here. [See options below for `showProfile`](#options).

## Using the snippet

Place the provided `<link>`, `<script>`, and `<div>` elements into your pages or templates as appropriate for your chosen CMS.

## `showProfile` function

To render a web profile, `window.dmWebProfiles.showProfile` must be used. Here is an example of what that might look like:

```javascript
window.dmWebProfiles.showProfile({
  container: '#dm-web-profile-root',
  clientId: 'a0454dad-c52f-426f-8f45-f0e487f95444',
  reportId: 'f8a61015-dcb7-42a3-a4dd-570c197a9524',
  username: 'afuger',
  theme: 'tabbed'
});
```

### Options

You can alter the rendering of the web profile by passing various options to `showProfile`. If an option is not provided, it may be resolved via a query parameter using the name as the key. When both are provided, the query param is silently ignored.

| Key | Query Param Fallback? | Required | Default | Notes |
| ---- | ---- | ---- | ---- | ---- |
| `apiUrl`         | No   | No   | - | Location of the web profile's back-end entry point. When present, the `environment` will be ignored. |
| `environment`    | No   | No   | `'production'` | Digital Measures environment from which the report's template and user's data should be retrieved (e.g., production, beta, local, etc.) |
| `clientId`       | Yes  | Yes  | - | Set up by Digital Measures when enabling web profiles via SSR |
| `reportId`       | Yes  | Yes  | - | SSR report ID |
| `userIdentifier` | Yes  | No   | `'username'` | Currently only supports username; will either be username or name of secondary user identifier |
| `user` or `{{userIdentifier}}`           | Yes  | Yes  | - | User whose profile should be displayed. Can also specify using the value of userIdentifier as the key (e.g., `userIdentifier=netId&user=1234` _or_ `userIdentifier=netId&netId=1234`) |
| `includeStyles`  | Yes  | No   | `true` | When true, styles applied to activities sections inside the report builder will also be included in the web profile output |
| `container`      | No   | No   | `'#dm-web-profile-root'` | DOM query selector for the container element in which the web profile will be rendered. Should be an empty element on the page. |
| `theme`          | No   | No   | `'default'` | A function that accepts a web profile object, and returns a rendered DOM element containing the profile. Renders full profile as single page by default. |

### Showing Multiple Profiles on a Single Page

The `showProfile` function may be called multiple times on a single page, each with a different report template. This allows easy co-mingling of data from Digital Measures by Watermark and any other disparate location that contains pertinent faculty information into a single, cohesive web profile page.

When calling the `showProfile` function multiple times, keep in mind:
* Each JS and CSS file should only be included once.
* The `container` must be different for each call to `showProfile`.
* The `reportId` should be different for each call to `showProfile`.
* The user information (`userIdentifier` and `user`) should be the same in most cases (unless you really want to show information from two different users on a single page).


