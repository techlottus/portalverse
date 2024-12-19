import React from 'react';
import  {cva}  from 'class-variance-authority';
import  cn  from 'classnames';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  placeholder?: string;
  icon?: string | React.ReactNode;
  endIcon?: string | React.ReactNode;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  hasError?: boolean;
  errorMessage?:string;
  isValid?: boolean;
}

const inputVariants = cva(
  ' flex items-center gap-2 px-3 py-1 rounded w-full border overflow-hidden bg-surface-0 transition-colors h-10 has-[input:focus]:border-info-500 has-[input:focus]:ring-2 has-[input:focus]:ring-info-200 hover:border-info-500 ',
  {
    variants: {
      hasError: {
        false: [
          '',
        ],
        true: [
          'border-error-500 focus:border-info-500',
        ],
      },
    },
    defaultVariants: {
      hasError: false,
    },
  }
);

const labelVariants = cva(
  'absolute text-base font-texts font-normal cursor-not-allowed pointer-events-none duration-300 transform -translate-y-2.5 scale-75 top-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 focus:scale-75 focus:-translate-y-2.5 peer-focus:text-surface-900',
  {
    variants: {
      hasError: {
        false: ['text-surface-900'],
        true: ['text-error-500 peer-focus:text-surface-900'],
      },
    },
    defaultVariants: {
      hasError: false,
    },
  }
);

const iconVariants = cva(['flex', 'items-center', 'justify-center'], {
  variants: {
    hasError: {
      false: ['text-surface-400'],
      true: ['text-error-500'],
    },
  },
  defaultVariants: {
    hasError: false,
  },
});

const Input = React.forwardRef<HTMLInputElement, InputProps>((
    {
      className,
      placeholder,
      icon,
      value,
      type = 'text',
      hasError = false,
      endIcon,
      errorMessage,
      onInput,
      ...props
    }:InputProps, ref
  ) => {

    const renderIcon = (icon: string | React.ReactNode) => {
      if (typeof icon === 'string') {
        return <span className='material-symbols-outlined'>{icon}</span>
      }

      return React.cloneElement(icon as React.ReactElement, {
        disabled: props.disabled,
      });
    };

    return (
      <div
        className={cn(
          inputVariants({ hasError }),
          {
            '!border-surface-100 hover:border-surface-100 !text-surface-200': props.disabled,
            'border-success-500 hover:border-info-500 focus:border-info-500':props.isValid && !props.disabled && !hasError,
            'border-surface-400 hover:border-info-500 focus:border-info-500': !props.isValid && !props.disabled && !hasError
          },
          className
        )}
      >
        {icon && (
          <div
            className={cn({
              'text-surface-300': props.disabled,
            })}
          >
            {renderIcon(icon)}
          </div>
        )}
        <div className="relative flex-1">
          <input
            ref={ref}
            onInput={(e) => {
              // If the maxLength is -1, it means that there is no limit
              if (e.currentTarget.maxLength === -1) return;

              // Prevents the user from typing more characters than the maxLength
              if (e.currentTarget.value.length > e.currentTarget.maxLength)
                e.currentTarget.value = e.currentTarget.value.slice(
                  0,
                  e.currentTarget.maxLength
                );
            }}
            value={value}
            className={cn(
              'block pt-3.5 w-full text-surface-700 font-texts font-normal appearance-none focus:outline-none focus:ring-0 peer',
              {
                'bg-surface-50 !text-surface-400 ': props.disabled,
              }
            )}
            type={type}
            placeholder=""
            {...props}
          />
          <label
            htmlFor={props.id}
            className={cn(labelVariants({ hasError }), {
              '!text-surface-400': props.disabled,
              '!text-success-500 peer-focus:!text-surface-900 peer-hover:!text-surface-900 hover:text-surface-900': props.isValid && !props.disabled && !hasError,
            })}
          >
            {placeholder} {props.required && <span className='font-texts font-normal'>*</span>}
          </label>
        </div>
        {endIcon && (
          <div
            className={cn(iconVariants({ hasError }), {
              'text-surface-300': props.disabled,
              'text-success-500 focus:text-surface-900': props.isValid,
            })}
          >
            {renderIcon(endIcon)}
          </div>
        )}
      </div>
    );
  })
;
Input.displayName = 'Input';

export default Input;