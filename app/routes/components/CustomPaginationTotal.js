import React from 'react';

export const CustomPaginationTotal = (props) => (
    <span className="small ml-2 pt-2">
        Showing { props.from } to { props.to } of { props.size } Results
    </span>
);