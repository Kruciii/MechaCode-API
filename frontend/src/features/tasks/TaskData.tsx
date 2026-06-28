// 1. DEFINIUJEMY TYP ZADANIA (To naprawia podkreślenia!)
export interface Task {
  id: string;
  title: string;
  description: string;
  defaultCode: string;
}

// 2. DANE ZADAŃ (Upewnij się, że ID pasują do tych z Dashboardu)
export const tasksData: Task[] = [
  { 
    id: '001', 
    title: 'Konto Bankowe', 
    description: 'Zaimplementuj system zarządzania funduszami. Skonstruuj klasę z prywatnym saldem, metodami bezpiecznych wpłat oraz walidacją wypłat.',
    defaultCode: '#include <iostream>\n\nusing namespace std;\n\nclass Konto {\nprivate:\n    double saldo = 0;\npublic:\n    void wplac(double kwota) { /* ... */ }\n};\n\nint main() {\n    cout << "System bankowy gotowy." << endl;\n    return 0;\n}'
  },
  { 
    id: '002', 
    title: 'System Rezerwacji', 
    description: 'Zbuduj moduł rezerwacji miejsc w kinie. Wykorzystaj kontenery Vector do mapowania sali i zaimplementuj zapis stanu do plików.',
    defaultCode: '#include <iostream>\n#include <vector>\n\nint main() {\n    // Rezerwacja miejsc\n    return 0;\n}'
  },
  { 
    id: '003', 
    title: 'Silnik Fizyczny', 
    description: 'Stwórz jądro obliczeniowe dla symulacji kolizji. Oblicz wektory odbicia przy użyciu zaawansowanych przeciążeń operatorów.',
    defaultCode: '#include <iostream>\n\nint main() {\n    // Fizyka kolizji\n    return 0;\n}'
  }
];

export default tasksData;