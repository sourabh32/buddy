import React from 'react';

const BadgeSelector = ({ name, label, error, onChange, value }) => {
  const badges = [
    { label: '5 days', days: 5 },
    { label: '7 days', days: 7 },
    { label: '10 days', days: 10 },
    { label: '15 days', days: 15 },
  ];

  const formatDate = (date) => date.toISOString().split('T')[0];

  const handleBadgeClick = (days) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);
    onChange({
      target: {
        name,
        value: formatDate(targetDate),
      },
    });
  };

  return (
    <div className=" w-full">
      <label className={`block text-lg font-medium mb-1${error ? ' text-red-500' : ''}`} htmlFor={name}>
        {label}
      </label>
      <p className='mb-5 text-sm text-gray-600'>submission deadline</p>
      <div className="flex space-x-2">
        {badges.map((badge) => (
          <button
            key={badge.days}
            type="button"
            className={`badge p-2 ${
              value === formatDate(new Date(new Date().setDate(new Date().getDate() + badge.days)))
                ? 'badge-primary'
                : 'badge-outline'
            }`}
            onClick={() => handleBadgeClick(badge.days)}
          >
            {badge.label}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default BadgeSelector;
