export interface LabelProps {
  id?: string;
  htmlFor?: string;
  children: React.ReactNode;
  testId?: string;
}

const Label = ({ id, htmlFor, children, testId }: LabelProps) => {
  return (
    <label
      className="font-texts text-base flex items-center justify-between text-surface-900"
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