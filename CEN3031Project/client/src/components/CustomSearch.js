import React, { useState } from 'react';
import { Button, Container, Row, Col, Card, Form, FormControl, Table } from 'react-bootstrap';

const CustomSearch = (props) => {
    const [filter, setFilter] = useState("");

    const filterUpdate = () => {
        const updateValue = filter;
        props.onSearch(updateValue);
        //props.sendUpdate(updateValue);
    };

    return (
        <Form inline>
            <FormControl
                type="text"
                placeholder="Search"
                value={filter}
                onChange={event => setFilter(event.target.value)}
            />
            <Button variant="outline-primary" onClick={filterUpdate}>Search</Button>
        </Form>
    );

};

export default CustomSearch;