"use client";

import { ADD_PARKING_SCHEMA } from "@/lib/schema";
import { AddParkingAreaSchema, City, State } from "@/lib/types";
import { formatTime, parseTime } from "@/lib/utils";
import { useForm, useStore } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldInfo } from ".";
import AddressSearch from "../address-search";
import { AutoComplete } from "../ui/auto-complete";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ImageUpload from "../upload";
import {
  addParkingArea,
  addParkingAreaImages,
} from "@/lib/action/location.action";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";
import { uploadImageToImageKit } from "@/lib/imagekit";
import { IMAGEKIT_FOLDERS } from "@/lib/constants";

type Props = {
  states: State[];
};

export default function AddParkingAreaForm({ states }: Props) {
  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      description: "",
      zipcode: "",
      openingTime: new Date(),
      closingTime: new Date(),
      images: [] as File[],
    } as AddParkingAreaSchema,
    validators: {
      onSubmit: ADD_PARKING_SCHEMA,
    },
    onSubmit: ({ value }) => {
      mutate(value);
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

  const { mutate, isPending } = useMutation({
    mutationFn: async (schema: AddParkingAreaSchema) => {
      const {
        success: isParkingAreaSuccess,
        data: parkingArea,
        message: parkingAreaMessage,
      } = await addParkingArea(schema);

      if (!isParkingAreaSuccess || !parkingArea) {
        return {
          success: false,
          message: parkingAreaMessage,
        };
      }

      if (Array.isArray(schema.images) && schema.images.length > 0) {
        const {
          success: imageUploadSuccess,
          data: uploadedImages,
          message: uploadImageMessage,
        } = await uploadImageToImageKit(
          schema.images,
          IMAGEKIT_FOLDERS.parking
        );

        if (!imageUploadSuccess || !uploadedImages) {
          return {
            success: false,
            message: uploadImageMessage,
          };
        }

        const {
          success: isParkingAreaImageSuccess,
          message: parkingAreaImageMessage,
          data: parkingAreaImages,
        } = await addParkingAreaImages(
          JSON.stringify(uploadedImages),
          parkingArea.id
        );

        if (!isParkingAreaImageSuccess || !parkingAreaImages) {
          return {
            success: false,
            message: parkingAreaImageMessage,
          };
        }

        return {
          success: true,
          message: "Parking area added successfully.",
          data: {
            ...parkingArea,
            images: parkingAreaImages,
          },
        };
      }

      return {
        success: true,
        message: "Parking area added successfully.",
        data: parkingArea,
      };
    },
    onSuccess: ({ success, message, data }) => {
      if (success) {
        console.log(data);
        toast.success(message);
        form.reset();
      } else {
        toast.error(message);
      }
    },
  });

  const cityList =
    data?.map((city) => ({
      label: city.name,
      value: city.name,
      id: city.id,
    })) || [];

  const formattedStates = states.map((state) => ({
    label: `${state.name}(${state.abbreviation})`,
    value: state.name,
    id: state.id,
  }));

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
                  const { geometry, address_components } = place;

                  const location = geometry?.location
                    ? {
                        lat: geometry.location.lat(),
                        lng: geometry.location.lng(),
                      }
                    : undefined;

                  if (location?.lat)
                    form.setFieldValue("latitude", location.lat);
                  if (location?.lng)
                    form.setFieldValue("longitude", location.lng);

                  if (address_components) {
                    for (const comp of address_components) {
                      if (comp.types.includes("postal_code"))
                        form.setFieldValue(
                          "zipcode",
                          comp.long_name || comp.short_name
                        );
                    }
                  }

                  const address = place.formatted_address;
                  if (address) field.handleChange(address || "");
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
        name="zipcode"
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
                type="text"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
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
            <Button
              type="submit"
              variant={"default"}
              disabled={!canSubmit || isSubmitting || isPending}
            >
              {isSubmitting || isPending ? <Spinner /> : "Submit"}
            </Button>
          </div>
        )}
      />
    </form>
  );
}
