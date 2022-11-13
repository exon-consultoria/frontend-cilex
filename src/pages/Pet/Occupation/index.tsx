import * as S from './styles'
import { FaDog } from 'react-icons/fa'
import { IEnclosure } from 'types/pet/enclosure'

interface OccupationType {
  enclosure: IEnclosure
}

const Dogs = ({size,available,index}) => {
  const unavailable = Number(size) - Number(available)
  const difference = unavailable > index

  return (
    <S.Content>
      <S.Field key={index}>
        <FaDog size={30} color={difference ? 'red' : 'green'} />
        <p>{index + 1}</p>
      </S.Field>
    </S.Content>
  )
}


export const Occupation:React.FC<OccupationType> = ({enclosure}) => {
  const { 
    enclosure_size_big,
    enclosure_size_big_available,
    enclosure_size_medium,
    enclosure_size_medium_available,
    enclosure_size_small,
    enclosure_size_small_available
  } = enclosure || {}

  const big = Array.from({ length: enclosure_size_big }, (_, index) => (
    <Dogs
      key={index}
      size={enclosure_size_big}
      available={enclosure_size_big_available}
      index={index}
    />
  ))

  const medium = Array.from({ length: enclosure_size_medium }, (_, index) => (
    <Dogs
      key={index}
      size={enclosure_size_medium}
      available={enclosure_size_medium_available}
      index={index}
    />
  ))

  const small = Array.from({ length: enclosure_size_small }, (_, index) => (
    <Dogs
      key={index}
      size={enclosure_size_small}
      available={enclosure_size_small_available}
      index={index}
    />
  ))


  return (
    <S.Container>
      <div style={{display: 'flex',gap: '20px', alignItems: 'center',height: '50px'}}>
        <S.SizeText>
        Grande:
        </S.SizeText>
        {big}
      </div>
      <div style={{display: 'flex',gap: '20px', alignItems: 'center',height: '50px'}}>
        <S.SizeText>
        Médio:
        </S.SizeText>
        {medium}
      </div>
      <div style={{display: 'flex',gap: '20px', alignItems: 'center',height: '50px',marginBottom: '20px'}}>
        <S.SizeText>
        Pequeno:
        </S.SizeText>
        {small}
      </div>
    </S.Container>
  )
}