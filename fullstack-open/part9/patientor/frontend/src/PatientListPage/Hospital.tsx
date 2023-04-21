import { HospitalEntry } from '../types';
import EntryBase from './EntryBase';

interface HospitalEntryProps {
    entry: HospitalEntry;
}

const Hospital = (props: HospitalEntryProps) => {
    return (
        <EntryBase entry={props.entry}>
            <p>
                To be discharged on {props.entry.discharge?.date} -{' '}
                {props.entry.discharge?.criteria}
            </p>
        </EntryBase>
    );
};

export default Hospital;
