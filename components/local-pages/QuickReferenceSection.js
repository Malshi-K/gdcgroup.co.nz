import React from 'react';

const QuickReferenceSection = ({ quickReference }) => {
  if (!quickReference?.rows?.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary-navy text-center mb-4">
          {quickReference.title}
        </h2>
        <div className="w-24 h-1 bg-primary-blue mx-auto mb-10"></div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full min-w-[640px] border-collapse bg-white">
            <thead>
              <tr className="bg-primary-navy text-white">
                {(quickReference.headers || ['Domain', 'Key Deliverables & Reports', 'Common Local Applications']).map(
                  (header, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-sm font-semibold"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {quickReference.rows.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-off-white' : 'bg-white'}
                >
                  <td className="px-4 py-3 text-sm font-semibold text-primary-navy align-top">
                    {row.domain}
                  </td>
                  <td className="px-4 py-3 text-sm text-dark align-top">
                    {row.deliverables}
                  </td>
                  <td className="px-4 py-3 text-sm text-dark align-top">
                    {row.applications}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default QuickReferenceSection;
