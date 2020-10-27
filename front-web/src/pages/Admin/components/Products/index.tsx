import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import BaseForm from '../BaseForm';
import Form from './Form';

const Products=()=>{
    return (
        <div>
            <Link to="/admin/products" className="mr-5">
                Listar produtos
            </Link>
            <Link to="/admin/products/create" className="mr-5">
                Criar produto
            </Link>
            <Link to="/admin/products/:productId" className="mr-5">
                Editar produtos
            </Link>
            <Switch>
                <Route path="/admin/products" exact>
                    <h1>Exibir a listagem de produtos</h1>
                </Route>
                <Route path="/admin/products/create">
                    <Form/>
                </Route>
                <Route path="/admin/products/:productId">
                    
                </Route>
            </Switch>
        </div>
    )
}

export default Products;