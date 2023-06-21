
"use client"
import React from 'react';
import { Card } from 'primereact/card';


export const Employees = ({ data }) => {
    return (
        <>
            {data.map((employee) => (
                <div key={employee.id} className="w-3 m-1">
                    <Card title={employee.name}>
                        <h2>Age: {employee.age}</h2>
                        <h2>Address: {employee.address.street}, {employee.address.city}, {employee.address.country}</h2>
                    </Card>
                </div>
            ))}
        </>
    );
};