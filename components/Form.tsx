import React from "react";
import { useEffect, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Button from "./Button";
import * as ExcelJS from "exceljs";
import { Monitoring } from "@/types/Monitoring";
import { Stats } from "./Stats";
import Charts from "./Charts";

const people = [
  { name: "Metode httpx", value: "httpx", link: "http://127.0.0.1:8000/httpx" },
  {
    name: "Metode Async Httpx",
    value: "asynchttpx",
    link: "http://127.0.0.1:8000/asynchttpx",
  },
  {
    name: "Metode Thread Httpx",
    value: "threadhttpx",
    link: "http://127.0.0.1:8000/threadhttpx",
  },
  {
    name: "Metode Playwright",
    value: "playwright",
    link: "http://127.0.0.1:8000/playwright",
  },
  {
    name: "Metode Async Playwright Httpx",
    value: "playwrighthttpx",
    link: "http://127.0.0.1:8000/playwrighthttpx",
  },
  {
    name: "Metode Thread Selenium Httpx",
    value: "seleniumhttpx",
    link: "http://127.0.0.1:8000/seleniumhttpx",
  },
];

function Form() {
  const [selected, setSelected] = useState(people[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState<Monitoring | null>(null);

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

        const monitorings: Monitoring = {
          cpu_core: responseData.cpu_core,
          cpu_list: responseData.cpu_list,
          cpu_type: responseData.cpu_type,
          durasi: responseData.durasi,
          jumlah_data: responseData.jumlah_data,
          keyword: responseData.keyword,
          metode: responseData.metode,
          pagination: responseData.pagination,
          paket_download: responseData.paket_download,
          paket_internet: responseData.paket_internet,
          paket_upload: responseData.paket_upload,
          ram_list: responseData.ram_list,
          ram_tersedia: responseData.ram_tersedia,
          ram_total: responseData.ram_total,
          waktu_list: responseData.waktu_list,
        };

        setResult(monitorings);
        // Lakukan tindakan lain dengan responseData
        handleExportToExcel(responseData);
        window.scroll({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
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

  useEffect(() => {
    // Scroll otomatis ketika result berubah
    if (result) {
      window.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [result]);

  return (
    <>
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="container mx-auto bg-gray-900 rounded-lg p-14">
          <h1 className="text-center font-bold text-green-500 text-4xl">
            Scraping yang optimal, gunakan Kikisan.site!
          </h1>
          <p className="mx-auto font-normal text-center text-white text-base my-6 max-w-5xl">
            Kikisan.site adalah sebuah platform yang menyediakan metode scraping
            yang efektif dan efisien untuk mengambil data produk pada platform
            Tokopedia. Dengan menggunakan Kikisan.site, Anda dapat menguji
            teknik scraping dengan enam metode yang telah disediakan.
            Kikisan.site dapat mengakses dan melakukan scraping pada halaman
            pencarian produk, halaman detail produk, dan halaman toko pada
            platform Tokopedia. Setelah proses scraping selesai, hasilnya akan
            tersedia dalam format data Excel yang diunduh secara otomatis.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative w-1/3">
                  <Listbox.Button className="relative w-full cursor-default rounded-l-lg bg-green-500  py-3 pl-3 pr-10 text-left shadow-xl focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-white font-bold">
                      {selected.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-white"
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {people.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-green-500 text-gray-100"
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
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900">
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

              <div className="relative w-full rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">
                    <MagnifyingGlassIcon className="w-6" />
                  </span>
                </div>
                <input
                  type="text"
                  id="keyword"
                  className="block w-full rounded-r-lg border-0 py-2.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
                  placeholder="Scraping ke Tokopedia"
                  required
                  {...register("keyword")}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <input
                    type="number"
                    id="pagination"
                    className="block w-24 shadow-md rounded-md text-center font-semibold border-0 py-1 pl-3 pr-3 mr-4 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
                    placeholder="0"
                    defaultValue={1}
                    required
                    {...register("pages", { valueAsNumber: true })}
                    onChange={(e) => {
                      const value = Number(e.target.value); // Convert value to a number
                      if (value < 0 || isNaN(value)) {
                        e.target.value = "0";
                      } else if (value > 100) {
                        e.target.value = "100";
                      }
                    }}
                  />
                </div>
              </div>

              <Button type="submit" isLoading={isLoading} />
            </div>
          </form>
          {/* {JSON.stringify(result)} */}
        </div>
      </div>
      {result && <Charts monitoring={result} />}
      {result && <Stats monitoring={result} />}
    </>
  );
}

const handleExportToExcel = (data: any) => {
  const updatedData = data.hasil.map((item: any, index: any) => {
    const updatedItem = { ...item };
    updatedItem.no = index + 1;
    updatedItem.produk_details = JSON.stringify(updatedItem.produk_details);
    updatedItem.produk_items = JSON.stringify(updatedItem.produk_items);
    return updatedItem;
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  // Menambahkan kolom "No" di awal data
  const dataWithNo = updatedData.map((item: any) => {
    const { no, ...rest } = item;
    return { No: no, ...rest };
  });

  // Mengisi header dan data ke worksheet
  const headerRow = worksheet.getRow(1);
  headerRow.height = 50; // Mengatur ukuran tinggi baris header menjadi 30
  Object.keys(dataWithNo[0]).forEach((header, index) => {
    const cell = headerRow.getCell(index + 1);
    cell.value = header;
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ff41b549" }, // Background color
    };
    cell.border = {
      top: { style: "medium" },
      left: { style: "medium" },
      bottom: { style: "medium" },
      right: { style: "medium" },
    };
    cell.alignment = {
      wrapText: true,
      vertical: "middle",
      horizontal: "center",
    };
    cell.font = {
      bold: true,
      color: { argb: "FFFFFFFF" }, // White color
    };
    // Menentukan ukuran kolom header
    if (header === "No") {
      worksheet.getColumn(index + 1).width = 10; // Ukuran lebih kecil untuk kolom "No"
    } else if (
      header === "produk_harga" ||
      header === "produk_terjual" ||
      header === "produk_rating" ||
      header === "produk_diskon" ||
      header === "produk_harga_sebelum_diskon"
    ) {
      worksheet.getColumn(index + 1).width = 20; // Ukuran lebih kecil untuk kolom "No"
    } else {
      worksheet.getColumn(index + 1).width = 50; // Ukuran default untuk kolom lainnya
    }
  });

  dataWithNo.forEach((item: any, rowIndex: any) => {
    const row = worksheet.addRow(Object.values(item));
    row.eachCell((cell, cellNumber) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      // Mengatur alignment pada sel-sel body tertentu
      if (
        cellNumber === 1 ||
        cellNumber === 4 ||
        cellNumber === 5 ||
        cellNumber === 6 ||
        cellNumber === 7 ||
        cellNumber === 8
      ) {
        cell.alignment = {
          wrapText: false,
          vertical: "middle",
          horizontal: "center",
        };
      } else {
        cell.alignment = {
          wrapText: true,
          vertical: "middle",
          horizontal: "left",
        };
      }
    });
    // Mengatur ukuran tinggi baris
    row.height = 50; // Mengatur tinggi baris menjadi 25
  });

  // Mengatur lebar kolom otomatis
  worksheet.columns.forEach((column) => {
    column.width = Math.max(5, column.width!);
  });

  // Menghasilkan file Excel
  workbook.xlsx.writeBuffer().then((buffer) => {
    const excelData = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const excelUrl = URL.createObjectURL(excelData);
    const link = document.createElement("a");
    link.href = excelUrl;
    link.download = data.keyword + ".xlsx";
    link.click();
  });
};

export default Form;