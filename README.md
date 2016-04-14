# Universe React Table

Fast, flexible, and simple data tables.

This component allows you to display tabular data, and provides sorting,
filtering, and pagination over that data. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Clicks](#clicks)
  - [Further Customization](#further-customization)
  - [Even More Customization](#even-more-customization)
  - [Additional node types](#additional-node-types)
  - [Customizing Columns](#customizing-columns)
  - [Preventing escaping of HTML](#preventing-escaping-of-html)
  - [Pagination](#pagination)
  - [Sorting](#sorting)
  - [Filtering](#filtering)

## Installation

```sh
meteor add universe:react-table
```


## Usage
This package needs `universe:modules` package for importing

The simplest example:

```jsx
import {Table} from 'meteor/universe:react-table';
---
    <Table className="table" data={[
        { Name: 'John Vangnner', Age: 18 },
        { Age: 23,  Name: 'Lee Zalminen' },
        { Age: 32, Position: 'Developer' },
    ]} />
---
```

While pretty basic, this example demonstrates a couple things:

- Columns in the data array can be in any order, and you can omit any you like
- Regular React DOM attributes such as className will pass-through to the
  rendered `<table>`
- Data values can be any type with a `toString()` method

### Clicks
onClickRow

```jsx
import {Table} from 'meteor/universe:react-table';
---
    <Table onClickRow={(item, i, e) => console.log('clicked on row:', item, i, e);} 
        className="table"
        data={[
            { Name: 'John Vangnner', Age: 18 },
            { Age: 23,  Name: 'Lee Zalminen' },
            { Age: 32, Position: 'Developer' },
    ]} />
---
```

### Further Customization

You can also manually build up your rows using `Tr` nested in a table,
also using the `data` prop, but this time containing only one javascript object.
This approach can be freely combined with the `data` property on the `<Table>`,
and is useful if you want to specify per-row attributes such as classes, like so:

```jsx
import {Table, Tr} from 'meteor/universe:react-table';

React.renderComponent(
    <Table className="table" data={[
        { name: 'Row one', content: 'These are regular data rows' },
        { name: 'Row two', content: 'They work like above' },
    ]} >
        <Tr className="special-row"
            data={{ name: 'Other Row' , content: 'This is a different row' }} />
    </Table>,
    document.getElementById('table')
);
```

### Even More Customization

If you want to customize the rendering of individual columns, you can go a level
deeper by embedding a `Td` inside your `Tr`. These have the
required `column` property, and an optional `value` property if you want to
customize the data that's used for sorting and filtering - if the latter isn't
specified, the data used will default to the `Td`'s children.

Example:

```jsx
import {Table, Tr, Td} from 'meteor/universe:react-table';

---
    <Table className="table" id="table">
        <Tr>
            <Td column="Name" data="John Vangnner">
                <b>John Vangnner</b>
            </Td>
            <Td column="Age">18</Td>
        </Tr>
        <Tr>
            <Td column="Name">Lee Zalminen</Td>
            <Td column="Age">23</Td>
        </Tr>
        <Tr>
            <Td column="Position">Developer</Td>
            <Td column="Age">32</Td>
        </Tr>
    </Table>
---
```

### Customizing Columns

To override inferring the column list from the attributes of the passed `data`
objects, you can either:

- Pass a `columns` array property to the `<Table>` component, which can be
  either:
  - An array of strings, in which case only the given properties will be included
    as columns in the rendered table.
  - An array of objects, each of which must have a `key` and `label` property.
    The `key` property is the attribute of the row object from which to retrieve
    value, and the `label` is the text to render in the column header row.
- Define a `<Thead>` component as the **first child** of the `<Table>`, with
  `<Th>` components as children (note the exclusion of a `<Tr>` here),
  each of which should have a "column" property. The children of these `<Th>`
  components (either strings or React components themselves) will be used to
  render the table headers. For example:

```jsx
import {Table, Thead, Th, Tr, Td} from 'meteor/universe:react-table';

---
    <Table className="table" id="table">
        <Thead>
          <Th column="name">
            <strong className="name-header">First Name, Last Name</strong>
          </Th>
          <Th column="age">
            <em className="age-header">Age, years</em>
          </Th>
        </Thead>
        <Tr>
            <Td column="name" data="John Vangnner">
                <b>John Vangnner</b>
            </Td>
            <Td column="age">18</Td>
        </Tr>
        <Tr>
            <Td column="name">Lee Zalminen</Td>
            <Td column="age">23</Td>
        </Tr>
        <Tr>
            <Td column="position">Developer</Td>
            <Td column="age">32</Td>
        </Tr>
    </Table>
---
```

In this example, the `position` column will **not** be rendered.

### Additional node types

Reactable also supports specifying a `<tfoot>` for your table, via the
`Tfoot` class. Per the HTML spec, there can only be one `<Tfoot>` per
table and its only children should be React.DOM `<tr>` elements (**not**
`<Tr>` elements).

### Preventing escaping of HTML

If you don't want to go all the way down the JSX rabbit hole to render
individual cells as HTML, and you know your source data is safe, you can wrap
strings in `unsafe` to prevent their content from being escaped, like
so:

```jsx
import {Table, unsafe} from 'meteor/universe:react-table';

---
    <Table className="table" id="table" data={[
        {
            'Name': unsafe('<b>John Vangnner</b>'),
            'Github': unsafe('<a href="https://github.com/glittershark"><img src="https://d2k1ftgv7pobq7.cloudfront.net/images/services/8cab38550d1f24432facde191031d024/github.png"></a>')
        },
        {
            'Name': unsafe('<b>Jorgen Zhang</b>'),
            'Github': unsafe('<a href="https://github.com/lofiinterstate"><img src="https://d2k1ftgv7pobq7.cloudfront.net/images/services/8cab38550d1f24432facde191031d024/github.png"></a>')
        },
    ]}/>
---
```

You can also pass in `unsafe` strings as column labels or in a `<Th>`

### Pagination

You can also use pagination, by just specifying an `itemsPerPage` argument to
the `<Table>` component. Include an optional `pageButtonLimit` argument to
customize the number of page buttons in the pagination, which defaults to 10.
For example:

```jsx
<Table className="table" data={[
    { Name: 'John Vangnner', Age: '18' },
    { Age: '23',  Name: 'Lee Zalminen' },
    { Age: '32', Position: 'Developer' },
    { Name: 'John Vangnner', Age: '18' },
    { Age: '44',  Name: 'Test Person' },
    { Name: 'Another Test', Age: '26', Position: 'Developer' },
    { Name: 'Third Test', Age: '19', Position: 'Salesperson' },
    { Age: '23',  Name: 'End of this Page', Position: 'CEO' },
]} itemsPerPage={4} pageButtonLimit={5} />
```

### Sorting

To enable sorting on all columns, just specify `sortable={true}` on the
`<Table>` component. For further customization, ie disabling sort or using a
custom sort function on a per-column basis, you can pass an array to `sortable`,
which contains either string column names or column objects.
 
If you need you can pass a callback for event of sorting change by props `onSortChange`

```
onSortChange(column, direction)
```

We've pre-built some sort functions for you.

- `CaseInsensitive` will sort strings alphabetically regardless of
  capitalization (e.g. Joe Vangnner === joe Vangnner)
- `Date` will sort dates using JavaScript's native Date parser (e.g. 4/20/2014
  12:05 PM)
- `Currency` will sort USD format (e.g. $1,000.00)
- `Numeric` will parse integer-like strings as integers (e.g. "1")
- `NumericInteger` will parse integer strings (use `Numeric` if you might have floats)

To specify a custom sort function, use the following structure for the column
object:

```jsx

{column: 'Column Name', sortFunction: function(a, b){
    return a > b ? 1 : -1;
}}
```

You can also specify a default sort by passing in either a column name by
itself, or an object with a column and a `direction` paramenter of either `asc`
or `desc`.  If no direction is specified, the default sort will be ascending.
Example:

```jsx

{column: 'Column Name', direction: 'asc' }
```

Combined example:

```jsx
<Table className="table" id="table" data={[
    { Name: 'Lee Zalminen', Age: '23', Position: 'Programmer'},
    { Name: 'John Vangnner', Age: '18', Position: 'Engineer'},
    { Name: 'Jorgen Zhang', Age: '32', Position: 'Developer'}
]}
sortable={[
    {
        column: 'Name',
        sortFunction: function(a, b){
            // Sort by last name
            var nameA = a.split(' ');
            var nameB = b.split(' ');

            return nameA[1].localeCompare(nameB[1]);
        }
    },
    'Age',
    'Position'
]}
defaultSort={{column: 'Age', direction: 'desc'}}/>
```

In case you are constructing your table without the data attribute, and the
cells contain some additional HTML elements, you can use the value property
on the Td element to define the value to sort for.

In the following example we define two TDs, where the first contains some
additional markup. We tell the Td to take "John Vangnner" as value for data
handling (filter or sort).

```jsx
import {Table, Tdd, Tr} from 'meteor/universe:react-table';

---
    <Table className="table" id="table" sortable={true}>
        <Tr>
            <Td column="Name" value="John Vangnner">
                <div>
                   <span>Some Text or Icon</span>
                   <b>John Vangnner</b>
                </div>
            </Td>
            <Td column="Age">18</Td>
        </Tr>
    </Table>
---
```

### Filtering

You can do simple case-insensitive filtering by specifying a filterable property
on the table.  This property should contain a list of columns which the filter
is performed on.  If the filterable property is provided, then an input box with
class reactable-filter-input will be prepended to the thead of the table.

Example:

```jsx
<Table className="table" id="table" data={[
    {'State': 'New York', 'Description': 'this is some text', 'Tag': 'new'},
    {'State': 'New Mexico', 'Description': 'lorem ipsum', 'Tag': 'old'},
    {'State': 'Colorado',
     'Description': 'new description that shouldn\'t match filter',
     'Tag': 'old'},
    {'State': 'Alaska', 'Description': 'bacon', 'Tag': 'renewed'},
]} filterable={['State', 'Tag']} />
```

There is also a `filterBy()` function on the component itself which takes a
single string and applies that as the filtered value. It can be used like so:

```jsx
var table = React.renderComponent(
  <Table className="table" id="table" data={[
      {'State': 'New York', 'Description': 'this is some text', 'Tag': 'new'},
      {'State': 'New Mexico', 'Description': 'lorem ipsum', 'Tag': 'old'},
      {'State': 'Colorado',
       'Description': 'new description that shouldn\'t match filter',
       'Tag': 'old'},
      {'State': 'Alaska', 'Description': 'bacon', 'Tag': 'renewed'},
  ]} filterable={['State', 'Tag']} />,
  document.getElementById('table')
);

table.filterBy('new');
```

You can also pass in a `filterBy` prop to control the filtering outside of the
`Table` component:

```jsx
var table = React.render(
  <Table className="table" id="table" data={[
      {'State': 'New York', 'Description': 'this is some text', 'Tag': 'new'},
      {'State': 'New Mexico', 'Description': 'lorem ipsum', 'Tag': 'old'},
      {'State': 'Colorado',
       'Description': 'new description that shouldn\'t match filter',
       'Tag': 'old'},
      {'State': 'Alaska', 'Description': 'bacon', 'Tag': 'renewed'},
  ]} filterable={['State', 'Tag']}
  filterBy="new" />,
  document.getElementById('table')
);
```

If you are using your own input field to control the `filterBy` prop, you can
hide the build-in filter input field with the `hideFilterInput` prop:

```jsx
var table = React.render(
  <Table className="table" id="table" data={[
      {'State': 'New York', 'Description': 'this is some text', 'Tag': 'new'},
      {'State': 'New Mexico', 'Description': 'lorem ipsum', 'Tag': 'old'},
      {'State': 'Colorado',
       'Description': 'new description that shouldn\'t match filter',
       'Tag': 'old'},
      {'State': 'Alaska', 'Description': 'bacon', 'Tag': 'renewed'},
  ]} filterable={['State', 'Tag']}
  filterBy="new"
  hideFilterInput />,
  document.getElementById('table')
);
```

These can be useful if you want to roll your own filtering input field
outside of 

## License
This package is released under the MIT license.

Written based on the wonderful:
glittershark/reactable
