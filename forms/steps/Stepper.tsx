
import React from 'react';
import cn  from 'classnames';
import { PropsWithChildren } from 'react';

/************* Stepper *************/
type CommonProps = PropsWithChildren<{
  className?: string ;
}>;

interface StepperProps extends CommonProps {
  activeId?: string | number;
  direction?: 'horizontal' | 'vertical';
  onStepChange?: (index: number) => void;
}
const Root = ({
  className,
  activeId,
  children,
  direction = 'horizontal',
  onStepChange,
}: StepperProps) => {
  const length = React.Children.count(children);
  console.log(length)
  const vertical = direction === 'vertical';

  const onHandleStepChange = (index: number) => {
    if (onStepChange) {
      onStepChange(index);
    }
  };
  
  return (
    <div
    className={cn('flex flex-row justify-between',
      {
        ['flex-col gap-3']: vertical
      },{className}
      
    )}
    >
      {React.Children?.map(children, (child:React.ReactNode, index:number) => {
        if (React.isValidElement(child)) {
          const itemId = child?.props?.id || `${index}`;
          console.log('last:',  index === (length - 1))
          return (
            <React.Fragment key={index}>
              <StepperItemPrivate
                {...child?.props}
                id={itemId}
                active={activeId?.toString() === itemId}
                step={index + 1}
                first={index === 0}
                direction={direction}
                last={index === (length - 1) }
                onStepSelected={
                   () => onStepChange ? onHandleStepChange(index) : console.log('no')
                }
              />
            </React.Fragment>
          );
        }

        return null;
      })}
    </div>
  );
};
Root.displayName = 'Stepper';

/************* Stepper Item *************/
interface StepperItemProps extends CommonProps {
  id?: string;
  completed?: boolean;
  title?: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}
const Item = (_: StepperItemProps) => null;
Item.displayName = 'StepperItem';

/************* Stepper Private Item *************/
interface StepperItemPrivateProps extends StepperItemProps {
  step: number;
  active: boolean;
  last: boolean;
  first: boolean;
  direction: StepperProps['direction'];
  onStepSelected?: () => void;
}
const StepperItemPrivate = ({
  title,
  subtitle,
  step,
  children,
  last,
  first,
  active,
  direction,
  completed = false,
  rightElement,
  onStepSelected,
}: StepperItemPrivateProps) => {
  const vertical = direction === 'vertical';
  const label = (
    <div
      className={cn('flex flex-col gap-2 items-start grow', {
        'items-center': !vertical,
      })}
    >
      <div
        className={cn('flex items-center justify-center gap-3 w-full', {
          'justify-between': vertical,
        })}
      >
        <span
          className={cn('inline-block font-bold font-headings', {
            'text-primary-500': active,
            'text-surface-400': !active,
          })}
        >
          {title}
        </span>
        {vertical && rightElement}
      </div>
      {subtitle && (
        <span
          className={cn('text-surface-900 text-xs', {
            'text-center': !vertical,
          })}
        >
          {subtitle}
        </span>
      )}
    </div>
  );

  return (
    <div
      className={cn('relative', {
        'w-full': !last && !vertical,
        'h-full': !last && vertical,
      })}
    >
      <span
        className={cn(
          'inline-block h-full w-full appearance-none outline-none cursor-default',
          {
            '-mt-2': !first && vertical,
            'max-w-[8.25rem] w-[8.25rem]': !vertical,
            'cursor-pointer': !!onStepSelected,
          }
        )}
      >
        <div
          className={cn('flex flex-row gap-4 p-2 items-start static h-full', {
            'flex-col items-center gap-2': !vertical,
            'overflow-hidden': vertical,
            'items-center': vertical && !subtitle,
          })}
        >
          <div
            className={cn('relative flex justify-center', {
              'w-full ': !vertical,
            })}
          >
            <div
              className={cn(
                'relative z-10 flex items-center justify-center rounded-full border-2 w-9 h-9 ',
                {
                  'bg-surface-400 text-surface-0': completed,
                  'border-surface-400  text-surface-400 bg-surface-0': !active,
                  'border-primary-500 bg-primary-500 text-surface-0': active,
                }
              )}
            >
              {completed ? (
                <span className='material-symbols-outlined text-surface-0' >check</span>
              ) : (
                <span className="inline-flex font-bold">{step}</span>
              )}
            </div>
          </div>
          {label}
        </div>
        {vertical && children && (
          <div
            className={cn('relative desktop:flex desktop:pl-16 tablet:pl-16', {
              'w-full desktop:py-3': vertical,
              'mobile:pl-12':!last,
            })}
          >
            {children}
          </div>
        )}
      </span>
      {last? null: (
        <div id='line'
          className={cn(
            'absolute inset-[calc(25px)] w-px border-0 margin-0  inline-block top-8',
            {
              'bg-primary-500': active,
              'bg-surface-400 ': !active,
              'h-px w-full top-4.5 left-[4.75rem]': !vertical,
              'top-8 h-full': vertical,
            }
          )}
        />
      )}
    </div>
  );
};
StepperItemPrivate.displayName = '_StepperItemPrivate';

export { Root, Item };