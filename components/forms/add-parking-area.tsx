"use client";

import { ADD_PARKING_SCHEMA } from "@/lib/schema";
import { FieldInfo, useAppForm } from ".";
import * as z from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm, useStore } from "@tanstack/react-form";
import { Button } from "../ui/button";
import AddressSearch from "../address-search";
import { City, State } from "@/lib/types";
import { AutoComplete } from "../ui/auto-complete";
import { useQuery } from "@tanstack/react-query";
import ImageUpload from "../upload";

type Props = {
  states: State[];
};
type AddParking = z.infer<typeof ADD_PARKING_SCHEMA>;

export default function AddParkingAreaForm({ states }: Props) {
  const formattedStates = states.map((state) => ({
    label: `${state.name}(${state.abbreviation})`,
    value: state.name,
    id: state.id,
  }));
  const pad = (n: number) => String(n).padStart(2, "0");
  const formatTime = (d?: Date) => {
    const date = d ?? new Date();
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )}`;
  };

  const parseTime = (timeStr: string) => {
    const parts = timeStr.split(":").map((p) => Number(p));
    const now = new Date();
    const h = parts[0] ?? 0;
    const m = parts[1] ?? 0;
    const s = parts[2] ?? 0;
    now.setHours(h, m, s, 0);
    return now;
  };

  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      description: "",
      zipcode: "",
      openingTime: new Date(),
      closingTime: new Date(),
      images: [] as File[],
    } as AddParking,
    validators: {
      onSubmit: ADD_PARKING_SCHEMA,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  const stateID = useStore(form.store, (state) => state.values.state);

  const getCitiesForState = async (stateID: string): Promise<City[]> => {
    const res = await fetch(`/api/state/${stateID}/cities`);

    if (!res.ok) throw new Error(`Request failed with status:${res.status}`);

    const data: { success: boolean; data: City[] } = await res.json();

    return data.data;
  };

  const { data, isFetching } = useQuery({
    queryKey: [stateID],
    queryFn: () => getCitiesForState(stateID),
    enabled: stateID ? true : false,
  });

  const cityList =
    data?.map((city) => ({
      label: city.name,
      value: city.name,
      id: city.id,
    })) || [];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-md"
    >
      <form.Field
        name="name"
        children={(field) => {
          const fieldName = field.name
            .charAt(0)
            .toLocaleUpperCase()
            .concat(field.name.slice(1));
          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>{fieldName}</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />
      <form.Field
        name="description"
        children={(field) => {
          const fieldName = field.name
            .charAt(0)
            .toLocaleUpperCase()
            .concat(field.name.slice(1));
          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>{fieldName}</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />

      <form.Field
        name="address"
        children={(field) => {
          const fieldName = field.name
            .charAt(0)
            .toLocaleUpperCase()
            .concat(field.name.slice(1));
          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>{fieldName}</Label>
              <AddressSearch
                onSearchChange={(e) => field.handleChange(e)}
                value={field.state.value}
                onPlaceSelect={(place) => {
                  const location = place.geometry?.location
                    ? {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                      }
                    : undefined;

                  if (location?.lat)
                    form.setFieldValue("latitude", location.lat);
                  if (location?.lng)
                    form.setFieldValue("longitude", location.lng);

                  const address = place.formatted_address;
                  if (address) field.handleChange(address || "");
                  console.log({ location, address, avl: field.state.value });
                }}
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />

      <form.Field
        name="latitude"
        children={(field) => {
          const fieldName = field.name
            .charAt(0)
            .toLocaleUpperCase()
            .concat(field.name.slice(1));

          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>{fieldName}</Label>
              <Input
                name={field.name}
                type="number"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />
      <form.Field
        name="longitude"
        children={(field) => {
          const fieldName = field.name
            .charAt(0)
            .toLocaleUpperCase()
            .concat(field.name.slice(1));

          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>{fieldName}</Label>
              <Input
                name={field.name}
                type="number"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />

      <form.Field
        name="state"
        children={(field) => {
          const fieldName = field.name
            .charAt(0)
            .toLocaleUpperCase()
            .concat(field.name.slice(1));

          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>{fieldName}</Label>
              <AutoComplete
                key={field.name}
                options={formattedStates}
                placeholder="Select state"
                value={field.state.value}
                onSelectOption={(val) => {
                  const selectedState = states.find(
                    (state) => state.name === val
                  );
                  if (selectedState) field.handleChange(selectedState?.id);
                }}
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />

      <form.Field
        name="city"
        children={(field) => {
          const fieldName = field.name
            .charAt(0)
            .toLocaleUpperCase()
            .concat(field.name.slice(1));

          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>{fieldName}</Label>
              <AutoComplete
                key={field.name}
                options={cityList}
                placeholder="Select city"
                value={field.state.value}
                disabled={isFetching || !stateID}
                loading={isFetching}
                onSelectOption={(val) => {
                  const selectedCity = cityList.find(
                    (city) => city.label === val
                  );
                  if (selectedCity) field.handleChange(selectedCity.id);
                }}
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />

      <form.Field
        name="totalSlots"
        children={(field) => {
          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Total Slots</Label>
              <Input
                name={field.name}
                type="number"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              <FieldInfo field={field} />
            </div>
          );
        }}
      />

      <form.Field
        name="openingTime"
        children={(field) => {
          const timeStr = formatTime(field.state.value as Date | undefined);
          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Opening Time</Label>
              <div className="flex items-center gap-2">
                <Input
                  name={field.name}
                  type="time"
                  step={1}
                  value={timeStr}
                  onChange={(e) => {
                    const openingTime = parseTime(e.target.value);
                    field.handleChange(openingTime);
                  }}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
              <FieldInfo field={field} />
            </div>
          );
        }}
      />

      <form.Field
        name="closingTime"
        children={(field) => {
          const timeStr = formatTime(field.state.value as Date | undefined);
          return (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Closing Time</Label>
              <div className="flex items-center gap-2">
                <Input
                  name={field.name}
                  type="time"
                  step={1}
                  value={timeStr}
                  onChange={(e) => {
                    const closingTime = parseTime(e.target.value);
                    console.log(closingTime);
                    field.handleChange(closingTime);
                  }}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
              <FieldInfo field={field} />
            </div>
          );
        }}
      />

      <form.Field
        name="images"
        children={(field) => (
          <div className="col-span-2">
            <ImageUpload
              multiple
              onChange={(e) => field.handleChange(e)}
              value={field.state.value || []}
            />
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <div className="col-span-2 flex items-center justify-end">
            <Button type="submit" variant={"default"} disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          </div>
        )}
      />
    </form>
  );
}
