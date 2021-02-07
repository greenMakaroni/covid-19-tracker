import React from 'react'
import numeral from "numeral";

function Table({ tableData }) {
    return (
        <div className="table">

            { tableData.map(({ country, cases }) => ( 
                <tr  key={ country }> 
                    <td> { country } </td>
                    <td> <strong> { numeral(cases).format("0,000") } </strong> </td>
                </tr> 
                ))}
                
        </div>
    )
}

export default Table
