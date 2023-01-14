import { ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import { useOnClickOutside } from 'usehooks-ts';
import { Work_Sans } from '@next/font/google';
const font = Work_Sans();

type Option<T = unknown> = {
  value: T;
  label: ReactNode;
};

type Props<T> = {
  items: number[] | string[] | Option<T>[];
  onChange: (value: T) => void;
  value: T;
  placeholder?: ReactNode;
  className?: string;
};

export function Select<T>({ items: propItems, onChange, value, placeholder, className }: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef();

  useOnClickOutside(selectRef, () => {
    setIsOpen(false);
  });

  const items =
    typeof propItems[0] !== 'object'
      ? propItems.map((item) => ({ value: item, label: item }))
      : (propItems as Option<T>[]);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames(className, styles.select, 'select')} ref={selectRef}>
      <div onClick={toggleOpen} className="select__toggle">
        {(value || placeholder) as ReactNode}
      </div>
      {isOpen && (
        <div className={classNames(styles.selectDropdown, 'select__dropdown', font.className)}>
          {items.map(({ value, label }) => {
            return (
              <div
                className={styles.selectItem}
                key={value}
                onClick={() => {
                  onChange(value);
                  close();
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
