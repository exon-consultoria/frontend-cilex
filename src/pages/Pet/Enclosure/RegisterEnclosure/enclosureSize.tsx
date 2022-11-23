import { InputFormik} from 'components'

export const EnclosureSize = ({handleChange,values,errors,touched}:any) => {
  return (
    <>
      {values.size === 'p' ? (
        <div id='align-inputs'>
          <InputFormik
            style={{width: '100%'}}
            name="enclosure_size_small"
            type="text"
            placeholder="Capacidade Pequeno"
            value={values.enclosure_size_small}
            onChange={handleChange('enclosure_size_small')}
            messageError={
              errors.enclosure_size_small && touched.enclosure_size_small ? errors.enclosure_size_small : ''
            }
            maxLength={6}
          />
          <InputFormik
            style={{width: '100%'}}
            name="enclosure_size_small_available"
            type="text"
            placeholder="Capacidade Disponível"
            value={values.enclosure_size_small_available}
            onChange={handleChange('enclosure_size_small_available')}
            messageError={
              errors.enclosure_size_small_available && touched.enclosure_size_small_available ? errors.enclosure_size_small_available : ''
            }
            maxLength={6}
          />
        </div>
      ): null}
      {values.size === 'm' ? (
        <div id='align-inputs'>
          <InputFormik
            name="enclosure_size_medium"
            type="text"
            placeholder="Capacidade Médio"
            value={values.enclosure_size_medium}
            onChange={handleChange('enclosure_size_medium')}
            messageError={
              errors.enclosure_size_medium && touched.enclosure_size_medium ? errors.enclosure_size_medium : ''
            }
            maxLength={6}
          />
          <InputFormik
            name="enclosure_size_medium_available"
            type="text"
            placeholder="Capacidade Disponível"
            value={values.enclosure_size_medium_available}
            onChange={handleChange('enclosure_size_medium_available')}
            messageError={
              errors.enclosure_size_medium_available && touched.enclosure_size_medium_available ? errors.enclosure_size_medium_available : ''
            }
            maxLength={6}
          />
        </div>
      ): null}
      {values.size === 'g' ? (
        <div id='align-inputs'>
          <InputFormik
            name="enclosure_size_big"
            type="text"
            placeholder="Capacidade Grande"
            value={values.enclosure_size_big}
            onChange={handleChange('enclosure_size_big')}
            messageError={
              errors.enclosure_size_big && touched.enclosure_size_big ? errors.enclosure_size_big : ''
            }
            maxLength={6}
          />
          <InputFormik
            name="enclosure_size_big_available"
            type="text"
            placeholder="Capacidade Disponível"
            value={values.enclosure_size_big_available}
            onChange={handleChange('enclosure_size_big_available')}
            messageError={
              errors.enclosure_size_big_available && touched.enclosure_size_big_available ? errors.enclosure_size_big_available : ''
            }
            maxLength={6}
          />
        </div>
      ): null}
    </>
  )
}