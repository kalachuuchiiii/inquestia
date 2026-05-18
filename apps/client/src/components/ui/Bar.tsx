const Bar = ({ target = 0, total = 0 }) => {
  const percentage = (total / target) * 100;
  const progress = `${percentage}%`;

  return (
    <div className="w-full h-8 space-y-1 text-sm">
      <p className="text-xs w-full">
        {total} / {target}
      </p>
      <div className={`w-full  outline outline-white/10`}>
        <div
          className="  bar p-[4px] text-xs text-center"
          style={{ width: progress }}
        />
      </div>
    </div>
  );
};

export default Bar;
