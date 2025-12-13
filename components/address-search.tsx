"use client";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Spinner } from "./ui/spinner";
import { Activity, ChangeEvent, useEffect, useRef, useState } from "react";
import useDebounce from "@/lib/hooks/useDebounce";
import { MapPinPlus } from "lucide-react";

type Predictions = google.maps.places.AutocompletePrediction[];
type AutoCompleteService = google.maps.places.AutocompleteService;
type PlaceResult = google.maps.places.PlaceResult;
type Props = {
  onPlaceSelect: (place: PlaceResult) => void;
  onSearchChange: (e: string) => void;
  value?: string;
};
const AddressSearch = ({ onPlaceSelect, value, onSearchChange }: Props) => {
  const autoCompleteInst = useRef<AutoCompleteService>(null);
  const [suggestions, setSuggestions] = useState<Predictions>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const opts = setOptions({ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY });

    const mapInst = (async () => {
      try {
        const lib = await importLibrary("places");
        autoCompleteInst.current = new google.maps.places.AutocompleteService();
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      if (autoCompleteInst.current) autoCompleteInst.current = null;
    };
  }, []);

  useEffect(() => {
    if (!autoCompleteInst.current || !debouncedSearch) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    const request: google.maps.places.AutocompletionRequest = {
      input: debouncedSearch,
      types: ["geocode", "establishment"],
      componentRestrictions: { country: "us" },
    };

    autoCompleteInst.current.getPlacePredictions(
      request,
      (
        predictions: google.maps.places.AutocompletePrediction[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        setIsLoading(false);
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
          // console.error('Places Autocomplete error:', status);
        }

        setShowSuggestions(true);
      }
    );
  }, [debouncedSearch]);

  const handlePlaceSelect = async (place: Predictions[number]) => {
    try {
      const mockDiv = document.createElement("div");
      const placeService = new google.maps.places.PlacesService(mockDiv);
      placeService.getDetails({ placeId: place.place_id }, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          onPlaceSelect(result);
        } else {
          console.error(`Error fetching place details:`, status);
        }
      });

      setShowSuggestions(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <InputGroup>
        <InputGroupInput
          disabled={isLoading}
          placeholder={isLoading ? "Searching..." : "Search"}
          value={value || ""}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setSearch(e.target.value.trim());
          }}
          onFocus={() => {
            if (!isLoading && suggestions.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => setShowSuggestions(false)}
        />

        <InputGroupAddon align="inline-start">
          <MapPinPlus />
        </InputGroupAddon>

        <InputGroupAddon align="inline-end">
          <Activity mode={isLoading ? "visible" : "hidden"}>
            <Spinner />
          </Activity>
        </InputGroupAddon>
      </InputGroup>

      <Activity
        mode={suggestions.length > 0 && showSuggestions ? "visible" : "hidden"}
      >
        <ul className="absolute z-10 p-1 rounded-md bg-white shadow space-y-1 top-[110%]">
          {suggestions.map((suggestion) => (
            <li
              className="hover:bg-neutral-200 transition-all duration-200 p-1 rounded-md cursor-pointer text-xs font-semibold"
              key={suggestion.place_id}
              onMouseDown={async () => {
                await handlePlaceSelect(suggestion);
              }}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      </Activity>

      <Activity
        mode={
          !isLoading &&
          debouncedSearch &&
          suggestions.length === 0 &&
          showSuggestions
            ? "visible"
            : "hidden"
        }
      >
        <p className="text-xs font-semibold absolute z-10 p-1 text-center shadow bg-white top-[110%] w-full rounded-md">
          No results found.
        </p>
      </Activity>
    </div>
  );
};

export default AddressSearch;
