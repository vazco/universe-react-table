Package.describe({
  name: 'universe:react-table',
  version: '0.1.1',
  // Brief, one-line summary of the package.
  summary: 'A simple data tables, which allows you to show tabular data, and provides sorting, filtering',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/vazco/universe-react-table',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('universe:modules@0.6.1');

  api.addFiles('reactable/lib/extract_data_from.import.jsx');
  api.addFiles('reactable/lib/filter_props_from.import.jsx');
  api.addFiles('reactable/lib/is_react_component.import.jsx');
  api.addFiles('reactable/lib/stringable.import.jsx');
  api.addFiles('reactable/lib/to_array.import.jsx');

  api.addFiles('reactable/filterer.import.jsx');
  api.addFiles('reactable/paginator.import.jsx');
  api.addFiles('reactable/sort.import.jsx');
  api.addFiles('reactable/table.import.jsx');
  api.addFiles('reactable/td.import.jsx');
  api.addFiles('reactable/tfoot.import.jsx');
  api.addFiles('reactable/th.import.jsx');
  api.addFiles('reactable/thead.import.jsx');
  api.addFiles('reactable/tr.import.jsx');
  api.addFiles('reactable/unsafe.import.jsx');

  api.addFiles('index.import.js');

});
