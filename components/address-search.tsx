"use client"
import { setOptions, importLibrary } from "@googlemaps/js-api-loader"

import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { Spinner } from "./ui/spinner"
import { Activity, useEffect, useRef, useState } from "react"
import useDebounce from "@/lib/hooks/useDebounce"

type Predictions = google.maps.places.AutocompletePrediction[]
type AutoCompleteService = google.maps.places.AutocompleteService
type Props = {
  onPlaceSelect: (place: Predictions[number]) => void
}
const AddressSearch = ({ onPlaceSelect }: Props) => {
  const autoCompleteInst = useRef<AutoCompleteService>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search)
  const [suggestions, setSuggestions] = useState<Predictions>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const opts = setOptions({ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY })

    const mapInst = (async () => {
      try {
        const lib = await importLibrary('places')
        autoCompleteInst.current = new google.maps.places.AutocompleteService()

      } catch (error) {
        console.error(error)
      }
    })();

    return () => {
      if (autoCompleteInst.current) autoCompleteInst.current = null
    }
  }, [])

  useEffect(() => {
    if (!autoCompleteInst.current || !debouncedSearch) {
      // setSuggestions([]);
      return;
    }

    setIsLoading(true);

    const request: google.maps.places.AutocompletionRequest = {
      input: debouncedSearch,
      types: ['geocode', 'establishment'],
      componentRestrictions: { country: 'us' },
    };

    autoCompleteInst.current.getPlacePredictions(
      request,
      (predictions: google.maps.places.AutocompletePrediction[] | null, status: google.maps.places.PlacesServiceStatus) => {
        setIsLoading(false);
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
          // console.error('Places Autocomplete error:', status);
        }

        setShowSuggestions(true)
      },
    );
  }, [debouncedSearch]);


  return (
    <div className="relative">
      <InputGroup>
        <InputGroupInput
          placeholder={isLoading ? "Searching..." : "Search"}
          ref={inputRef}
          onChange={e => setSearch(e.target.value.trim())}
          onFocus={() => {
            if (!isLoading && suggestions.length > 0) setShowSuggestions(true)
          }}
          onBlur={() => setShowSuggestions(false)}
        />
        <InputGroupAddon align="inline-end">
          <Activity mode={isLoading ? "visible" : "hidden"}>
            <Spinner />
          </Activity>
        </InputGroupAddon>
      </InputGroup>

      <Activity mode={suggestions.length > 0 && showSuggestions ? "visible" : "hidden"}>
        <ul className="absolute z-10 p-1 rounded-md bg-white shadow space-y-1 top-[110%]">
          {suggestions.map((suggestion) => (
            <li
              className="hover:bg-neutral-200 transition-all duration-200 p-1 rounded-md cursor-pointer text-xs font-semibold"
              key={suggestion.place_id}
              onClick={() => {
                onPlaceSelect(suggestion)
                setShowSuggestions(false)
              }}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      </Activity>

      <Activity
        mode={!isLoading && debouncedSearch && suggestions.length === 0 && showSuggestions
          ?
          "visible"
          :
          "hidden"}>
        <p className="text-xs font-semibold absolute z-10 p-1 text-center shadow bg-white top-[110%] w-full rounded-md">No results found.</p>
      </Activity>
    </div>
  )
}

export default AddressSearch
