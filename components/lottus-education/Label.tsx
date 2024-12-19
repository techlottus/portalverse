export interface LabelProps {
  id?: string;
  htmlFor?: string;
  children: React.ReactNode;
  testId?: string;
}

const Label = ({ id, htmlFor, children, testId }: LabelProps) => {
  return (
    <label
      className="font-sans text-sm flex items-center justify-between text-neutral-900"
      id={id}
      htmlFor={htmlFor}
      data-testid={testId}
    >
      {children}
    </label>
  );
};
Label.displayName = 'Label';

export { Label };