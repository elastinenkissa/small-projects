import { Favorite } from '@mui/icons-material';
import { HealthCheckEntry, Rating } from '../types';
import EntryBase from './EntryBase';

interface HealthCheckProps {
    entry: HealthCheckEntry;
}

const HealthCheck = (props: HealthCheckProps) => {
    const heartStyle = () => {
        switch (props.entry.healthCheckRating) {
            case Rating.LowRisk:
                return { color: '#FF8C00' };
            case Rating.HighRisk:
                return { color: '#556B2F' };
            case Rating.CriticalRisk:
                return { color: '#2F4F4F' };
            default:
                return { color: '#FF0000' };
        }
    };
    return (
        <EntryBase entry={props.entry}>
            <p>
                <Favorite style={heartStyle()} />
            </p>
        </EntryBase>
    );
};

export default HealthCheck;
