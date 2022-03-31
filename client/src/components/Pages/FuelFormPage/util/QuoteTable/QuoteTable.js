import React, { useEffect } from "react";
//import { useState } from "react";
import {useTable} from "react-table";
import './QuoteTable.css'
//import AddressData from "../AddressData/AddressData";

function QuoteTable(props) {
  const [dataTable, setDataTable] = React.useState([
    {
      Name: "Test Name",
      Date: "",
      Gallons: "",
      Address: "",
      Total: "",
      ppg: ""
    }
  ]);

  useEffect(() => {
    //fetch request to get data from server
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:8080/api/quotes", requestOptions) //<- testing
      .then(response => response.json())
      .then(data => {
        setDataTable(data);
      });
    }, []);

  /* const data = React.useMemo(() =>
  [
    {
    name: props.firstName + " " + props.lastName,
    address: props.addressLine1 + " " + props.addressLine2 + " " + 
    props.city + ", " + props.stateCode + " " + props.zipcode,
    date: props.date,
    gallons: props.gallons,
    ppg: 30,
    total: props.gallons * 30
    },
  ],
  [props] //<- not that anyone cares but this is the depedency array!
  ) */

  const tableData = React.useMemo(() => [...dataTable], [dataTable]);
  console.log(dataTable);

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