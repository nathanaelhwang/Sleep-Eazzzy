export function Callout({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="callout">
      {label && <div className="callout-label">{label}</div>}
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}
