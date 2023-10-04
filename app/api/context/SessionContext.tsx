import { SessionProvider } from "next-auth/react"

export default function SessionContext({
  Component,
  pageProps: { session, ...pageProps },
}:any) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}