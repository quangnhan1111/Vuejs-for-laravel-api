export default [
    {
        _name: 'CSidebarNav',
        _children: [
            {
                _name: 'CSidebarNavItem',
                name: 'Home',
                to: '/home',
                icon: 'cil-speedometer',
                badge: {
                    color: 'primary',
                    text: 'NEW'
                }
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Category',
                to: '/categories',
                icon: 'cil-drop'
            },

            {
                _name: 'CSidebarNavItem',
                name: 'Brand',
                to: '/brands',
                icon: 'cil-puzzle',
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Customer',
                to: '/customers',
                icon: 'cil-cursor',
            },
            // {
            //     _name: 'CSidebarNavItem',
            //     name: 'Empolyee',
            //     to: '/employees',
            //     icon: 'cil-chart-pie'
            // },
            {
                _name: 'CSidebarNavItem',
                name: 'Color',
                to: '/colors',
                icon: 'cil-star',
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Image',
                to: '/images',
                icon: 'cil-bell',
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Product',
                to: '/products',
                icon: 'cil-bell',
            },

            {
                _name: 'CSidebarNavItem',
                name: 'Post',
                to: '/posts',
                icon: 'cil-star',
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Invoices',
                to: '/invoices',
                icon: 'cil-star',
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Review',
                to: '/reviews',
                icon: 'cil-star',
            },
        ]
    }
]
