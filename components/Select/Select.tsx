import { ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import { useOnClickOutside } from 'usehooks-ts';

type Option<T = unknown> = {
  value: T;
  label: ReactNode;
};

type Props<T> = {
  items: number[] | string[] | Option<T>[];
  onChange: (value: T) => void;
  value?: T;
  placeholder?: ReactNode;
  className?: string;
};

export function Select<T>({ items: propItems, onChange, value, placeholder, className }: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef();

  const close = () => {
    setIsOpen(false);
  };
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useOnClickOutside(selectRef, close);

  const items =
    typeof propItems[0] !== 'object'
      ? propItems.map((item) => ({ value: item, label: item }))
      : (propItems as Option<T>[]);

  const displayValue = items.find((item) => item.value === value)?.label ?? placeholder;

  return (
    <div className={classNames(className, styles.select, 'select')} ref={selectRef}>
      <div onClick={toggleOpen} className="select__toggle">
        {displayValue as ReactNode}
      </div>
      {isOpen && (
        <div className={classNames(styles.selectDropdown)}>
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
