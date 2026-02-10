interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function IconButton({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="px-2 rounded-full hover:bg-gray-200 transition"
    >
      {children}
    </button>
  );
}
