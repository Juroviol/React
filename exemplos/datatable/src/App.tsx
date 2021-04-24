import React from 'react';
import './App.css';
import {Datatable} from "./components/datatable/Datatable";
import {DatatableColumn} from "./components/datatable/DatatableColumn";

type State = {
    id: string;
    descricao: string,
    data: any[];
}

export class App extends React.Component<any, State> {

    constructor(props: any) {

        super(props);

        this.state = {
            data: [{
                id: 1,
                descricao: 'Produto 1',
            },{
                id: 2,
                descricao: 'Produto 2',
            }],
            id: '',
            descricao: ''
        }

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleDescricaoChange = this.handleDescricaoChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleListItemClicked = this.handleListItemClicked.bind(this);

    }

    handleIdChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            id: e.target.value
        });
    }

    handleDescricaoChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            descricao: e.target.value
        });
    }

    handleDetalheClick(item: any) {
        console.log(item);
    }

    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = this.state.data.slice();
        data.push({
           id: this.state.id,
           descricao: this.state.descricao
        });
        this.setState({
            data
        });
    }

    handleListItemClicked(item: any) {
        console.log(item);
    }

    render() {

        return (
            <React.Fragment>
                <Datatable data={this.state.data}>
                    <DatatableColumn headerName="Id" itemProperty="id">
                    </DatatableColumn>
                    <DatatableColumn headerName="Descrição" itemProperty="descricao"/>
                    <DatatableColumn>
                        {(item: any) => <button onClick={this.handleDetalheClick.bind(this, item)}>Detalhe</button>}
                    </DatatableColumn>
                </Datatable>
                <hr/>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Id</label>
                    <input type="text" value={this.state.id} onChange={this.handleIdChange}/>
                    <label>Descrição</label>
                    <input type="text" value={this.state.descricao} onChange={this.handleDescricaoChange}/>
                    <button type="submit">Adicionar</button>
                </form>
            </React.Fragment>
        );
    }

}

export default App;
