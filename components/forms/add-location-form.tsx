"use client";
import React from "react";
import ImageUpload from "@/components/image-upload";
import { AutoComplete } from "@/components/ui/autocomplete";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import Spinner from "../spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AddlocationForm = () => {
  const [locationImages, setLocationImages] = React.useState<File[]>([]);
  const [disable, setDisable] = React.useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });
  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <form className="space-y-2 flex flex-col w-sm max-w-sm">
        <div className="space-y-1">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Location Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ev">EV Charging Station</SelectItem>
              <SelectItem value="parking">Parking Area</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Input placeholder="Location Name" />
        </div>

        <div className="space-y-1">
          <Textarea placeholder="Description" />
        </div>

        <div className="space-y-1">
          <Input placeholder="Address" />
        </div>

        <div className="space-y-1">
          <Input placeholder="Total Slots" />
        </div>

        <div className="space-y-1">
          <ImageUpload
            multiple={true}
            uploadedImages={locationImages}
            setUploadedImages={setLocationImages}
          />
        </div>

        <Button
          type="submit"
          className="h-10 rounded-xl mt-2 justify-self-end"
          disabled={disable}
        >
          {disable && <Spinner />}
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddlocationForm;
