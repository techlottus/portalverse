'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import  cn  from 'classnames';
import IconComponent from '@/old-components/Icon';

const Root = SelectPrimitive.Root;

const Value = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ className, placeholder, ...props }, ref) => (
  <span className="px-3 group-data-[error=true]:text-error-500 whitespace-break-spaces text-left">
    <SelectPrimitive.Value
      placeholder={
        <p className={cn('group-data-[error=true]:text-error-500', className)}>
          {placeholder}
          <span className="hidden group-aria-[required=true]:block">*</span>
        </p>
      }
      {...props}
      ref={ref}
    />
  </span>
));
Value.displayName = 'SelectValue';

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    hasError?: boolean;
  }
>(({ className, children, hasError, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-neutral-400 hover:border-neutral-900 disabled:border-neutral-200 focus:border-neutral-700 bg-white placeholder:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-info-200 disabled:cursor-not-allowed [&>span]:line-clamp-1 overflow-hidden group data-[state=open]:border-neutral-700 data-[state=open]:ring-2 data-[state=open]:ring-info-200 data-[error=true]:border-error-500 transition-colors group disabled:text-neutral-400',
      className
    )}
    data-error={hasError}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <div className="h-10 w-10 flex-shrink-0 inline-flex items-center justify-center bg-neutral-100 border-l border-neutral-400 group-focus:border-neutral-700 group-data-[state=open]:border-neutral-700 group-data-[error=true]:border-error-500 group-data-[error=true]:bg-[rgba(213,13,25,0.2)] group-hover:border-neutral-900 group-disabled:border-neutral-200">
        <IconComponent iconName="keyboard_arrow_down"  />
      </div>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
Trigger.displayName = SelectPrimitive.Trigger.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-[18.25rem] min-w-[var(--radix-select-trigger-width)] w-[var(--radix-select-trigger-width)] md:w-full max-w-[var(--radix-select-trigger-width)] md:max-w-[38.75rem] overflow-hidden rounded-lg bg-white shadow-md',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 overflow-auto p-1',
        className
      )}
      sideOffset={4}
      position={position}
      {...props}
    >
      <ScrollArea.Root className="w-full overflow-x-hidden -mr-2" type="auto">
        <SelectPrimitive.Viewport
          className={cn(
            position === 'popper' &&
              'h-[18.25rem] w-full min-w-[var(--radix-select-trigger-width)] md:max-w-[30rem] pr-1'
          )}
          asChild
        >
          <ScrollArea.Viewport
            className="w-full h-full max-w-[var(--radix-select-trigger-width)] md:max-w-[30rem] flex"
            asChild
          >
            <div className="relative flex flex-col">{children}</div>
          </ScrollArea.Viewport>
        </SelectPrimitive.Viewport>
      </ScrollArea.Root>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
Content.displayName = SelectPrimitive.Content.displayName;

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex gap-3 w-full cursor-default select-none items-center rounded-sm p-3 outline-none hover:bg-neutral-100 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:outline-none data-[highlighted]:bg-neutral-100',
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText asChild>
      <span className="flex-1">{children}</span>
    </SelectPrimitive.ItemText>
    <span className="flex flex-shrink-0 h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <IconComponent iconName="check" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
Item.displayName = SelectPrimitive.Item.displayName;

export { Root, Trigger, Value, Content, Item };