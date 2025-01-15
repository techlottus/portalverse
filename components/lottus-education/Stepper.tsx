
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
    className={cn('flex justify-between h-full items-center',
      {
        ['flex-col gap-3']: vertical
      },{className}
      
    )}
    >
      {React.Children?.map(children, (child:any, index:number) => {
        if (React.isValidElement(child)) {
          //@ts-ignore
          const itemId = child?.props?.id || `${index}`;
          return (
            <React.Fragment key={index}>
              <StepperItemPrivate
              //@ts-ignore
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
          className={cn('inline-block font-bold font-texts text-center mobile:text-wrap desktop:text-nowrap tablet:text-nowrap text-base mobile:text-xs', {
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
            'max-w-[8.25rem] w-[8.25rem] mobile:w-16': !vertical,
          }
        )}
      >
        <div
          className={cn('flex flex-row items-start static h-full', {
            'flex-col items-center gap-2': !vertical,
            'overflow-hidden': vertical,
            'items-center': vertical && !subtitle,
          })}
        >
          <div
            className={cn('relative flex justify-center text-center text-nowrap', {
              'w-full ': !vertical,
            })}
          >
            <div
              className={cn(
                'relative z-10 flex items-center justify-center rounded-full border-2 w-9 h-9 mobile:h-6 mobile:w-6 ',
                {
                  'bg-surface-400 text-surface-0': completed,
                  'border-surface-400  text-surface-400 bg-surface-0': !active,
                  'border-primary-500 bg-primary-500 text-surface-0': active,
                }
              )}
            >
              {completed ? (
                <span className='material-symbols-outlined text-surface-0 text-base' >check</span>
              ) : (
                <span className="inline-flex font-bold text-base font-texts">{step}</span>
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
            'absolute  border-0 margin-0  inline-block desktop:top-4 ',
            {
              'bg-primary-500': active,
              'bg-surface-400 ': !active,
              'h-px w-[98%] top-4.5 left-[4.75rem] mobile:top-3 mobile:left-[2.5rem]': !vertical,
              'top-8 h-full w-px': vertical,
            }
          )}
        />
      )}
    </div>
  );
};
StepperItemPrivate.displayName = '_StepperItemPrivate';

export { Root, Item };