"use client"

import { ADD_PARKING_SCHEMA } from "@/lib/schema"
import { useAppForm } from "."
import z from "zod"

type AddParking = z.infer<typeof ADD_PARKING_SCHEMA>

export default function AddParkingAreaForm() {
  const form = useAppForm({
    defaultValues: {} as AddParking,
    validators: {
      onChange: ADD_PARKING_SCHEMA
    },
    onSubmit: ({ value }) => {
      console.log(value)
    }
  })
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.handleSubmit()
    }}
      className="space-y-4"
    >
      <form.AppField name="name" children={(field) =>
        <div>
          <field.TextField />
        </div>
      } />

      <form.AppForm>
        <form.SubmitButton variant={"default"} />
      </form.AppForm>
    </form>
  )
}
