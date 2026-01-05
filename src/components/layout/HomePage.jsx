import React from 'react';
import { GraduationCap, FileText, BookOpen } from 'lucide-react';
import CategoryCard from './CategoryCard';

const HomePage = ({ categories, onSelectItem }) => {
    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <GraduationCap className="w-16 h-16 text-blue-600" />
                        <h1 className="text-5xl font-bold text-gray-800">
                            Simulatore EPS
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 mb-2">
                        Elementi di Probabilità e Statistica
                    </p>
                    <p className="text-gray-500">
                        Scegli tra quiz di pratica e simulatori d'esame completi
                    </p>
                </div>

                {/* Categories */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {categories.map(category => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onSelectItem={onSelectItem}
                        />
                    ))}
                </div>

                {/* Info Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-blue-600" />
                        Come funziona
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl font-bold text-green-600 mb-2">1</div>
                            <h4 className="font-bold text-gray-800 mb-2">Scegli il tipo</h4>
                            <p className="text-sm text-gray-600">
                                Quiz per esercizio rapido o simulatore completo per testare la tua preparazione
                            </p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                            <h4 className="font-bold text-gray-800 mb-2">Completa le domande</h4>
                            <p className="text-sm text-gray-600">
                                Rispondi a tutte le domande, nei simulatori hai 20 minuti come nell'esame reale
                            </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                            <h4 className="font-bold text-gray-800 mb-2">Rivedi i risultati</h4>
                            <p className="text-sm text-gray-600">
                                Controlla le tue risposte con spiegazioni dettagliate per ogni domanda
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
