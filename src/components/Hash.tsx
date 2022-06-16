import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Tooltip } from '@chakra-ui/react'

const StyledBlock = styled.span<{ colorHex; width; height }>`
  height: ${({ height }) => height}px;
  display: inline-block;
  width: ${({ width }) => width}px;
  background: ${({ colorHex }) => `#${colorHex}`};
`

const Hash = ({
  value,
  style,
  blockWidth = 3,
  blockHeight = 10,
}: {
  value: string
  style?: object
  blockWidth?: number
  blockHeight?: number
}) => {
  if (!value) {
    value = ''
  }
  if (value.substr(0, 2) != '0x') {
    value = '0x' + value
  }
  const [hashArr, setHashArr] = useState([])
  useEffect(() => {
    const tmpArr = []
    for (let i = 2; i < value.length - 2; i += 6) {
      tmpArr.push(value.substr(i, 6))
    }
    setHashArr(tmpArr)
  }, [value])

  return (
    <Tooltip label={value}>
      <span style={style}>
        <span>{value.substr(0, 4)}</span>
        {hashArr.map((hex, idx) => (
          <StyledBlock
            colorHex={hex}
            key={idx}
            width={blockWidth}
            height={blockHeight}
          />
        ))}
        <span>{value.substr(-2)}</span>
      </span>
    </Tooltip>
  )
}

export default Hash
