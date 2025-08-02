// src/pages/services/Crafts.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceCard } from '../../components/cards/ServiceCard';
import riyalIcon from '../../assets/icons/Saudi_Riyal_Symbol-1.png';
import recommendedImg from '../../assets/images/recommendedForYou1.jpeg';
import recommendedImg2 from '../../assets/images/jhgu.jpeg';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  rating?: number;
  price?: string;
  image?: string;
  isVerified?: boolean;
  isADRA?: boolean;
  guideName?: string;
  guideRating?: number;
  guideImage?: string;
}

// SVG Icons
const ExploreIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/>
  </svg>
);

const StoreIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.32 19.98c-.21.72-.81 1.25-1.52 1.25h-12c-.71 0-1.31-.53-1.52-1.25L1 12.75V7c0-1.1.9-2 2-2h15c1.1 0 2 .9 2 2v5.75l-2.68 7.23zM3.5 8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-4 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm11.5-5.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5.22.5.5.5.5-.22.5-.5zm-2 0c0-.28-.22-.5-.5-.5s-.5.22-.5.5.22.5.5.5.5-.22.5-.5zm3 0c0-.28-.22-.5-.5-.5s-.5.22-.5.5.22.5.5.5.5-.22.5-.5z"/>
  </svg>
);

const CartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const MosqueIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L1 9v2h2v9H1v2h22v-2h-2v-9h2V9L12 2zm0 3.5l6 4.5v2H6v-2l6-4.5zM8 12h8v9H8v-9z"/>
  </svg>
);

const VerifiedIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);

const ADRAIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
  </svg>
);

const Crafts: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'explore' | 'stores' | 'cart' | 'heritage' | 'artisans'>('explore');  const isRTL = i18n.dir() === 'rtl';
  const handsOnWorkshops: ServiceItem[] = [
    {
      id: '1',
      title: t('services.crafts.pottery_workshop'),
      description: t('services.crafts.pottery_description'),
      category: t('categories.crafts'),
      rating: 4.7,
      price: '75-90',
      image: recommendedImg
    },
    {
      id: '2',
      title: t('services.crafts.pottery_workshop2'),
      description: t('services.crafts.pottery_description2'), 
      category: t('categories.crafts'),
      rating: 4.7,
      price: '75-90',
      image: recommendedImg2
    },
  ];

  const meetArtisans: ServiceItem[] = [
    {
      id: '5',
      title: t('services.crafts.artisan_workshop'),
      description: t('services.crafts.artisan_workshop_description'),
      category: t('categories.crafts'),
      rating: 4.8,
      price: '120',
      image: recommendedImg
    },
    {
      id: '6',
      title: t('services.crafts.tools_experience'),
      description: t('services.crafts.tools_description'),
      category: t('categories.crafts'),
      rating: 4.7,
      price: '100',
      image: recommendedImg,
      isVerified: true
    },
  ];

  const craftMarkets: ServiceItem[] = [
    {
      id: '9',
      title: t('services.crafts.heritage_market'),
      description: t('services.crafts.heritage_description'),
      category: t('categories.crafts'),
      rating: 4.7,
      price: '20',
      image: recommendedImg
    },
    {
      id: '10',
      title: t('services.crafts.handmade_products'),
      description: t('services.crafts.products_description'),
      category: t('categories.crafts'),
      rating: 4.6,
      price: '0',
      image: recommendedImg,
      isVerified: true
    },
  ];

  const craftStores: ServiceItem[] = [
    {
      id: '2',
      title: t('services.crafts.pottery_workshop2'),
      description: t('services.crafts.pottery_description2'), 
      category: t('crafts.categories.textiles'),
      rating: 4.7,
      price: '75-90',
      image: recommendedImg2
    },
    {
      id: '14',
      title: t('crafts.store.potterySet'),
      description: t('crafts.store.potterySetDesc'),
      category: t('crafts.categories.pottery'),
      rating: 4.7,
      price: '420',
      image: recommendedImg
    },
    {
      id: '15',
      title: t('crafts.store.palmBasket'),
      description: t('crafts.store.palmBasketDesc'),
      category: t('crafts.categories.baskets'),
      rating: 4.8,
      price: '180',
      image: recommendedImg,
      isVerified: true
    },
    {
      id: '16',
      title: t('crafts.store.silverJewelry'),
      description: t('crafts.store.silverJewelryDesc'),
      category: t('crafts.categories.jewelry'),
      rating: 4.9,
      price: '1250',
      image: recommendedImg
    },
    {
      id: '17',
      title: t('crafts.store.woodenCarving'),
      description: t('crafts.store.woodenCarvingDesc'),
      category: t('crafts.categories.woodwork'),
      rating: 4.6,
      price: '680',
      image: recommendedImg,
      isVerified: true
    },
  ];

  const heritageParticipation: ServiceItem[] = [
    {
      id: 'h1',
      title: t('services.crafts.heritage_restoration'),
      description: t('services.crafts.restoration_description'),
      category: t('categories.heritage'),
      image: recommendedImg,
      isVerified: true,
      isADRA: true
    },
    {
      id: 'h2',
      title: t('services.crafts.heritage_donation'),
      description: t('services.crafts.donation_description'),
      category: t('categories.heritage'),
      image: recommendedImg2,
      isVerified: true,
      isADRA: true
    },
    {
      id: 'h3',
      title: t('services.crafts.traditional_preservation'),
      description: t('services.crafts.preservation_description'),
      category: t('categories.heritage'),
      image: recommendedImg,
      isVerified: true,
      isADRA: true
    }
  ];

  const adraCertifiedItems: ServiceItem[] = [
    {
      id: 'adra1',
      title: t('crafts.adra.saduMasterpiece'),
      description: t('crafts.adra.saduMasterpieceDesc'),
      category: t('crafts.categories.textiles'),
      rating: 5.0,
      price: '1200',
      image: recommendedImg,
      isVerified: true,
      isADRA: true
    },
    {
      id: 'adra2',
      title: t('crafts.adra.heritagePottery'),
      description: t('crafts.adra.heritagePotteryDesc'),
      category: t('crafts.categories.pottery'),
      rating: 4.9,
      price: '950',
      image: recommendedImg,
      isVerified: true,
      isADRA: true
    },
    {
      id: 'adra3',
      title: t('crafts.adra.woodCarving'),
      description: t('crafts.adra.woodCarvingDesc'),
      category: t('crafts.categories.woodwork'),
      rating: 4.8,
      price: '750',
      image: recommendedImg,
      isVerified: true,
      isADRA: true
    },
    {
      id: 'adra4',
      title: t('crafts.adra.silverJewelry'),
      description: t('crafts.adra.silverJewelryDesc'),
      category: t('crafts.categories.jewelry'),
      rating: 5.0,
      price: '1500',
      image: recommendedImg,
      isVerified: true,
      isADRA: true
    }
  ];

  const cartItems: ServiceItem[] = [
    {
      id: 'cart1',
      title: t('crafts.cart.saduRug'),
      description: t('crafts.cart.saduRugDesc'),
      category: t('crafts.categories.textiles'),
      rating: 4.9,
      price: '850',
      image: recommendedImg,
      isVerified: true
    },
    {
      id: 'cart2',
      title: t('crafts.cart.palmBasket'),
      description: t('crafts.cart.palmBasketDesc'),
      category: t('crafts.categories.baskets'),
      rating: 4.8,
      price: '180',
      image: recommendedImg
    }
  ];

  const Artisans: ServiceItem[] = [
  {
    id: 'artisan1',
    title: t('crafts.artisans.basketWeaving'),
    description: t('crafts.artisans.basketWeavingDesc'),
    category: t('crafts.categories.handicrafts'),
    rating: 4.6,
    price: '300',
    image: recommendedImg,
    isVerified: true
  },
  {
    id: 'artisan2',
    title: t('crafts.artisans.embroideredThobes'),
    description: t('crafts.artisans.embroideredThobesDesc'),
    category: t('crafts.categories.textiles'),
    rating: 4.7,
    price: '450',
    image: recommendedImg,
    isVerified: false
  },
  {
    id: 'artisan3',
    title: t('crafts.artisans.clayIncenseHolders'),
    description: t('crafts.artisans.clayIncenseHoldersDesc'),
    category: t('crafts.categories.pottery'),
    rating: 4.5,
    price: '280',
    image: recommendedImg,
    isVerified: true
  },
  {
    id: 'artisan4',
    title: t('crafts.artisans.woolTapestry'),
    description: t('crafts.artisans.woolTapestryDesc'),
    category: t('crafts.categories.textiles'),
    rating: 4.8,
    price: '600',
    image: recommendedImg,
    isVerified: false
  }
];


  const renderSection = (title: string, items: ServiceItem[]) => (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="w-full">
            <ServiceCard
              title={item.title}
              description={item.description}
              category={item.category}
              rating={item.rating}
              price={
                item.price && item.price !== '0' ? (
                  <div className="flex items-center gap-1">
                    <img src={riyalIcon} alt="SAR" className="w-4 h-4 inline" />
                    <span>{item.price}</span>
                  </div>
                ) : item.price === '0' ? undefined : undefined
              }
              image={item.image}
              badge={item.isVerified ? (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  {item.isADRA ? (
                    <ADRAIcon className="w-4 h-4 mr-1" />
                  ) : (
                    <VerifiedIcon className="w-4 h-4 mr-1" />
                  )}
                  <span>{t(item.isADRA ? 'crafts.adra.certified' : 'crafts.certified')}</span>
                </div>
              ) : undefined}
              guideName={item.guideName}
              guideRating={item.guideRating}
              guideImage={item.guideImage}
              onPress={() => console.log('View service:', item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderStoreItems = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {craftStores.map(item => (
        <div key={item.id} className="w-full">
          <ServiceCard
            title={item.title}
            description={item.description}
            category={item.category}
            rating={item.rating}
            price={
              item.price && item.price !== '0' ? (
                <div className="flex items-center gap-1">
                  <img src={riyalIcon} alt="SAR" className="w-4 h-4 inline" />
                  <span>{item.price}</span>
                </div>
              ) : item.price === '0' ? undefined : undefined
            }
            image={item.image}
            badge={item.isVerified ? (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <VerifiedIcon className="w-4 h-4 mr-1" />
                <span>{t('crafts.certified')}</span>
              </div>
            ) : undefined}
            onPress={() => console.log('View service:', item.id)}
          />
        </div>
      ))}
    </div>
  );

  const renderCartItems = () => (
    <div className="space-y-6">
      {cartItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartItems.map(item => (
              <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    {item.isVerified && (
                      <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-1 rounded">
                        <VerifiedIcon className="w-3 h-3 mr-1" />
                        <span>{t('crafts.certifiedShort')}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <img src={riyalIcon} alt="SAR" className="w-4 h-4 mr-1" />
                      <span className="font-bold text-gray-900 dark:text-white">{item.price}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                        -
                      </button>
                      <span className="px-3 py-1 text-sm">1</span>
                      <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">{t('crafts.subtotal')}</span>
              <span className="font-medium">1030 SAR</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-400">{t('crafts.shipping')}</span>
              <span className="font-medium">{t('crafts.free')}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>{t('crafts.total')}</span>
              <span>1030 SAR</span>
            </div>
            <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              {t('crafts.checkout')}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{t('crafts.emptyCart')}</h3>
          <p className="text-gray-500 dark:text-gray-400">{t('crafts.addItems')}</p>
        </div>
      )}
    </div>
  );

  const renderHeritageContent = () => (
    <div className="space-y-8">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {t('crafts.heritage.participationTitle')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t('crafts.heritage.participationDesc')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {heritageParticipation.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start mb-4">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                )}
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                    {item.title}
                    {item.isADRA && (
                      <span className="ml-2 inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-0.5 rounded">
                        <ADRAIcon className="w-3 h-3 mr-1" />
                        ADRA
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.category}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                {t('crafts.heritage.participate')}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
          <ADRAIcon className="w-6 h-6 mr-2 text-green-600" />
          {t('crafts.adra.certifiedTitle')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t('crafts.adra.certifiedDesc')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adraCertifiedItems.map(item => (
            <ServiceCard
              key={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              rating={item.rating}
              price={
                <div className="flex items-center gap-1">
                  <img src={riyalIcon} alt="SAR" className="w-4 h-4 inline" />
                  <span>{item.price}</span>
                </div>
              }
              image={item.image}
              badge={
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <ADRAIcon className="w-4 h-4 mr-1" />
                  <span>{t('crafts.adra.certified')}</span>
                </div>
              }
              onPress={() => console.log('View ADRA item:', item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return (
          <div>
            {renderSection(t('crafts.handsOnWorkshops'), handsOnWorkshops)}
            <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
            {renderSection(t('crafts.meetArtisans'), meetArtisans)}
            <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
            {renderSection(t('crafts.craftMarkets'), craftMarkets)}
          </div>
        );
      case 'stores':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                <StoreIcon className="w-5 h-5 mr-2 text-primary-500" />
                {t('crafts.storesTitle')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {t('crafts.storesDesc')}
              </p>
            </div>
            {renderStoreItems()}
          </div>
        );
      case 'cart':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                <CartIcon className="w-5 h-5 mr-2 text-primary-500" />
                {t('crafts.cartTitle')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {t('crafts.cartDesc')}
              </p>
            </div>
            {renderCartItems()}
          </div>
        );
      case 'heritage':
        return renderHeritageContent();
      default:
        return (
          <div>
            {renderSection(t('crafts.handsOnWorkshops'), handsOnWorkshops)}
            <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
            {renderSection(t('crafts.meetArtisans'), meetArtisans)}
          </div>
        );
        case 'artisans':
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('crafts.artisans.title') || 'Artisans'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('crafts.artisans.description') || 'Discover talented artisans and their crafts'}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Artisans.map(item => (
          <div key={item.id} className="w-full">
            <ServiceCard
              title={item.title}
              description={item.description}
              category={item.category}
              rating={item.rating}
              price={
                item.price && item.price !== '0' ? (
                  <div className="flex items-center gap-1">
                    <img src={riyalIcon} alt="SAR" className="w-4 h-4 inline" />
                    <span>{item.price}</span>
                  </div>
                ) : item.price === '0' ? undefined : undefined
              }
              image={item.image}
              badge={item.isVerified ? (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <VerifiedIcon className="w-4 h-4 mr-1" />
                  <span>{t('crafts.certified')}</span>
                </div>
              ) : undefined}
              onPress={() => console.log('View artisan:', item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
    }
  };

  return (
    <div className="py-8 px-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('crafts.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {t('crafts.description')}
        </p>
      </div>

      <div className="mb-8">
        <nav className="flex space-x-6 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-3 px-1 text-sm font-medium border-b-2 flex items-center ${
              activeTab === 'explore'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('explore')}
          >
            <ExploreIcon className="w-4 h-4 mr-2" />
            {t('crafts.tabs.explore')}
          </button>
          <button
            className={`py-3 px-1 text-sm font-medium border-b-2 flex items-center ${
              activeTab === 'stores'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('stores')}
          >
            <StoreIcon className="w-4 h-4 mr-2" />
            {t('crafts.tabs.stores')}
          </button>
          <button
            className={`py-3 px-1 text-sm font-medium border-b-2 flex items-center ${
              activeTab === 'heritage'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('heritage')}
          >
            <MosqueIcon className="w-4 h-4 mr-2" />
            {t('crafts.tabs.heritage')}
          </button>
          <button
            className={`py-3 px-1 text-sm font-medium border-b-2 flex items-center ${
              activeTab === 'cart'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('cart')}
          >
            <CartIcon className="w-4 h-4 mr-2" />
            {t('crafts.tabs.cart')}
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
    
  );
  
};

export default Crafts;