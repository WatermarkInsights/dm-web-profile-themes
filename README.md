# Themes for Web Profiles powered by Digital Measures

This is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) of themes for Digital Measures' Web Profiles product. Use of these themes **requires a subscription to Digital Measures by Watermark and Web Profiles**. This repo is mainly intended [for developers at client universities](#for-developers) intending to customize or create a theme for web profiles. There is also [helpful information for client admins](#for-client-admins) on how to generate and use the snippet required to show web profiles on your institution's website.

A theme can be used to alter the rendering of and add style to a web profile. **If you only need to alter the styling but not the rendering**, consider leveraging the [CSS class names provided by the default theme](docs/styling.md#css-class-names), or one of the custom themes provided here. To view the class names provided by custom themes, see each individual theme's `README`.

## Provided Themes

### Tabbed

The [Tabbed theme](themes/tabbed/README.md) lays out individual sections of a web profile into separate tabs, which also easier organization and navigation of the content in the profile. You can also create a preamble section that is always visible, ideal for displaying a photo and biography of a faculty member.

[See a live preview of the tabbed theme at our demo site](https://youru.digitalmeasures.com/faculty-directory/web-profile/?username=educationf).

## For Client Admins

Information on how to generate the web profiles snippet and use in a Content Management System (CMS) such as Wordpress or Drupal can be found in the [CMS Usage documentation](docs/cms-usage.md).

## For Developers

### Local Development

For details on how to set up a local environment for theme development, see the [Setting up a local copy](CONTRIBUTING.md#setting-up-a-local-copy) section of the Contributing guide.

### Creating a theme

See the [Creating a Theme documentation](docs/creating-a-theme.md).

## Browser support

Themes are tested against **recent versions of modern browsers and IE 11**. While we do not test older browsers, we use syntax, language features, and APIs that are supported by IE 9 and greater.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Themes for Web Profiles by Digital Measures is [MIT licensed](LICENSE).
