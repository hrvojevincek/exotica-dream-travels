const TimelineItem = ({
  day,
  location,
  description,
  isLast,
}: {
  day: number;
  location: string;
  description: string;
  isLast: boolean;
}) => (
  <div className="flex gap-4 -mt-1.5">
    {/* Left side with dot and line */}
    <div className="flex flex-col items-center relative">
      <div className="size-3 rounded-full bg-black mt-1.5"></div>
      {!isLast && <div className="w-0.5 h-full bg-black"></div>}
    </div>

    {/* Right side content */}
    <div className="pb-8">
      <h3>
        Day {day}: {location}
      </h3>
      <p className="text-custom-text-gray">{description}</p>
    </div>
  </div>
);

export default TimelineItem;
