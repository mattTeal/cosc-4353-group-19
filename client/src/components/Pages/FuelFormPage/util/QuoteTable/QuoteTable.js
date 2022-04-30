import React, { useEffect } from "react";
import { useUserInfo } from "../../../util/AuthContext/AuthContext.tsx";
//import { useState } from "react";
import {useTable} from "react-table";
import './QuoteTable.css'
import { getQuotes } from '../../../../../api/quoteBackend.js'
//import AddressData from "../AddressData/AddressData";

function QuoteTable(props) {

  const { userInfo } = useUserInfo();
  //console.log(userInfo); // this is the userID from the AuthContext

  const [dataTable, setDataTable] = React.useState([
    {
      Name: "",
      Date: "",
      Gallons: "",
      Address: "",
      Total: "",
      ppg: ""
    }
  ]);

  useEffect(() => {
    //get userID from Context or LocalStorage
    var key = userInfo.userID ? userInfo.userID : localStorage.getItem("userID");

    getQuotes(key).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setDataTable(data[0]); // query causes supplemental data to be returned. at index 0 is the data we want.
        console.log(dataTable);
      }
    });

    }, []);

  const tableData = React.useMemo(() => [...dataTable], [dataTable]);
  //console.log(dataTable);

  //table structure: 2 headers 'User Info' and 'Quote Info', each with subheaders.
  const columns = React.useMemo(() => 
    [
      {
        Header: 'User Info',
        columns: 
          [
            {
            Header: 'Name',
            accessor: 'FullName', // <- 'accessor' in columns is the 'key' in data
            },
            {
            Header: 'Address',
            accessor: 'Address',
            },
          ],
      },
      {
        Header: 'Quote Info',
        columns: 
          [
            {
                Header: 'Delivery Date',
                accessor: 'Date',
            },
            {
                Header: '# Gallons',
                accessor: 'Gallons',
            },
            {
                Header: '$ / Gallon',
                accessor: 'SuggestedPrice',
            },
            {
                Header: 'Total',
                accessor: 'Total',
            },
          ],
      },
    ],
    []
  )
  
  //useTable hook
  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
  } = useTable({columns, data:tableData})

  //rendering
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default QuoteTable;