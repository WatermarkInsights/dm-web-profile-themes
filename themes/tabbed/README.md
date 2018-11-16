# Tabbed Theme

The tabbed theme will generate the web profile as a series of sections, each which can be displayed via activating its tab.

The tabs should be set up inside the report template using the web profile content section toggle available on the edit toolbar of section headings.

If a preamble is included, it will be placed above the tab controls as a static, non-tabbed section. Likewise, the first image included inside the preamble will be assumed to be the faculty member's profile image.

The heading of each web profile content section will be used as a tab control. The value is also usable as a hash on the URL, allowing direct linking to a specific tab. If no hash is present, then the first tab available is active.

## CSS Class Names

CSS class names used by the tabbed theme are as follows:

| Class Name                                    | Description                                                                 |
| --------------------------------------------- | --------------------------------------------------------------------------- |
| `dm-profile-section--static`                  | Static section container above tabs                                         |
| `dm-profile-section--static--inner`           | Static section container above tabs that isn't the main image section       |
| `dm-profile-section--hidden`                  | Applied to all inactive tab sections of the profile                         |
| `dm-profile-section--tabbed`                  | Applied to all tab sections                                                 |
| `dm-profile-break`                            | Applied to `hr` separating the tab controls from view of current active tab |
| `dm-profile-tabs`                             | Base container with controls for switching between tabs                     |
| `dm-profile-tabs__item`                       | Container with individual control for activating a tab                      |
| `dm-profile-tabs__item--active`               | Container of the currently active tab control                               |
| `dm-profile-tabs__link`                       | Tab activation control; used for switching between tabs                     |
| `dm-profile-section--static--with-main-image` | Parent `section` containing a main image, if used                           |
| `dm-profile-section--main-image`              | Nested section containing a main image, if used                             |
| `dm-profile-main-image`                       | Image element that is the main image                                        |

## Additional CSS Selectors

Multi-class CSS selectors used by the tabbed theme are as follows:

| Selector                                                                 | Description                                             |
| ------------------------------------------------------------------------ | ------------------------------------------------------- |
| `.dm-profile-section--static .dm-profile-heading--level-2`               | Stylized level 2 heading inside the static section      |
| `.dm-profile-section--static .dm-profile-content .dm-profile-activities` | Additional styling for activities inside static section |
| `.dm-profile-tabs__item--active .dm-profile-tabs__link::after`           | Displays icon next to active tab in mobile view         |
