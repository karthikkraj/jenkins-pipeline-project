import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Smartphone, Watch, Speaker, Camera, Headphones } from 'lucide-react';

const categories = [
  { name: 'Laptops', icon: Laptop, href: '/products/laptops' },
  { name: 'Phones', icon: Smartphone, href: '/products/phones' },
  { name: 'Watches', icon: Watch, href: '/products/watches' },
  { name: 'Speakers', icon: Speaker, href: '/products/speakers' },
  { name: 'Cameras', icon: Camera, href: '/products/cameras' },
  { name: 'Headphones', icon: Headphones, href: '/products/headphones' },
];

const Categories = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group flex flex-col items-center p-6 bg-gray-50 rounded-lg transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              <category.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;