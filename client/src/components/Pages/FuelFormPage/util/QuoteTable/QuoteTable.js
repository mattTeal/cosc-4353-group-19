import React, { useEffect } from "react";
import { useUserInfo } from "../../../util/AuthContext/AuthContext.tsx";
//import { useState } from "react";
import {useTable} from "react-table";
import './QuoteTable.css'
import { getQuotes, getUser } from '../../../../../api/quoteBackend.js'
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
    //get userID from LocalStorage
    var key = userInfo.userID ? userInfo.userID : localStorage.getItem("userID");
    //console.log(key);

    getQuotes(key).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        //console.log(data[0]);
        setDataTable(data[0]);
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
            accessor: 'Name', // <- 'accessor' in columns is the 'key' in data
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
                accessor: 'ppg',
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