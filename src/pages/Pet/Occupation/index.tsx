import * as S from './styles'
import { FaDog } from 'react-icons/fa'
import { IEnclosure, IEnclosureSizes } from 'types/pet/enclosure'

interface OccupationType {
  enclosure: IEnclosure
}

const Dogs = ({size,capacity,available = '0'}:IEnclosureSizes) => {
  const unavailable = Number(capacity) - Number(available)
  const total = Array(Number(capacity)).fill(0)



  return (
    <S.Content>
      {size.toUpperCase()} 
      {total.map((_,index) =>{
        const difference = unavailable > index
        return (
          <S.Field key={index}>
            <FaDog size={30} color={difference ? 'red' : 'green'} />
            <p>{index + 1}</p>
          </S.Field>
        )
      })}
      
    </S.Content>
  )
}


export const Occupation:React.FC<OccupationType> = ({enclosure}) => {
  const { enclosure_size = []} = enclosure || {}
  

  return (
    <S.Container>
      {enclosure_size.map((enclosureSize,index) => (
        <Dogs
          key={index}
          size={enclosureSize.size}
          capacity={enclosureSize.capacity}
          available={enclosureSize.available}
        />
      ))}
    </S.Container>
  )
}