import { Link as RouterLink, useParams } from 'react-router-dom'
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
  const { appchain } = useParams()

  return (
    <Link as={RouterLink} to={`/${appchain}${to}`} color={color}>
      {children}
    </Link>
  )
}
