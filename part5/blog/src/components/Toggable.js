import { useState } from 'react';

const Toggable = (props) => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    const visibilityStyle = visible ? { display: '' } : { display: 'none' };

    return (
        <>
            <div style={visibilityStyle}>{props.children}</div>
            <div>
                <button onClick={toggleVisible}>
                    {visible ? props.hiddenText : props.visibleText}
                </button>
            </div>
        </>
    );
};

export default Toggable;
