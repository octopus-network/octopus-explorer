import { IconButton, Icon, useClipboard } from '@chakra-ui/react'
import { CheckIcon, CopyIcon } from '@chakra-ui/icons'

const CopyButton = ({ value }) => {
  const { hasCopied, onCopy } = useClipboard(value)
  return (
    <IconButton
      background="transparent"
      aria-label="copy"
      onClick={onCopy}
      backgroundColor="gray.300"
      width={30}
      height={30}
      minWidth={30}
      borderRadius="50%"
      ml={1}
      icon={<Icon as={hasCopied ? CheckIcon : CopyIcon} boxSize={4} />}
    />
  )
}
export default CopyButton
