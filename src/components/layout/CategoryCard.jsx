import React from 'react';
import { ChevronRight, FileCode } from 'lucide-react';

const CategoryCard = ({ category, onSelectItem }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Category Header */}
            <div className={`${category.color} p-6 text-white`}>
                <div className="flex items-center gap-4 mb-3">
                    {category.icon}
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                <p className="text-white/90">{category.description}</p>
            </div>

            {/* Category Items */}
            <div className="p-6 space-y-4">
                {category.items.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onSelectItem(item.component)}
                        className="w-full text-left p-5 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all group bg-gray-50 hover:bg-blue-50"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    {item.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {item.topics.map(topic => (
                                        <span
                                            key={topic}
                                            className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                                {item.rScript && (
                                    <div className="mt-3 flex items-center gap-2">
                                        <FileCode className="w-4 h-4 text-green-600" />
                                        <a
                                            href={item.rScript}
                                            download={item.rScriptName}
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-sm text-green-600 hover:text-green-700 underline font-medium"
                                        >
                                            Scarica script R per RStudio
                                        </a>
                                    </div>
                                )}
                            </div>
                            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryCard;
