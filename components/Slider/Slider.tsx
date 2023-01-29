import styles from './Slider.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { clamp } from 'lodash';

type Props = {
  onChange: (value: number) => void;
  value: number;
  min?: number;
  max?: number;
};

export const Slider = ({ onChange, value, min = 0, max = 100 }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  // cache volume in state because updating redux's state on mousemove it's
  // not the most optimal thing to do performance-wise (and that's what usually happens somewhere higher)
  const [stateValue, setStateValue] = useState(value);

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      onChange(stateValue);
    }
  };

  const onDrag = ({ movementY }) => {
    if (isDragging) {
      const delta = movementY * -1;
      setStateValue(clamp(stateValue + delta, min, max));
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);

    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', onDragEnd);
    };
  });

  return (
    <div className={styles.slider}>
      <div className={styles.track}>
        <div className={styles.trackBg} />
        <div className={styles.trackActive} style={{ height: stateValue }} />
        <div
          onMouseDown={onDragStart}
          className={classNames(styles.handle, {
            [styles.handleActive]: isDragging,
          })}
          style={{ bottom: stateValue }}
        />
      </div>
    </div>
  );
};
