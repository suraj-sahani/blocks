"use client"

import { ADD_PARKING_SCHEMA } from "@/lib/schema"
import { FieldInfo, useAppForm } from "."
import * as z from "zod"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useForm } from "@tanstack/react-form"
import { Button } from "../ui/button"
import AddressSearch from "../address-search"

type AddParking = z.infer<typeof ADD_PARKING_SCHEMA>

export default function AddParkingAreaForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      description: "",
      zipcode: ""
    } as AddParking,
    validators: {
      onSubmit: ADD_PARKING_SCHEMA
    },
    onSubmit: ({ value }) => {
      console.log(value)
    }
  })

  console.log(form.state.errors)

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.handleSubmit()
    }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-md"
    >
      <form.Field
        name="name"
        children={(field) => {
          const fieldName = field.name.charAt(0).toLocaleUpperCase().concat(field.name.slice(1))
          return <div className="space-y-1">
            <Label htmlFor={field.name}>{fieldName}</Label>
            <Input
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)} />
            <FieldInfo field={field} />
          </div>
        }
        } />
      <form.Field
        name="description"
        children={(field) => {
          const fieldName = field.name.charAt(0).toLocaleUpperCase().concat(field.name.slice(1))
          return <div className="space-y-1">
            <Label htmlFor={field.name}>{fieldName}</Label>
            <Input
              name={field.name}
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)} />
            <FieldInfo field={field} />
          </div>
        }
        } />

      <form.Field
        name="address"
        children={(field) => {
          const fieldName = field.name.charAt(0).toLocaleUpperCase().concat(field.name.slice(1))
          return <div className="space-y-1">
            <Label htmlFor={field.name}>{fieldName}</Label>
            <AddressSearch />
            <FieldInfo field={field} />
          </div>
        }
        } />


      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" variant={'default'} disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      />
    </form>
  )
}
