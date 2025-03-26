import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getRecommendedProducts, Product } from '../services/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Star, Truck, Shield, ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productData = await getProduct(id!);
        setProduct(productData);

        if (productData) {
          const recommended = await getRecommendedProducts(productData.category_id, productData.id);
          setRecommendedProducts(recommended);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Product not found</h2>
          <Link to="/products" className="mt-4 text-indigo-600 hover:text-indigo-800">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              src={product.image_url}
              alt={product.name}
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500">({product.reviews_count} reviews)</span>
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-900">${product.price}</p>
              <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </motion.button>
            </div>

            <div className="space-y-4 border-t pt-8">
              <div className="flex items-center space-x-4">
                <Truck className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-semibold">Free Delivery</h3>
                  <p className="text-sm text-gray-500">Free shipping on orders over $100</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Shield className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-semibold">2 Year Warranty</h3>
                  <p className="text-sm text-gray-500">Full coverage for peace of mind</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommended Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((rec) => (
                <Link
                  key={rec.id}
                  to={`/product/${rec.id}`}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={rec.image_url}
                      alt={rec.name}
                      className="w-full h-48 object-cover group-hover:opacity-75 transition"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{rec.name}</h3>
                      <p className="mt-1 text-gray-600">${rec.price}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductDetail;