
export const metadata = {
    title: 'Chatter || Description ',
    description: "Discover new ideas and share your own on Chatter, a dynamic platform for information exchange, discussion, and connection.",
  };

  export default function BlogLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
       {children}
    </div>
  )
}

