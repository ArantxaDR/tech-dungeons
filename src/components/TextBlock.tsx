interface TextBlockProps {
  title: string;
  icon: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export const TextBlock = ({ title, icon, value, onChange, placeholder, readOnly }: TextBlockProps) => {
  return (
    <div className="rpg-card">
      <h2 className="section-title">{icon} {title}</h2>
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
