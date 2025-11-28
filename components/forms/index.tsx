import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { Input, InputProps } from '../ui/input'
import { Button, ButtonProps } from '../ui/button'
import { ComponentProps, HTMLAttributes } from 'react'

const { fieldContext, formContext } = createFormHookContexts()

const TextField = (props: InputProps) => <Input {...props} />
const NumberField = (props: InputProps) => <Input {...props} type='number' />
const SubmitButton = (props: ButtonProps) => <Button type='submit'>Submit</Button>

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField, NumberField
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})


