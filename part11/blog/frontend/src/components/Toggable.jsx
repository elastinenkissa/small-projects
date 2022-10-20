import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

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
        <button onClick={toggleVisible} id="toggleButton">
          {visibility ? props.hiddenText : props.visibleText}
        </button>
      </div>
    </>
  );
});

Toggable.displayName = 'Toggable';

Toggable.propTypes = {
  hiddenText: PropTypes.string.isRequired,
  visibleText: PropTypes.string.isRequired,
};

export default Toggable;
