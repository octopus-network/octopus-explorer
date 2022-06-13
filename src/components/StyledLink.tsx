import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import { Link } from '@chakra-ui/react'

export default function StyledLink({
  to,
  children,
  color = 'primary.600',
}: {
  to: string
  children: any
  color?: string
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const appchain = searchParams.get('appchain')

  return (
    <Link as={RouterLink} to={`${to}?appchain=${appchain}`} color={color}>
      {children}
    </Link>
  )
}
