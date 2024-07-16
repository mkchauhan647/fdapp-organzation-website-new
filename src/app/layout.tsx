export const metadata = {
  title: 'FDAPP',
  description:"The premier platform for organizing and managing contestant voting events with ease and efficiency. Whether you're running a talent competition, a popularity contest, or an election, FDApp provides you with all the tools you need to engage your audience, streamline the voting process, and make your event a resounding success.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
