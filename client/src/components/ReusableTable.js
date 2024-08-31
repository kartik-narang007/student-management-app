import React, { useState, useCallback, useMemo } from 'react';

const Table = ({
    headers,
    rows,
    onRowClick,
    rowKey,
    sortable = false,
    renderCell,
    actionButtons,
}) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSort = useCallback((key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    }, [sortConfig]);

    const sortedRows = useMemo(() => {
        let sortableRows = [...rows];
        if (sortConfig.key) {
            sortableRows.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableRows;
    }, [rows, sortConfig]);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-200">
                <thead className="bg-gray-200 sticky top-0">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="py-2 px-4 cursor-pointer text-center"
                                onClick={() => sortable && header.sortable && handleSort(header.key)}
                            >
                                {header.title}
                                {header.sortable && sortConfig.key === header.key && (
                                    sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
                                )}
                            </th>
                        ))}
                        {actionButtons && actionButtons.length > 0 && (
                            <th className="py-2 px-4 text-center">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, index) => (
                        <tr
                            key={row[rowKey]}
                            className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                            onClick={() => onRowClick && onRowClick(row[rowKey])}
                        >
                            {headers.map((header, i) => (
                                <td key={i} className="py-2 px-4 text-center">
                                    {renderCell ? renderCell(header.key, row) : row[header.key]}
                                </td>
                            ))}
                            {actionButtons && actionButtons.length > 0 && (
                                <td className="py-2 px-4 text-center">
                                    {actionButtons[sortedRows.indexOf(row)]?.map((button, j) => (
                                        <button
                                            key={j}
                                            className={button.className}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                button.action && button.action();
                                            }}
                                        >
                                            {button.label}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
