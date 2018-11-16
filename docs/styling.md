# Web Profile Styling via CSS

The `includeStyles` flag will allow some styling defined in the report builder to be applied to the web profile. This flag affects the types of elements generated for each section. However, class names will be consistent regardless of this flag.

## CSS class names

| Class Name                            | Description |
| ------------------------------------- | ---- |
| `dm-profile-loading`                  | Contains the loading message displayed while retrieving and generating a web profile |
| `dm-profile-error`                    | Contains errors encountered when attempting to generate a web profile |
| `dm-profile`                          | Root element containing rendered profile |
| `dm-profile-preamble`                 | When web profile content sections are indicated inside the report builder, all items above the first web profile content section will appear inside this container at the start of the profile |
| `dm-profile-sections`                 | Container with all web profile content sections |
| `dm-profile-section`                  | Container for an individual web profile content section |
| `dm-profile-report-section`           | Corresponds with a single report section, as defined inside the report builder |
| `dm-profile-heading`                  | The heading for a section, or the group heading for a set of activities with grouping applied inside the builder |
| `dm-profile-heading--level-{{level}}` | Class for a specific heading level, where `{{level}}` is a numeric value, 1-6. The heading level will always be in sync with the tag name |
| `dm-profile-contents`                 | Element containing all child contents (text/activities) of a section |
| `dm-profile-content`                  | Element containing all children for a specific content (text/activities) |
| `dm-profile-text`                     | Element containing the content of text added via the report builder |
| `dm-profile-activities`               | Container for all activities inside a section, or all activities inside a specific group when grouping is specified for an activities section via the builder |
| `dm-profile-activity`                 | Container for the display of an individual activity |
| `dm-profile-activities-group`         | Container for a grouped set of activities |
| `dm-profile-activities-group-item`    | Container for an individual group of activities. Includes the group heading and activities. |
| `dm-profile-image`                    | An image inserted into the report via an external url or from a static activities screen |
| `dm-profile-image--align-left`        | An image with left alignment selected in the report builder |
| `dm-profile-image--align-right`       | An image with right alignment selected in the report builder |
| `dm-profile-image--inline`            | An image with an inline display in the report builder. Currently only display option available. |
| `dm-profile-image--break-text`        | An image with an inline display in the report builder. Currently not available. |
