'use client';

import  cn  from 'classnames';
import { Label as InternalLabel, LabelProps } from './Label';
import React, { createContext, useContext } from 'react';
import IconComponent from '@/old-components/Icon'; 

type FieldContextProps = {
  hasError?: boolean;
};
const FieldContext = createContext<FieldContextProps>({});
const useFieldContext = () => {
  const context = useContext(FieldContext);
  if (context === undefined) {
    throw new Error(
      'This component must be used within a <Field.Root> component'
    );
  }
  return context;
};

/** Field ******************/
interface FieldProps {
  name?: string;
  hasError?: boolean;
  children: React.ReactNode;
  className?: string;
}
const Root = ({ name, className, hasError = false, children }: FieldProps) => {
  return (
    <FieldContext.Provider value={{ hasError }}>
      <div className={cn('flex flex-col gap-2 w-full', className)} aria-label={name}>
        {children}
      </div>
    </FieldContext.Provider>
  );
};
Root.displayName = 'Field.Root';

/** Field Label ******************/
interface FieldLabelProps extends LabelProps {
  name?: string;
  endIcon?: string | React.ReactNode;
}
const Label = ({ children, ...props }: FieldLabelProps) => {
  useFieldContext();

  const renderIcon = () => {
    if (typeof props.endIcon === 'string') {
      return (
        <IconComponent
          className="flex-shrink-0"
          iconName={props.endIcon}
          variant="outline"
          size="sm"
        />
      );
    }
    return props.endIcon;
  };

  return (
    <InternalLabel {...props}>
      <span className="flex w-full font-texts">{children}</span>
      {props.endIcon && renderIcon()}
    </InternalLabel>
  );
};
Label.displayName = 'Field.Label';

/** Field Helper ******************/
const Helper = ({ className, children }: {className?:string, children?: React.ReactNode}) => {
  const context = useFieldContext();
  return (
    <div
      className={cn('text-sm px-2 font-texts font-normal', className, {
        'text-error-600': context.hasError,
      })}
    >
      {children}
    </div>
  );
};
Helper.displayName = 'Field.Helper';

export { Root, Label, Helper };