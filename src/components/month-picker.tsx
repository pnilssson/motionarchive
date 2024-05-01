'use client';

import { Flex, Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const months = [
  { name: 'January', value: 1 },
  { name: 'February', value: 2 },
  { name: 'March', value: 3 },
  { name: 'April', value: 4 },
  { name: 'May', value: 5 },
  { name: 'June', value: 6 },
  { name: 'July', value: 7 },
  { name: 'August', value: 8 },
  { name: 'September', value: 9 },
  { name: 'October', value: 10 },
  { name: 'November', value: 11 },
  { name: 'December', value: 12 },
];

function getYears() {
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
}

export default function Component({
  monthName,
  year,
}: {
  monthName: string;
  year: number;
}) {
  const router = useRouter();
  const handleMonthChange = (month: string) => {
    router.push(
      `/archive/calendar/${year}/${months.find((m) => m.name === month)?.value}`,
    );
  };

  const handleYearChange = (newYear: string) => {
    router.push(
      `/archive/calendar/${newYear}/${months.find((m) => m.name === monthName)?.value}`,
    );
  };

  return (
    <>
      <Select.Root
        size="2"
        defaultValue={monthName}
        onValueChange={handleMonthChange}
      >
        <Select.Trigger />
        <Select.Content position="popper" style={{ maxHeight: 200 }}>
          {months.map((type: any) => (
            <Select.Item key={type.value} value={type.name}>
              {type.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Select.Root
        size="2"
        defaultValue={year.toString()}
        onValueChange={handleYearChange}
      >
        <Select.Trigger />
        <Select.Content position="popper" style={{ maxHeight: 200 }}>
          {getYears().map((year: any) => (
            <Select.Item key={year} value={year.toString()}>
              {year}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </>
  );
}
