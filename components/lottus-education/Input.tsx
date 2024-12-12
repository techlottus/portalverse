import React, { createRef, useEffect } from 'react';
import  {cva}  from 'class-variance-authority';
import  cn  from 'classnames';
import IconComponent from '@/old-components/Icon';
import { isValid } from 'react-datepicker/dist/date_utils';

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
  'flex items-center gap-2 px-3 py-1 rounded w-full border overflow-hidden bg-surface-50 transition-colors h-10',
  {
    variants: {
      hasError: {
        false: [
          'border-surface-400',
          'hover:border-surface-900',
          'has-[input:focus]:border-surface-800 has-[input:focus]:ring-2 has-[input:focus]:ring-info-200',
        ],
        true: [
          'border-error-500',
          'has-[:focus]:border-error-500 has-[:focus]:ring-2 has-[:focus]:ring-error-100',
          'has-[input:invalid]:border-error-500',
        ],
      },
    },
    defaultVariants: {
      hasError: false,
    },
  }
);

const labelVariants = cva(
  'absolute text-base duration-300 transform -translate-y-2.5 scale-75 top-2 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5',
  {
    variants: {
      hasError: {
        false: ['text-surface-900'],
        true: ['text-error-500'],
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
            '!border-success-500':props.isValid && !props.disabled
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
              'block pt-3.5 w-full text-surface-700 appearance-none focus:outline-none focus:ring-0 peer',
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
              '!text-success-500': props.isValid && !props.disabled,
            })}
          >
            {placeholder} {props.required && <span>*</span>}
          </label>
        </div>
        {endIcon && (
          <div
            className={cn(iconVariants({ hasError }), {
              'text-surface-300': props.disabled,
              'text-success-500': props.isValid,
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