import React from "react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Button from "./Button";

const people = [
  { name: "Metode httpx", value: "httpx", link: "http://127.0.0.1:8000/httpx" },
  {
    name: "Metode Async Httpx",
    value: "Httpx",
    link: "http://127.0.0.1:8000/httpx",
  },
  {
    name: "Metode Thread Httpx",
    value: "Htt",
    link: "http://127.0.0.1:8000/httpx",
  },
  {
    name: "Metode Playwright",
    value: "Ht",
    link: "http://127.0.0.1:8000/httpx",
  },
  {
    name: "Metode Playwright Httpx",
    value: "H",
    link: "http://127.0.0.1:8000/httpx",
  },
  {
    name: "Metode Selenium Httpx",
    value: "x",
    link: "http://127.0.0.1:8000/httpx",
  },
];

function Form() {
  const [selected, setSelected] = useState(people[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    data.metode = selected.value;
    setIsLoading(true);
    try {
      const response = await fetch(selected.link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        handleExport(responseData.hasil);
        // Lakukan tindakan lain dengan responseData
      } else {
        console.error("Request failed with status:", response.status);
        // Lakukan penanganan kesalahan jika diperlukan
      }
    } catch (error) {
      console.error("Error:", error);
      // Lakukan penanganan kesalahan jika diperlukan
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="container mx-auto bg-indigo-100 rounded-lg p-14">
        <h1 className="text-center font-bold text-gray-900 text-4xl">
          Kikisan dapat mengambil data secara optimal
        </h1>
        <p className="mx-auto font-normal text-center text-gray-900 text-sm my-6 max-w-lg">
          Kikisan adalah website untuk mengambil data produk tokopedia dengan
          teknik scraping dengan beberapa metode yang telah disediakan.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <div className="w-1/4">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-l-lg bg-white py-2.5 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {people.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {person.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="relative w-full">
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </span>
                </div>
                <input
                  type="text"
                  id="keyword"
                  className="block w-full rounded-r-lg border-0 py-2.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Scrape di Tokopedia"
                  required
                  {...register("keyword")}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <input
                    type="number"
                    id="pagination"
                    className="block w-20 shadow-md rounded-md text-center border-0 py-1 pl-3 pr-3 mr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0"
                    defaultValue={1}
                    {...register("pages", { valueAsNumber: true })}
                    onChange={(e) => {
                      const value = Number(e.target.value); // Convert value to a number
                      if (value < 1 || isNaN(value)) {
                        e.target.value = "1";
                      } else if (value > 100) {
                        e.target.value = "100";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}

const handleExport = (hasil: any) => {
  const json = JSON.stringify(hasil);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.json";
  a.click();
  URL.revokeObjectURL(url);
};

export default Form;
