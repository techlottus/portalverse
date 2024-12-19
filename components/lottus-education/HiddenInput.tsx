import React from 'react';

import cn from 'classnames';

interface HiddenInputProps {
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  type: 'checkbox' | 'radio';
  ref?: React.Ref<HTMLInputElement>;
  className?: string;
}

const HiddenInput = React.forwardRef<HTMLInputElement, HiddenInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          'absolute top-0 left-0 w-px h-px border-0 opacity-0',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
HiddenInput.displayName = 'HiddenInput';

export default HiddenInput;