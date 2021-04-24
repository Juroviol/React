import React from "react";

type DatatableColumnProps = {
    headerName?: string;
    itemProperty?: any;
    data?: any;
    children?: JSX.Element[] | ((param: any) => JSX.Element);
}

export class DatatableColumn extends React.Component<DatatableColumnProps> {

    render() {

        if(this.props.headerName) {
            return <th>{this.props.headerName}</th>
        } else if(typeof this.props.children === 'function') {
            return <td>{this.props.children(this.props.data)}</td>
        } else {
            return <td>{this.props.children}</td>
        }

    }

}