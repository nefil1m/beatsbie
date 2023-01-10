import { ButtonHTMLAttributes, MouseEventHandler, PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

export enum ButtonShape {
  RECTANGLE = 'RECTANGLE',
  CIRCLE = 'CIRCLE',
}

export enum ButtonStyle {
  DEFAULT = 'DEFAULT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum ButtonSize {
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
}

type Props = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'>
  & PropsWithChildren<{
  onClick?: MouseEventHandler;
  shape?: ButtonShape;
  btnStyle?: ButtonStyle;
  size?: ButtonSize;
}>

export const Button = ({
  type = 'button',
  children,
  onClick,
  shape = ButtonShape.RECTANGLE,
  btnStyle = ButtonStyle.DEFAULT,
  className,
  size = ButtonSize.MD,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles.btn, className, {
        [styles.btnCircle]: shape === ButtonShape.CIRCLE,

        [styles.btnDefault]: btnStyle === ButtonStyle.DEFAULT,
        [styles.btnError]: btnStyle === ButtonStyle.ERROR,
        [styles.btnSuccess]: btnStyle === ButtonStyle.SUCCESS,

        [styles.btnMd]: size === ButtonSize.MD,
        [styles.btnLg]: size === ButtonSize.LG,
        [styles.btnXl]: size === ButtonSize.XL,
      })}
    >
      {children}
    </button>
  );
};
