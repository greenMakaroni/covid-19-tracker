import React from 'react'

function Table({ tableData }) {
    return (
        <div className="table">

            { tableData.map(({ country, cases }) => ( 
                <tr  key={ country }> 
                    <td> { country } </td>
                    <td> <strong> { cases } </strong> </td>
                </tr> 
                ))}
                
        </div>
    )
}

export default Table
