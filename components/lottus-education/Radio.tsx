'use client';

import React from 'react';
import cn from "classnames"
import HiddenInput from './HiddenInput';

export type ControlledProps = BaseProps & {
  checked: boolean;
  defaultChecked?: never;
};
export type UncontrolledProps = BaseProps & {
  checked?: never;
  defaultChecked?: boolean;
};

interface BaseProps {
  id?: string;
  name?: string;
  disabled?: boolean;
  hasError?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  className?: string;
  children?: React.ReactNode
}

type RadioProps = ControlledProps | UncontrolledProps;

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ children, hasError, className, ...props }: RadioProps, ref) => {
    return (
      <label className="inline-flex gap-2 align-top items-center cursor-pointer select-none group rounded bg-surface-100 px-3 py-2">
        <div className="relative flex items-center align-middle justify-center">
          <HiddenInput
            {...props}
            className={cn('peer', className)}
            ref={ref}
            type="radio"
          />
          <div
            className={cn(
              'w-4 h-4 rounded-full border border-surface-400 group-hover:border-surface-900 peer-checked:bg-primary-600 text-transparent peer-checked:text-white peer-checked:border-primary-600 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-info-200 peer-focus-visible:border-surface-800 peer-disabled:bg-surface-200 peer-disabled:border-surface-300 peer-checked:peer-disabled:bg-surface-400 peer-checked:peer-disabled:text-surface-300 flex items-center justify-center align-center',
              {
                'border-error-500 group-hover:border-error-500': hasError,
              }
            )}
          >
            <div className="w-1.5 h-1.5 rounded-full top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 bg-surface-50" />
          </div>
        </div>
        {children && <span className="text-base font-texts font-normal">{children}</span>}
      </label>
    );
  }
);
Radio.displayName = 'RadioButton';

export default Radio;