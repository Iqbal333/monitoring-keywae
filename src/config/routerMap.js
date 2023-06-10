import Loadable from '@loadable/component';
import Loading from '@/components/Loading';

const Dashboard = Loadable(() => import('@/views/dashboard'), {
  fallback: <Loading />,
});

//MASTER
const MasterBank = Loadable(() => import('@/views/master/bank'), {
  fallback: <Loading />,
});

const MasterGender = Loadable(() => import('@/views/master/gender'), {
  fallback: <Loading />,
});

const MasterVehicleType = Loadable(() => import('@/views/master/vehicleType'), {
  fallback: <Loading />,
});

const MasterServiceType = Loadable(() => import('@/views/master/serviceType'), {
  fallback: <Loading />,
});

const MasterPaymentMethod = Loadable(
  () => import('@/views/master/payment-method'),
  { fallback: <Loading /> }
);

const MasterRegion = Loadable(() => import('@/views/master/region'), {
  fallback: <Loading />,
});

const MasterDistrict = Loadable(() => import('@/views/master/district'), {
  fallback: <Loading />,
});

const MasterSubDistrict = Loadable(() => import('@/views/master/subDistrict'), {
  fallback: <Loading />,
});

const MasterVillage = Loadable(() => import('@/views/master/village'), {
  fallback: <Loading />,
});

const MasterBrand = Loadable(
  () => import('@/views/master/vehicleBrand/brand'),
  {
    fallback: <Loading />,
  }
);

const MasterSubBrand = Loadable(
  () => import('@/views/master/vehicleBrand/subBrand'),
  {
    fallback: <Loading />,
  }
);

const MasterPage = Loadable(() => import('@/views/master/pages'), {
  fallback: <Loading />,
});

//SHOPS
const AllProducts = Loadable(() => import('@/views/shop/products/all'), {
  fallback: <Loading />,
});

const DetailProducts = Loadable(
  () => import('@/views/shop/products/all/details'),
  {
    fallback: <Loading />,
  }
);

const ReviewsProducts = Loadable(
  () => import('@/views/shop/products/reviews'),
  {
    fallback: <Loading />,
  }
);

const AttributesProducts = Loadable(
  () => import('@/views/shop/products/attributes'),
  {
    fallback: <Loading />,
  }
);

const CategoriesProducts = Loadable(
  () => import('@/views/shop/products/categories'),
  {
    fallback: <Loading />,
  }
);

const AllSeller = Loadable(() => import('@/views/shop/partner/seller'), {
  fallback: <Loading />,
});
const AllCustomer = Loadable(() => import('@/views/shop/customer'), {
  fallback: <Loading />,
});
const DetailCustomer = Loadable(() => import('@/views/shop/customer/details'), {
  fallback: <Loading />,
});

const DetailSeller = Loadable(
  () => import('@/views/shop/partner/seller/details'),
  {
    fallback: <Loading />,
  }
);

const CategoryGroup = Loadable(
  () => import('@/views/shop/products/categories/groupcategories'),
  {
    fallback: <Loading />,
  }
);

const CategoryType = Loadable(
  () =>
    import('@/views/shop/products/categories/groupcategories/typecategories'),
  {
    fallback: <Loading />,
  }
);

const AllOrders = Loadable(() => import('@/views/shop/orders/all'), {
  fallback: <Loading />,
});

const DetailOrder = Loadable(() => import('@/views/shop/orders/details'), {
  fallback: <Loading />,
});

const PendingOrders = Loadable(() => import('@/views/shop/orders/pending'), {
  fallback: <Loading />,
});

const ConfirmedOrders = Loadable(
  () => import('@/views/shop/orders/confirmed'),
  {
    fallback: <Loading />,
  }
);

const DeliveredOrders = Loadable(
  () => import('@/views/shop/orders/delivered'),
  {
    fallback: <Loading />,
  }
);

const PackagingOrders = Loadable(
  () => import('@/views/shop/orders/packaging'),
  {
    fallback: <Loading />,
  }
);

const CanceledOrders = Loadable(() => import('@/views/shop/orders/canceled'), {
  fallback: <Loading />,
});

//MEERCHANT
const Restaurant = Loadable(() => import('@/views/merchant/restaurant'), {
  fallback: <Loading />,
});
const RestoDetail = Loadable(
  () => import('@/views/merchant/restaurant/details'),
  {
    fallback: <Loading />,
  }
);
const CategoryMerchant = Loadable(() => import('@/views/merchant/category'), {
  fallback: <Loading />,
});
const DetailCategory = Loadable(
  () => import('@/views/merchant/category/details'),
  {
    fallback: <Loading />,
  }
);

const OrderStatus = Loadable(() => import('@/views/merchant/order-status'), {
  fallback: <Loading />,
});
const AllProduct = Loadable(() => import('@/views/merchant/products'), {
  fallback: <Loading />,
});
const BusinessType = Loadable(
  () => import('@/views/merchant/master/businessType'),
  {
    fallback: <Loading />,
  }
);
const BusinessPermit = Loadable(
  () => import('@/views/merchant/master/businessPermit'),
  {
    fallback: <Loading />,
  }
);
const CompanyType = Loadable(
  () => import('@/views/merchant/master/companyType'),
  {
    fallback: <Loading />,
  }
);
const PicRoles = Loadable(() => import('@/views/merchant/master/picRoles'), {
  fallback: <Loading />,
});

//DRIVER
const DriverAll = Loadable(() => import('@/views/driver/all'), {
  fallback: <Loading />,
});
const DriverDetails = Loadable(() => import('@/views/driver/details'), {
  fallback: <Loading />,
});
const DetailsDriver = Loadable(() => import('@/views/driver/details-driver'), {
  fallback: <Loading />,
});
const DriverPending = Loadable(() => import('@/views/driver/verification'), {
  fallback: <Loading />,
});
const DriverApproval = Loadable(() => import('@/views/driver/approval'), {
  fallback: <Loading />,
});
const DriverTracking = Loadable(() => import('@/views/driver/tracking'), {
  fallback: <Loading />,
});
const DriverRegister = Loadable(() => import('@/views/driver/register'), {
  fallback: <Loading />,
});

const TransactionOrders = Loadable(
  () => import('@/views/transactions/orders'),
  {
    fallback: <Loading />,
  }
);
const TransactionIncome = Loadable(
  () => import('@/views/transactions/income'),
  {
    fallback: <Loading />,
  }
);
const TransactionIncomeDetails = Loadable(
  () => import('@/views/transactions/income/details'),
  {
    fallback: <Loading />,
  }
);

const PricingProfit = Loadable(() => import('@/views/pricing/profit'), {
  fallback: <Loading />,
});

const AdditionalPrice = Loadable(() => import('@/views/pricing/additional'), {
  fallback: <Loading />,
});

const RatesPrice = Loadable(() => import('@/views/pricing/rates'), {
  fallback: <Loading />,
});

const Promotions = Loadable(() => import('@/views/promotions'), {
  fallback: <Loading />,
});

const Interviews = Loadable(() => import('@/views/interview'), {
  fallback: <Loading />,
});

const InterviewsDetails = Loadable(() => import('@/views/interview/details'), {
  fallback: <Loading />,
});

const Reviews = Loadable(() => import('@/views/reviews'), {
  fallback: <Loading />,
});

const Error404 = Loadable(() => import('@/views/error/404'), {
  fallback: <Loading />,
});

// AUCTION :)
const VerificationAuction = Loadable(
  () => import('@/views/auction/auction/verification-auction'),
  {
    fallback: <Loading />,
  }
);

const VerificationAuctionDetail = Loadable(
  () => import('@/views/auction/auction/verification-auction/detail'),
  {
    fallback: <Loading />,
  }
);

const ApprovedAuction = Loadable(
  () => import('@/views/auction/auction/approved-auction'),
  {
    fallback: <Loading />,
  }
);

const ApprovedAuctionDetail = Loadable(
  () => import('@/views/auction/auction/approved-auction/detail'),
  {
    fallback: <Loading />,
  }
);

const Participant = Loadable(
  () => import('@/views/auction/auction/participant'),
  {
    fallback: <Loading />,
  }
);

const WinnerLogs = Loadable(
  () => import('@/views/auction/auction/winner-logs'),
  {
    fallback: <Loading />,
  }
);

const WinnerLogsSend = Loadable(() => import('@/views/auction/auction/winner-logs/send'), {
    fallback: <Loading />,
});

const CompletedAuction = Loadable(() => import('@/views/auction/auction/completed-auction'), {
    fallback: <Loading />,
  }
);

const CompletedAuctionDetail = Loadable(
  () => import('@/views/auction/auction/completed-auction/detail'),
  {
    fallback: <Loading />,
  }
);

const RejectedAuction = Loadable(
  () => import('@/views/auction/auction/rejected-auction'),
  {
    fallback: <Loading />,
  }
);

const RejectedAuctionDetail = Loadable(
  () => import('@/views/auction/auction/rejected-auction/detail'),
  {
    fallback: <Loading />,
  }
);

const CategoryAuction = Loadable(
  () => import('@/views/auction/auction/category'),
  {
    fallback: <Loading />,
  }
);

const CategoryTypeAuction = Loadable(
  () => import('@/views/auction/auction/category-type'),
  {
    fallback: <Loading />,
  }
);

const AllEvent = Loadable(
  () => import('@/views/auction/event-auction/all-event'),
  {
    fallback: <Loading />,
  }
);

const LiveEvent = Loadable(
  () => import('@/views/auction/event-auction/live-event'),
  {
    fallback: <Loading />,
  }
);

const CompletedEvent = Loadable(
  () => import('@/views/auction/event-auction/completed-event'),
  {
    fallback: <Loading />,
  }
);

const UpcomingEvent = Loadable(
  () => import('@/views/auction/event-auction/upcoming-event'),
  {
    fallback: <Loading />,
  }
);

const Partner = Loadable(() => import('@/views/auction/partner/partner'), {
  fallback: <Loading />,
});

const exportedObject = [
  { path: '/dashboard', component: Dashboard },
  { path: '/driver/all', component: DriverAll },
  { path: '/driver/details/:id', component: DetailsDriver },
  { path: '/driver/details-verification/:id', component: DriverDetails },
  { path: '/driver/verification/', component: DriverPending },
  { path: '/driver/approval-pending/', component: DriverApproval },
  { path: '/driver/interviews/schedule', component: Interviews },
  { path: '/driver/interviews/details/:id', component: InterviewsDetails },
  { path: '/driver/register', component: DriverRegister },

  { path: '/master/bank', component: MasterBank },
  { path: '/master/gender', component: MasterGender },
  { path: '/master/vehicle-type', component: MasterVehicleType },
  { path: '/master/service-type', component: MasterServiceType },
  { path: '/master/payment-method', component: MasterPaymentMethod },
  { path: '/master/region', component: MasterRegion },
  { path: '/master/district/:id', component: MasterDistrict },
  { path: '/master/sub-district/:id', component: MasterSubDistrict },
  { path: '/master/village/:id', component: MasterVillage },
  { path: '/master/brand', component: MasterBrand },
  { path: '/master/subBrand/:id', component: MasterSubBrand },
  { path: '/driver/approval-pending/', component: DriverPending },
  { path: '/driver/tracking-driver/', component: DriverTracking },
  { path: '/master/page', component: MasterPage },

  //SHOP
  { path: '/shop/all-product', component: AllProducts },
  { path: '/shop/product-detail/:id', component: DetailProducts },
  { path: '/shop/reviews-product', component: ReviewsProducts },
  { path: '/shop/attributes-product', component: AttributesProducts },
  { path: '/shop/categories-product', component: CategoriesProducts },
  { path: '/shop/categories/group/:id', component: CategoryGroup },
  { path: '/shop/categories/group-type/:id', component: CategoryType },
  { path: '/shop/customer', component: AllCustomer },
  { path: '/shop/all-customer/detail/:id', component: DetailCustomer },
  { path: '/shop/seller', component: AllSeller },
  { path: '/shop/seller-detail/:id', component: DetailSeller },
  //SHOP-ORDERS
  { path: '/shop/order-detail/:id', component: DetailOrder },
  { path: '/shop/all-orders', component: AllOrders },
  { path: '/shop/pending-orders', component: PendingOrders },
  { path: '/shop/confirmed-orders', component: ConfirmedOrders },
  { path: '/shop/packaging-orders', component: PackagingOrders },
  { path: '/shop/delivered-orders', component: DeliveredOrders },
  { path: '/shop/canceled-orders', component: CanceledOrders },

  //MERCHANT
  { path: '/merchant/restaurant', component: Restaurant },
  { path: '/merchant/detail/:restaurantId', component: RestoDetail },
  { path: '/merchant/category', component: CategoryMerchant },
  { path: '/merchant/categoryDetail/:categoryId', component: DetailCategory },
  { path: '/merchant/order-status', component: OrderStatus },
  { path: '/merchant/products', component: AllProduct },
  { path: '/merchant/master/business-type', component: BusinessType },
  { path: '/merchant/master/business-permit-type', component: BusinessPermit },
  { path: '/merchant/master/company-type', component: CompanyType },
  { path: '/merchant/master/pic-roles', component: PicRoles },

  { path: '/transaction/order', component: TransactionOrders },
  {
    path: '/transaction/income/details/:orderId',
    component: TransactionIncomeDetails,
  },
  { path: '/transaction/income', component: TransactionIncome },

  { path: '/reviews', component: Reviews },

  { path: '/pricing/profit', component: PricingProfit },
  { path: '/pricing/additional-price', component: AdditionalPrice },
  { path: '/pricing/rates-price', component: RatesPrice },

  { path: '/promotions', component: Promotions },

  { path: '/error/404', component: Error404 },

  // AUCTION :)
  { path : '/auction/verification', component: VerificationAuction},
  { path : '/auction/verification-detail/:auctionId', component: VerificationAuctionDetail},
  { path : '/auction/approved', component: ApprovedAuction}, 
  { path : '/auction/approved-detail/:auctionId', component: ApprovedAuctionDetail}, 
  { path : '/auction/participant', component: Participant},
  { path : '/auction/winner-logs', component: WinnerLogs},
  { path : '/auction/winner-detail/send', component: WinnerLogsSend},
  { path : '/auction/completed-auction', component: CompletedAuction},
  { path : '/auction/completed-detail/:auctionId', component: CompletedAuctionDetail},
  { path : '/auction/rejected-auction', component: RejectedAuction},
  { path : '/auction/rejected-detail/:auctionId', component: RejectedAuctionDetail},
  { path : '/auction/category', component: CategoryAuction},
  { path : '/auction/category-type', component: CategoryTypeAuction},

  { path: '/events/all', component: AllEvent },
  { path: '/events/live', component: LiveEvent },
  { path: '/events/completed', component: CompletedEvent },
  { path: '/events/upcoming', component: UpcomingEvent },

  { path: '/partner/auction', component: Partner },
];

export default exportedObject;
