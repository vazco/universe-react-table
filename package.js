Package.describe({
  name: 'universe:react-table',
  version: '0.1.5',
  // Brief, one-line summary of the package.
  summary: 'A simple data tables, which allows you to show tabular data, and provides sorting, filtering',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/vazco/universe-react-table',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use(['ecmascript']);

  // api.addFiles('reactable/lib/extract_data_from.jsx');
  // api.addFiles('reactable/lib/filter_props_from.jsx');
  // api.addFiles('reactable/lib/is_react_component.jsx');
  // api.addFiles('reactable/lib/stringable.jsx');
  // api.addFiles('reactable/lib/to_array.jsx');
  //
  // api.addFiles('reactable/filterer.jsx');
  // api.addFiles('reactable/paginator.jsx');
  // api.addFiles('reactable/sort.jsx');
  // api.addFiles('reactable/table.jsx');
  // api.addFiles('reactable/td.jsx');
  // api.addFiles('reactable/tfoot.jsx');
  // api.addFiles('reactable/th.jsx');
  // api.addFiles('reactable/thead.jsx');
  // api.addFiles('reactable/tr.jsx');
  // api.addFiles('reactable/unsafe.jsx');
  //
  // api.addFiles('index.jsx');
  api.mainModule('index.jsx');

});
