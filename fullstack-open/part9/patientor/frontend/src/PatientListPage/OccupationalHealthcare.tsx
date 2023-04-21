import { OccupationalHealthcareEntry } from '../types';
import EntryBase from './EntryBase';

interface OccupationalHealthcareProps {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = (props: OccupationalHealthcareProps) => {
    return (
        <EntryBase entry={props.entry}>
            <div>
                <p>Employer: {props.entry.employerName}</p>
                {props.entry.sickLeave && (
                    <p>
                        Sick leave from {props.entry.sickLeave.startDate} to{' '}
                        {props.entry.sickLeave.endDate}
                    </p>
                )}
            </div>
        </EntryBase>
    );
};

export default OccupationalHealthcare;
