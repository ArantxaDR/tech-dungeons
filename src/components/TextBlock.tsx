interface TextBlockProps {
  title: string;
  icon: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextBlock = ({ title, icon, value, onChange, placeholder }: TextBlockProps) => {
  return (
    <div className="rpg-card">
      <h2 className="section-title">{icon} {title}</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pixel-textarea"
      />
    </div>
  );
};
