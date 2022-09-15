import { forwardRef, useImperativeHandle, useState } from 'react';

const Toggable = forwardRef((props, refs) => {
    const [visibility, setVisibility] = useState(false);

    const toggleVisible = () => {
        setVisibility(!visibility);
    };

    useImperativeHandle(refs, () => {
        return { toggleVisible };
    });

    const visibilityStyle = visibility ? { display: '' } : { display: 'none' };

    return (
        <>
            <div style={visibilityStyle}>{props.children}</div>
            <div>
                <button onClick={toggleVisible}>
                    {visibility ? props.hiddenText : props.visibleText}
                </button>
            </div>
        </>
    );
});

export default Toggable;
