'use client'

import {useMemo} from 'react'
import {LiveQueryProvider} from 'next-sanity/preview'
import {getClient} from 'utils/sanity.client'


interface PreviewProviderProps {
  children: React.ReactNode
  token: string
}

export default function PreviewProvider({
  children,
  token,
}: PreviewProviderProps) {
  const client = useMemo(() => getClient({token}), [token])
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>
}