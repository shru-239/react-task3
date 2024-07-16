import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';
import './App.css';

// Task 3: Search Filter
const Task3 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const fruits = [
    { id: 1, name: 'Apple', price: 'Rs30' },
    { id: 2, name: 'Banana', price: 'Rs50' },
    { id: 3, name: 'Cherry', price: 'Rs200' },
    { id: 4, name: 'Date', price: 'Rs300' },
    { id: 5, name: 'Strawberry', price: 'Rs100' },
    { id: 6, name: 'Blueberry', price: 'Rs250' },
    { id: 7, name: 'Guava', price: 'Rs80' },
    { id: 8, name: 'Grapes', price: 'Rs60' },
  ];

  const filteredFruits = fruits.filter(fruit =>
    fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="section">
      <h2>Task 3: Search Filter</h2>
      <input
        type="text"
        placeholder="Search fruits..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul className="no-bullets">
        {filteredFruits.map(fruit => (
          <li key={fruit.id}>
            {fruit.id}. {fruit.name} - {fruit.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Task 4: Datagrid
const Task4 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(null); // null, 'asc', or 'desc'

  const data = useMemo(
    () => [
      {
        checkbox: '',
        customer: 'John Doe',
        lastSeen: '2024-07-01',
        orders: 3,
        totalSpent: '$200',
        latestPurchase: '2024-06-29',
        news: true,
        segments: 'Regular',
      },
      {
        checkbox: '',
        customer: 'Jane Smith',
        lastSeen: '2024-07-03',
        orders: 5,
        totalSpent: '$450',
        latestPurchase: '2024-07-01',
        news: false,
        segments: 'VIP',
      },
      {
        checkbox: '',
        customer: 'Alice Johnson',
        lastSeen: '2024-07-02',
        orders: 2,
        totalSpent: '$120',
        latestPurchase: '2024-06-30',
        news: true,
        segments: 'Regular',
      },
      {
        checkbox: '',
        customer: 'Bob Brown',
        lastSeen: '2024-07-04',
        orders: 1,
        totalSpent: '$80',
        latestPurchase: '2024-07-03',
        news: false,
        segments: 'New',
      },
      {
        checkbox: '',
        customer: 'Jim Jam',
        lastSeen: '2024-07-10',
        orders: 4,
        totalSpent: '$90',
        latestPurchase: '2024-07-03',
        news: true,
        segments: 'VIP',
      },
    ],
    []
  );

  const sortedData = useMemo(() => {
    if (!sortOrder) return data;
    return [...data].sort((a, b) => {
      if (sortOrder === 'asc') return a.orders - b.orders;
      return b.orders - a.orders;
    });
  }, [data, sortOrder]);

  const filteredData = useMemo(
    () =>
      sortedData.filter(item =>
        item.customer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [sortedData, searchTerm]
  );

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'checkbox',
        Cell: ({ row }) => <input type="checkbox" />,
      },
      {
        Header: 'Customer',
        accessor: 'customer',
      },
      {
        Header: 'Last Seen',
        accessor: 'lastSeen',
      },
      {
        Header: 'Orders',
        accessor: 'orders',
      },
      {
        Header: 'Total Spent',
        accessor: 'totalSpent',
      },
      {
        Header: 'Latest Purchase',
        accessor: 'latestPurchase',
      },
      {
        Header: 'News Subscription',
        accessor: 'news',
        Cell: ({ value }) => (value ? '✔️' : '❌'),
      },
      {
        Header: 'Segments',
        accessor: 'segments',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: filteredData,
    }
  );

  const toggleSortOrder = () => {
    if (!sortOrder) setSortOrder('asc');
    else if (sortOrder === 'asc') setSortOrder('desc');
    else setSortOrder(null);
  };

  return (
    <div className="section">
      <h2>Task 4: Datagrid</h2>
      <input
        type="text"
        placeholder="Search by customer name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(
                    column.id === 'orders' ? { onClick: toggleSortOrder } : {}
                  )}
                  className={
                    column.id === 'orders' && sortOrder
                      ? sortOrder === 'asc'
                        ? 'sort-asc'
                        : 'sort-desc'
                      : column.id === 'orders'
                      ? 'sortable'
                      : ''
                  }
                >
                  {column.render('Header')}
                  {column.id === 'orders' && (
                    <span className="sort-arrows">
                      🔼🔽
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// App Component
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tasks</h1>
      </header>
      <Task3 />
      <Task4 />
    </div>
  );
};

export default App;
