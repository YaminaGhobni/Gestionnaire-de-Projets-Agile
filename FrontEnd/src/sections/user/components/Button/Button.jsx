import './_Button.scss';
const Button = ({
  icon,
  label,
  variant,
  size,
  outlined,
  rounded,
  disabled,
  children,
  loading,
  ...props
}) => {
  return (
    <button
      className={[
        'btn',
        `btn-${size}`,
        `${outlined ? 'btn-outlined' : 'btn'}-${variant}`,
        `${rounded ? 'btn-rounded' : ''}`,
        `${disabled ? 'btn-disabled' : ''}`,
      ].join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        'loading...'
      ) : children ? (
        children
      ) : (
        <>
          {icon && <img src={icon} alt="icon" className="icon" />}
          {label}
        </>
      )}
    </button>
  );
};

Button.defaultProps = {
  icon: '',
  label: 'Button',
  variant: 'primary',
  size: 'md',
  outlined: false,
  rounded: false,
  loading: false,
  disabled: false,
  children: null,
};

export default Button;
