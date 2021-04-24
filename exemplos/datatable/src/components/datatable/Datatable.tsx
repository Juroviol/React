import React from "react";
import {DatatableColumn} from "./DatatableColumn";

type DatatableProps = {
    data: any[];
    children: JSX.Element[];
}

export class Datatable extends React.Component<DatatableProps> {

    generateColumns(item: any): JSX.Element[] {
        const columns = this.props.children.map((child: JSX.Element, index: number) => {
            if(child.props.itemProperty) {
                return <DatatableColumn>{item[child.props.itemProperty]}</DatatableColumn>
            } else if(child.props.children) {
                return <DatatableColumn data={item}>{child.props.children}</DatatableColumn>
            } else {
                return <DatatableColumn>{item[Object.keys(item)[index]]}</DatatableColumn>
            }
        })
        return columns;
    }

    generateLines() {
        const lines = this.props.data.map((item: any) => {
            return <tr>{this.generateColumns(item)}</tr>
        });
        return lines;
    }

    render() {

        return (
            <table>
                <thead>
                    <tr>{React.Children.map(this.props.children, (child: JSX.Element) => {
                        if(child.props.headerName) {
                            return child;
                        }
                    })}</tr>
                </thead>
                <tbody>
                {this.generateLines()}
                </tbody>
            </table>
        );

    }

}