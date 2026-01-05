import { Music, Palette, Users, Trophy, Briefcase, Film } from 'lucide-react';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    { name: 'All', icon: null },
    { name: 'Music', icon: Music },
    { name: 'Art', icon: Palette },
    { name: 'Community', icon: Users },
    { name: 'Sports', icon: Trophy },
    { name: 'Business', icon: Briefcase },
    { name: 'Entertainment', icon: Film }
  ];

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.name;
          
          return (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground border border-border'
              }`}
            >
              {Icon && <Icon size={20} />}
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;