interface TextBlockProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export const TextBlock = ({ title, value, onChange, placeholder, readOnly }: TextBlockProps) => {
  return (
    <div className="rpg-card">
      <h2 className="section-title">{title}</h2>
      <textarea
        value={value}
        onChange={readOnly ? undefined : (e) => onChange(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        className="field-textarea"
      />
    </div>
  );
};
