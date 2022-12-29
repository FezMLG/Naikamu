import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { ActivityIndicator, Button as PaperButton } from 'react-native-paper';

interface ResponsiveButtonProps {
  block?: boolean;
}

interface ButtonProps extends ResponsiveButtonProps {
  htmlType?: 'button' | 'submit';
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
  readonly?: boolean;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  suffix?: ReactElement;
  prefix?: ReactElement;
  onClick?:
    | ((
        event: React.MouseEvent<HTMLAnchorElement> &
          React.MouseEvent<HTMLButtonElement>,
      ) => void)
    | (() => void);
  loading?: boolean;
  href?: string;
  target?: '_blank';
  className?: string;
  testId?: string;
  form?: string;
  download?: boolean;
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  React.PropsWithChildren<ButtonProps>
>(function Button(props, ref) {
  const {
    htmlType,
    type = 'primary',
    disabled,
    readonly,
    size = 'md',
    prefix,
    suffix,
    block,
    onClick,
    loading,
    href,
    target,
    className = '',
    testId,
    form,
    download,
    children,
  } = props;

  const buttonProps = {
    type: htmlType,
    className: classNames(
      `inline-flex items-center font-medium border transition rounded-3xl btn--${type} btn--${size} `,
      className,
    ),
    disabled: disabled || loading,
    onClick: onClick,
    'data-testid': testId,
    form,
    download,
    children: (
      <>
        {prefix && <span className="btn-prefix">{prefix}</span>}
        {children}
        {loading && <ActivityIndicator color="inherit" />}
        {suffix && <span className="btn-suffix">{suffix}</span>}
      </>
    ),
  };

  return <PaperButton {...buttonProps} />;
});
