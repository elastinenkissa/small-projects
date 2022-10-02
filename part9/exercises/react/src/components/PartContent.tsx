import { ContentPropsItem } from './Content';

interface PartContentProps {
    part: ContentPropsItem;
}

const PartContent = (props: PartContentProps) => {
    return (
        <div style={{ border: 'solid 0.5px', margin: 15 }}>
            <strong>Name: {props.part.name}</strong>
            <p>Exercises: {props.part.exerciseCount}</p>
            {props.part.description && (
                <em>Description: {props.part.description}</em>
            )}
            {props.part.groupProjectCount && (
                <p>Group projects: {props.part.groupProjectCount}</p>
            )}
            {props.part.exerciseSubmissionLink && (
                <p>Submission link: {props.part.exerciseSubmissionLink}</p>
            )}
            {props.part.requirements && (
                <p>
                    Required skills:{' '}
                    {props.part.requirements
                        .map((requirement) => requirement)
                        .join(', ')}
                </p>
            )}
        </div>
    );
};

export default PartContent;
