import { FiAlertCircle as AlertCircle } from 'react-icons/fi';

interface FieldErrorProps {
  /** Id referenced by the input's `aria-describedby`. */
  id: string;
  message?: string;
}

/**
 * Inline validation message. It carries an icon and the text on its own, so
 * the error never relies on the red colour alone.
 */
export const FieldError = ({ id, message }: FieldErrorProps) => {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      className="mt-1 flex items-start gap-1 text-xs leading-snug text-destructive"
    >
      <AlertCircle aria-hidden="true" className="mt-px h-3.5 w-3.5 flex-shrink-0" />
      <span>{message}</span>
    </p>
  );
};
