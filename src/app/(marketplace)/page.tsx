import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRoundIcon } from "lucide-react";
import Image from "next/image";

type Category = {
  image: string;
  name: string;
  main: string;
  sub: string;
  subelements: {
    label: string;
    value: string;
  }[];
  domain: string;
};

// const categories: Category[] = [
//   {
//     image: "https://picsum.photos/200/300",
//     name: "Cars",
//     main: "Cars",
//     sub: "",
//     subelements: [
//       {
//         label: "Cars",
//         value: "Cars",
//       },
//     ],
//   },
// ];

const cars = Array.from({ length: 256 }, (_, i) => ({
  id: i,
  brand: "Brand " + i,
  model: "Model " + i,
  price: 10000 + i * 1000,
  location: "Location " + i,
  image: "https://picsum.photos/200/300",
  year: 2020 + i,
  mileage: 10000 + i * 1000,
  transmission: "Transmission " + i,
}));

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cars.map((car) => (
        <div key={car.id} className="grid gap-2">
          <div className="aspect-video bg-gray-100 rounded-lg relative">
            {/* <Image
              src={car.image}
              alt={car.brand}
              fill
              className="object-cover rounded-lg"
            /> */}
          </div>
          <div className="">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">${car.price}</h3>
                <p className="text-sm text-muted-foreground">{car.model}</p>
              </div>
              <Avatar>
                <AvatarFallback>
                  <UserRoundIcon className="text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <p className="">{car.year}</p>
              <p className="">{car.mileage}</p>
              <p className="">{car.transmission}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
