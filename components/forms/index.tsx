import { type AnyFieldApi, createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { Input, InputProps } from '../ui/input'
import { Button, ButtonProps } from '../ui/button'
import { ComponentProps, HTMLAttributes } from 'react'
import { ZodError } from 'zod'

const { fieldContext, formContext } = createFormHookContexts()

const TextField = (props: InputProps) => <Input {...props} />
const NumberField = (props: InputProps) => <Input {...props} type='number' />
const SubmitButton = (props: ButtonProps) => <Button type='submit'>Submit</Button>

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField, NumberField
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})

const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
  return <>
    {field.state.meta.isTouched && !field.state.meta.isValid ?
      <p className='text-xs font-medium text-red-500'>{field.state.meta.errors.map((error: ZodError) => error.message).join(', ')}</p>
      : null
    }
  </>
}

export { useAppForm, FieldInfo }

