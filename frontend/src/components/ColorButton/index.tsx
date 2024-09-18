export type ColorButtonProps = {
  color: string;
  setter: (color: string) => void;
  active?: boolean;
};

export const ColorButton = ({
  setter,
  color,
  active = false,
}: ColorButtonProps) => {
  return (
    <button
      style={{backgroundColor: color, borderStyle: active ? "solid" : "none"}}
      onClick={() => setter(color)}
    />
  );
};
