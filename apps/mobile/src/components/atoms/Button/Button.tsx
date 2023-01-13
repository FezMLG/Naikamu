import React from 'react';
import classNames from 'classnames';
import { Button as PaperButton } from 'react-native-paper';

interface ButtonProps {
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  type?:
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'default'
    | 'success'
    | 'warning'
    | 'danger'
    | 'link';
  disabled?: boolean;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onPress?: (() => void) | undefined;
  loading?: boolean;
  className?: string;
  form?: string;
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  React.PropsWithChildren<ButtonProps>
>(function Button(props, ref) {
  const {
    type = 'primary',
    mode = 'contained',
    disabled,
    size = 'md',
    onPress,
    loading,
    className = '',
    form,
    children,
  } = props;

  const buttonProps = {
    mode: mode,
    className: classNames(
      `inline-flex items-center font-medium border transition rounded-3xl btn--${type} btn--${size} `,
      className,
    ),
    loading: loading,
    disabled: disabled,
    onPress: onPress,
    form,
    children: <>{children}</>,
  };

  return <PaperButton {...buttonProps} />;
});
