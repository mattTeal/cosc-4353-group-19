import React from "react";
import { useState } from "react";
import {useTable} from "react-table";
import './QuoteTable.css'
//import AddressData from "../AddressData/AddressData";

function QuoteTable(props) {

    //const [ppgBuffer, setppgBuffer] = useState(1);

    // if (props.stateCode === "TX") {
    //   setppgBuffer(30);
    // }
    // else {
    //   setppgBuffer(50);
    // }

    //THIS DOES NOT UPDATE OR ADD ENTRIES TO LIST ! this is for DUMMY DATA
    //in the future, update the list UPON CHANGING THE DATA, not upon refreshing.

    //data in table
    const userData = {
      name: props.firstName + " " + props.lastName,
      address: 
              props.addressLine1 + " " + props.addressLine2 + " " + 
              props.city + ", " + props.stateCode + " " + props.zipcode,
      date: props.date,
      gallons: props.gallons,
      ppg: 30, // 30$ per gallon in-state, 50$ per gallon out of state
      total: props.gallons * 30
    }

    const data = React.useMemo(() =>
    [
        {
        name: userData.name,
        address: userData.address,
        date: userData.date,
        gallons: userData.gallons,
        ppg: userData.ppg,
        total: userData.total
        },
    ],
    []
    )

    //table structure: 2 headers 'User Info' and 'Quote Info', each with subheaders.

    const columns = React.useMemo(() => 
        [
            {
            Header: 'User Info',
            columns: 
                [
                    {
                    Header: 'Name',
                    accessor: 'name', // <- 'accessor' in columns is the 'key' in data
                    },
                    {
                    Header: 'Address',
                    accessor: 'address',
                    },
                ],
            },
            {
            Header: 'Quote Info',
            columns: 
                [
                    {
                        Header: 'Delivery Date',
                        accessor: 'date',
                    },
                    {
                        Header: '# Gallons',
                        accessor: 'gallons',
                    },
                    {
                        Header: '$ / Gallon',
                        accessor: 'ppg',
                    },
                    {
                        Header: 'Total',
                        accessor: 'total',
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
        } = useTable({columns, data})

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