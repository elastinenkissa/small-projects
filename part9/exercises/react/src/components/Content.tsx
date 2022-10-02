import Part from './Part';

export interface ContentPropsItem {
    name: string;
    exerciseCount: number;
    type: string;
    description?: string;
    groupProjectCount?: number;
    exerciseSubmissionLink?: string;
    requirements?: string[];
}

export interface ContentProps {
    courseParts: ContentPropsItem[];
}

const Content = (props: ContentProps) => {
    return (
        <>
            <Part courseParts={props.courseParts} />
        </>
    );
};

export default Content;
