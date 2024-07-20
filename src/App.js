import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
        Header: 'New Subscription',
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
                    <span role="img" aria-label="Sort Order">
                      🔼🔽
                    </span>
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

// Task 5: Drag & Drop Task List
const Task5 = () => {
  const initialTasks = [
    { id: 'task-1', content: 'Task 1' },
    { id: 'task-2', content: 'Task 2' },
    { id: 'task-3', content: 'Task 3' },
    { id: 'task-4', content: 'Task 4' },
    { id: 'task-5', content: 'Task 5' },
    { id: 'task-6', content: 'Task 6' },
    { id: 'task-7', content: 'Task 7' },
    { id: 'task-8', content: 'Task 8' },
    { id: 'task-9', content: 'Task 9' },
    { id: 'task-10', content: 'Task 10' },
  ];

  const initialColumns = {
    'unplanned': {
      name: 'Unplanned',
      items: initialTasks,
    },
    'today': {
      name: 'Today',
      items: [],
    },
    'tomorrow': {
      name: 'Tomorrow',
      items: [],
    },
    'this-week': {
      name: 'This Week',
      items: [],
    },
    'next-week': {
      name: 'Next Week',
      items: [],
    },
  };

  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    if (source.droppableId !== destination.droppableId) {
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destinationColumn.items);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          items: destItems,
        },
      });
    } else {
      const copiedItems = Array.from(sourceColumn.items);
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <div className="section">
      <h2>Task 5: Drag & Drop Task List</h2>
      <div className="drag-drop-context">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column], index) => (
            <div key={columnId} className="column">
              <h2>{column.name}</h2>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`droppable ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`draggable ${snapshot.isDragging ? 'dragging' : ''}`}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Task App</h1>
      </header>
      <Task3 />
      <Task4 />
      <Task5 />
    </div>
  );
};

export default App;
