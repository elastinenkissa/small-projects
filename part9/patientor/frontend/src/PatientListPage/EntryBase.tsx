import React from 'react';
import { Entry } from '../types';
import {
    MedicalServices,
    LocalHospital,
    MedicalInformation,
} from '@mui/icons-material';

interface EntryProps {
    entry: Entry;
    children: React.ReactElement | undefined;
}

const EntryBase = (props: EntryProps) => {
    const type = () => {
        if (props.entry.type === 'HealthCheck') {
            return <MedicalServices />;
        }
        if (props.entry.type === 'Hospital') {
            return <LocalHospital />;
        }
        if (props.entry.type === 'OccupationalHealthcare') {
            return <MedicalInformation />;
        }
    };

    return (
        <div
            style={{
                border: 1,
                borderStyle: 'solid',
                margin: 15,
                padding: 15
            }}
        >
            <em key={props.entry.id}>
                {props.entry.date} {type()}
                <p>{props.entry.description}</p>
                <ul>
                    {props.entry.diagnosisCodes?.map((code) => (
                        <li key={code}>{code}</li>
                    ))}
                </ul>
                {props.children}
            </em>
            <strong>Diagnose by {props.entry.specialist}</strong>
        </div>
    );
};

export default EntryBase;
