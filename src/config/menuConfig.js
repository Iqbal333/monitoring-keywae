const menuList = [
  {
    title: 'Main',
    key: 'main',
    type: 'group',
    children: [
      {
        title: 'Dashboard',
        key: 'dashboard',
        path: '/dashboard',
        icon: 'DashboardOutlined',
        roles: ['admin', 'editor', 'guest'],
      },
    ],
  },
  {
    title: 'Keyride',
    key: 'keyride',
    type: 'group',
    children: [
      {
        title: 'Driver',
        key: 'driver',
        path: '/driver',
        icon: 'CarOutlined',
        children: [
          {
            title: 'Drivers',
            key: 'driver-all',
            path: '/driver/all',
            roles: ['admin'],
          },
          {
            title: 'Lacak Driver',
            key: 'driver-tracking',
            path: '/driver/tracking-driver',
            roles: ['admin'],
          },
        ],
      },
      {
        title: 'Calon Driver',
        key: 'driver-candidate',
        path: '/calon-driver',
        icon: 'CarOutlined',
        children: [
          {
            title: 'Verifikasi Driver',
            key: 'driver-verification',
            path: '/driver/verification',
            roles: ['admin'],
          },
          {
            title: 'Wawancara',
            key: 'driver-interview',
            path: '/driver/interviews/schedule',
            roles: ['admin'],
          },
          // {
          //   title: 'Approval Driver',
          //   path: '/driver/approval-pending',
          //   roles: ['admin'],
          // },
          {
            title: 'Pendaftaran',
            key: 'driver-register',
            path: '/driver/register',
            roles: ['admin'],
          },
        ],
      },
      {
        title: 'Transaksi',
        path: '/transactions',
        icon: 'FileOutlined',
        children: [
          {
            title: 'Pesanan',
            path: '/transaction/order',
            roles: ['admin'],
          },
          {
            title: 'Pendapatan',
            path: '/transaction/income',
            roles: ['admin'],
          },
        ],
      },
      {
        title: 'Skema Keuangan',
        path: '/pricing-schema',
        icon: 'PercentageOutlined',
        children: [
          {
            title: 'Pembagian Hasil',
            path: '/pricing/profit',
            roles: ['admin'],
          },
          // {
          //   title: 'Biaya Tambahan',
          //   path: '/pricing/additional-price',
          //   roles: ['admin'],
          // },
          {
            title: 'Tarif',
            path: '/pricing/rates-price',
            roles: ['admin'],
          },
        ],
      },
      {
        title: 'Ulasan',
        path: '/reviews',
        icon: 'LikeOutlined',
        roles: ['admin'],
      },
      {
        title: 'Promo',
        path: '/promotions',
        icon: 'AppstoreAddOutlined',
        roles: ['admin'],
      },
      // {
      //   title: 'Complaints',
      //   path: '/charts',
      //   icon: 'AreaChartOutlined',
      //   roles: ['admin', 'editor'],
      // },
      // {
      //   title: 'Report',
      //   path: '/report',
      //   icon: 'FileOutlined',
      //   roles: ['admin'],
      //   children: [
      //     {
      //       title: 'Nested 1',
      //       path: '/nested/menu1',
      //       children: [
      //         {
      //           title: 'Nested 1-1',
      //           path: '/nested/menu1/menu1-1',
      //           roles: ['admin', 'editor'],
      //         },
      //         {
      //           title: 'Nested 1-2',
      //           path: '/nested/menu1/menu1-2',
      //           children: [
      //             {
      //               title: 'Nested 1-2-1',
      //               path: '/nested/menu1/menu1-2/menu1-2-1',
      //               roles: ['admin', 'editor'],
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        title: 'Referensi',
        path: '/master',
        icon: 'DatabaseOutlined',
        children: [
          {
            title: 'Bank',
            path: '/master/bank',
            roles: ['admin'],
          },
          {
            title: 'Jenis Kelamin',
            path: '/master/gender',
            roles: ['admin'],
          },
          {
            title: 'Tipe Kendaraan',
            path: '/master/vehicle-type',
            roles: ['admin'],
          },
          {
            title: 'Tipe Servis',
            path: '/master/service-type',
            roles: ['admin'],
          },
          {
            title: 'Metode Pembayaran',
            path: '/master/payment-method',
            roles: ['admin'],
          },
          {
            title: 'Brand Kendaraan',
            path: '/master/brand',
            roles: ['admin'],
          },
          {
            title: 'Provinsi',
            path: '/master/region',
            roles: ['admin'],
          },
          {
            title: 'Halaman',
            path: '/master/page',
            roles: ['admin'],
          },
        ],
      },
    ],
  },
  {
    title: 'Keyfood',
    key: 'keyfood',
    type: 'group',
    children: [
      {
        title: 'Restoran',
        key: 'merchant-restaurant',
        path: '/merchant/restaurant',
        icon: 'ShopOutlined',
        roles: ['admin'],
      },
      {
        title: 'Kategori & Menu',
        key: 'merchant-category',
        path: '/merchant/category',
        icon: 'OrderedListOutlined',
        roles: ['admin'],
      },
      // {
      //   title: 'Semua Produk',
      //   key: 'merchant-products',
      //   path: '/merchant/products',
      //   icon: 'AppstoreOutlined',
      //   roles: ['admin'],
      // },
      {
        title: 'Referensi',
        key: 'merchant-master',
        icon: 'DatabaseOutlined',
        roles: ['Admin'],
        children: [
          {
            title: 'Order Status',
            path: '/merchant/order-status',
            icon: 'ShoppingCartOutlined',
            roles: ['admin'],
          },
          {
            title: 'Tipe Bisnis',
            key: 'merchant-master-business-type',
            path: '/merchant/master/business-type',
            icon: 'OrderedListOutlined',
            roles: ['admin'],
          },
          {
            title: 'Tipe Izin Bisnis',
            key: 'merchant-master-business-permit-type',
            path: '/merchant/master/business-permit-type',
            icon: 'OrderedListOutlined',
            roles: ['admin'],
          },
          {
            title: 'Tipe Perusahaan',
            key: 'merchant-master-company-type',
            path: '/merchant/master/company-type',
            icon: 'OrderedListOutlined',
            roles: ['admin'],
          },
          {
            title: 'Role PIC',
            key: 'merchant-master-pic-roles',
            path: '/merchant/master/pic-roles',
            icon: 'UsergroupAddOutlined',
            roles: ['admin'],
          },
        ],
      },
    ],
  },
  {
    title: 'Keyshop',
    key: 'keyshop',
    type: 'group',
    children: [
      {
        title: 'Produk',
        key: 'shop-product',
        path: '/shop',
        icon: 'ShopOutlined',
        children: [
          {
            title: 'Semua Produk',
            key: 'shop-products',
            path: '/shop/all-product',
            icon: 'OrderedListOutlined',
            roles: ['admin'],
          },
          // {
          //   title: 'Product Reviews',
          //   path: '/shop/reviews-product',
          //   roles: ['admin'],
          // },
          // {
          //   title: 'Attribut Produk',
          //   key: 'shop-products-variant',
          //   path: '/shop/attributes-product',
          //   roles: ['admin'],
          // },
          {
            title: 'Kategori Produk',
            key: 'shop-products-category',
            path: '/shop/categories-product',
            icon: 'OrderedListOutlined',
            roles: ['admin'],
          },
        ],
      },
      {
        title: 'Semua Pelanggan',
        path: '/shop/customer',
        icon: 'UserOutlined',
        roles: ['admin'],
      },
      {
        title: 'Pesanan',
        key: 'shop-order',
        icon: 'ShoppingOutlined',
        children: [
          {
            title: 'Semua Pesanan',
            key: 'shop-orders',
            path: '/shop/all-orders',
            icon: 'ShoppingCartOutlined',
            roles: ['admin'],
          },
          {
            title: 'Pesanan Tertunda',
            key: 'shop-pending-orders',
            path: '/shop/pending-orders',
            icon: 'ShoppingCartOutlined',
            roles: ['admin'],
          },
          {
            title: 'Pesanan Dikonfirmasi',
            key: 'shop-confirmed-order',
            path: '/shop/confirmed-orders',
            icon: 'ShoppingCartOutlined',
            roles: ['admin'],
          },
          {
            title: 'Pesanan Dikemas',
            key: 'shop-packaging-order',
            path: '/shop/packaging-orders',
            icon: 'ShoppingCartOutlined',
            roles: ['admin'],
          },
          {
            title: 'Pesanan Dikirim',
            key: 'shop-delivered-order',
            path: '/shop/delivered-orders',
            icon: 'ShoppingCartOutlined',
            roles: ['admin'],
          },
          {
            title: 'Pesanan Dibatalkan',
            key: 'shop-canceled-order',
            path: '/shop/canceled-orders',
            icon: 'ShoppingCartOutlined',
            roles: ['admin'],
          },
        ],
      },
    ],
  },
  {
    title: 'Keylang',
    type: 'group',
    children: [
      {
        title: 'Lelang',
        path: '/auction',
        icon: 'ShopOutlined',
        children: [
          {
            // EN : Verification Auction
            title: 'Verifikasi Lelang',
            path: '/auction/verification',
            roles: ['admin'],
          },
          {
            // EN : Approved Auction
            title: 'Lelang Disetujui',
            path: '/auction/approved',
            roles: ['admin'],
          },
          {
            // EN : Participant
            title: 'Peserta Lelang',
            path: '/auction/participant',
            roles: ['admin'],
          },
          {
            // EN : Winner Logs
            title: 'Log Pemenang',
            path: '/auction/winner-logs',
            roles: ['admin'],
          },
          {
            // EN : Completed Auction
            title: 'Lelang Selesai',
            path: '/auction/completed-auction',
            roles: ['admin'],
          },
          {
            // EN : Rejected Auction
            title: 'Lelang Ditolak',
            path: '/auction/rejected-auction',
            roles: ['admin'],
          },
          {
            // EN : Category
            title: 'Kategori',
            path: '/auction/category',
            roles: ['admin'],
          },
          {
            // EN : Category Type
            title: 'Tipe Kategori',
            path: '/auction/category-type',
            roles: ['admin'],
          },
        ],
      },
      {
        // EN : Event Auciton
        title: 'Event Lelang',
        path: '/events',
        icon: 'AppstoreOutlined',
        children: [
          {
            // EN : All Event
            title: 'Semua Event',
            path: '/events/all',
            roles: ['admin'],
          },
          {
            // EN : Live Event
            title: 'Event Berlangsung',
            path: '/events/live',
            roles: ['admin'],
          },
          {
            // EN : Completed Event
            title: 'Event Selesai',
            path: '/events/completed',
            roles: ['admin'],
          },
          //   {
          //     title: 'Upcoming Event',
          //     path: '/events/upcoming',
          //     roles: ['admin'],
          //   },
        ],
      },
      {
        title: 'Partner',
        path: '/partner',
        icon: 'UserOutlined',
        children: [
          {
            title: 'Partner',
            path: '/partner/auction',
            roles: ['admin'],
          },
        ],
      },
    ],
  },
];

export default menuList;
