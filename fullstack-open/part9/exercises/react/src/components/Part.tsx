import { ContentProps } from './Content';
import PartContent from './PartContent';

const Part = (props: ContentProps) => {
    return (
        <>
            {props.courseParts.map((part) => {
                switch (part.type) {
                    case part.type:
                        return (
                            <div key={part.name}>
                                <PartContent part={part} />
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
};

export default Part;
