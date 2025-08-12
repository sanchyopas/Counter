type ButtonType = {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({onClick, disabled, children, className}:ButtonType) => {
  return (
    <>
      <button type="button"
              className={`${className ?? ''} btn`}
              onClick={onClick}
              disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};
