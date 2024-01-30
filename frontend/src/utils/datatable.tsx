import { useState, useMemo } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Box,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Column {
  accessor: string;
  header: string;
  edit?: boolean;
  byId?: boolean;
  data?: { _id: string; [key: string]: string }[];
  key?: string
}

interface DataRow {
  [key: string]: string;
}

interface DataTableProps {
  columns: Column[];
  data: any;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data} ) => {

  // States for sorting and searching
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' }>({ key: '', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  
  //function to handle row render
  const renderColumn = (row: DataRow, column: Column): string => {
    if (column.byId && column.data && column.key) {
      const matchingObject = column.data.find(obj => obj._id === row[column.accessor]);
      return matchingObject ? matchingObject[column.key] : '';
    }
    return row[column.accessor];
  };

  // Function to handle sorting
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Function to handle search
  const filteredData = sortedData.filter(item => {
    return Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Function to request a sort
  const requestSort = (key:string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Render the table
  return (
    <Box>
      <Input
        placeholder='Search...'
        onChange={e => setSearchQuery(e.target.value)}
        mb={4}
      />
      <Table>
        <Thead>
          <Tr>
            {columns.map(column => (
              <Th
                key={column.accessor}
                onClick={() => requestSort(column.accessor)}
                style={{ cursor: 'pointer' }}
              >
                {column.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {currentRows.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map(column => (
                <Td key={column.accessor}>
                  {column.edit ? (
                    <Button variant="solid" colorScheme="purple">
                      <Link to={row._id}>Edit</Link>
                    </Button>
                  ) : (
                    renderColumn(row, column)
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Select
          w={40}
          value={rowsPerPage}
          onChange={e => setRowsPerPage(parseInt(e.target.value, 10))}
        >
          {[10, 20, 30, 50].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </Select>
        {Array.from({ length: Math.ceil(filteredData.length / rowsPerPage) }, (_, i) => (
          <Button key={i} ml={2} onClick={() => paginate(i + 1)}>
            {i + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default DataTable;
